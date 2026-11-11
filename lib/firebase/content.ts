import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, requireDb } from "./client";

export type ContentCollection =
  | "projects"
  | "skills"
  | "toolkit"
  | "experience"
  | "media"
  | "activityLogs"
  | "siteSettings";

export type ContentRecord = DocumentData & {
  id: string;
  title?: string;
  name?: string;
  slug?: string;
  isVisible?: boolean;
  status?: "draft" | "published" | "archived";
  displayOrder?: number;
};

function mapSnapshot(snapshot: {
  id: string;
  data: () => DocumentData;
}): ContentRecord {
  return { ...snapshot.data(), id: snapshot.id };
}

export function subscribeToPublicContent(
  collectionName: Exclude<
    ContentCollection,
    "media" | "activityLogs" | "siteSettings"
  >,
  onData: (records: ContentRecord[]) => void,
  onError: (error: Error) => void,
) {
  if (!db) return () => undefined;

  const constraints: QueryConstraint[] =
    collectionName === "projects"
      ? [
          where("status", "==", "published"),
          where("isVisible", "==", true),
          orderBy("displayOrder", "asc"),
        ]
      : [where("isVisible", "==", true), orderBy("displayOrder", "asc")];

  return onSnapshot(
    query(collection(db, collectionName), ...constraints),
    (snapshot) => onData(snapshot.docs.map(mapSnapshot)),
    onError,
  );
}

export function subscribeToPublicSiteSettings(
  onData: (records: ContentRecord[]) => void,
  onError: (error: Error) => void,
) {
  if (!db) return () => undefined;

  return onSnapshot(doc(db, "siteSettings", "main"), (snapshot) => {
    if (snapshot.exists() && snapshot.data().isPublic === true) {
      onData([mapSnapshot(snapshot)]);
      return;
    }
    onData([]);
  }, onError);
}

export async function listAdminContent(collectionName: ContentCollection) {
  const constraints: QueryConstraint[] =
    collectionName === "activityLogs"
      ? [orderBy("createdAt", "desc")]
      : collectionName === "media"
        ? [orderBy("createdAt", "desc")]
        : collectionName === "siteSettings"
          ? []
          : [orderBy("displayOrder", "asc")];
  const snapshot = await getDocs(
    query(collection(requireDb(), collectionName), ...constraints),
  );
  return snapshot.docs.map(mapSnapshot);
}

export async function saveContent(
  collectionName: ContentCollection,
  id: string | undefined,
  values: DocumentData,
  uid: string,
) {
  const database = requireDb();
  const now = serverTimestamp();

  if (id) {
    await updateDoc(doc(database, collectionName, id), {
      ...values,
      updatedAt: now,
      updatedBy: uid,
    });
    return id;
  }

  const reference = doc(collection(database, collectionName));
  await setDoc(reference, {
    ...values,
    createdAt: now,
    updatedAt: now,
    createdBy: uid,
    updatedBy: uid,
  });
  return reference.id;
}

export async function reorderContent(
  collectionName: ContentCollection,
  orderedIds: string[],
  uid: string,
) {
  if (orderedIds.length > 500) {
    throw new Error("Cannot reorder more than 500 records at once.");
  }

  const database = requireDb();
  const batch = writeBatch(database);
  orderedIds.forEach((id, index) => {
    batch.update(doc(database, collectionName, id), {
      displayOrder: index * 10,
      updatedAt: serverTimestamp(),
      updatedBy: uid,
    });
  });
  await batch.commit();
}

export async function createContent(
  collectionName: ContentCollection,
  values: DocumentData,
  uid: string,
  id?: string,
) {
  const database = requireDb();
  const reference = id
    ? doc(database, collectionName, id)
    : doc(collection(database, collectionName));
  await setDoc(reference, {
    ...values,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid,
    updatedBy: uid,
  });
  return reference.id;
}

export async function removeContent(
  collectionName: ContentCollection,
  id: string,
) {
  await deleteDoc(doc(requireDb(), collectionName, id));
}

export async function getContent(
  collectionName: ContentCollection,
  id: string,
) {
  const snapshot = await getDoc(doc(requireDb(), collectionName, id));
  return snapshot.exists() ? mapSnapshot(snapshot) : null;
}

export async function addActivity(
  action: string,
  itemName: string,
  uid: string,
) {
  await addDoc(collection(requireDb(), "activityLogs"), {
    action,
    itemName,
    createdAt: serverTimestamp(),
    createdBy: uid,
  });
}
