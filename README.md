# Portfolio

Next.js portfolio with an optional Firebase-powered content management system at `/admin`.
Without Firebase configuration, the public portfolio continues to use its bundled content.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the Firebase web app values to enable the CMS.
Restart the development server after changing environment variables.

## Firebase CMS setup

1. Create a Firebase project and register a web app. Enable **Authentication → Email/Password** and create a Firestore database.
2. Copy the web app configuration to `.env.local` (or the matching deployment environment variables). Never put service-account credentials or private keys in the browser app.
3. Deploy `firestore.rules` and `firestore.indexes.json` with the Firebase CLI:

   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

4. Create an administrator using Firebase Authentication, then copy that user's UID. In Firestore Console, create `admins/{uid}` with `{ "enabled": true }`. The app intentionally has no public signup or client-side administrator provisioning.
5. Visit `/admin/login`. Use **Settings & data → Import missing records** to migrate existing projects, skills, toolkit items, and experience. The import is repeatable and never overwrites existing document IDs.
6. Use **Download JSON backup** regularly. The backup includes content and media metadata; image binaries remain in Cloudinary.

Firestore rules are the authorization boundary: public queries expose only visible content (and published projects), while CMS reads and writes require an enabled administrator document.

In **Admin → Projects**, use the project actions to publish and show, move a project back to draft, archive it, or hide/show it independently. Use **Move up** and **Move down** to change its portfolio position; these actions save immediately. Public projects must be both published and visible.

## Cloudinary media uploads

Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` in `.env.local` and in deployment settings. Create an **unsigned** upload preset in Cloudinary restricted to images, the `Portfolio` folder, and a 10 MB maximum. The browser also accepts only JPEG, PNG, WebP, and GIF up to 10 MB, but Cloudinary preset restrictions are required because client validation is not a security boundary.

Unsigned uploads do not use or require a Cloudinary API secret. Deleting a media record from the CMS removes only its Firestore metadata; delete the underlying Cloudinary asset separately in Cloudinary.

If the upload error says **“Upload preset not found”**, the configured preset name does not exist in the selected cloud or is not enabled for unsigned uploads. In Cloudinary Console, confirm the cloud account and the exact preset name, create or enable an unsigned preset with the restrictions above, update `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`, and restart the Next.js server. The CMS now shows this specific diagnosis instead of only a generic upload failure.

Project editing includes separate cover and gallery upload controls. Each uploaded image is recorded in the media library and attached to the project form; save the project to make its image URLs available on the public portfolio. A project appears publicly only when it is both visible and published.

## Deploy

Deploy to Vercel as a standard Next.js app. Add the Firebase and Cloudinary public configuration values to the deployment's environment variables, then redeploy. Keep `.env.local` out of version control.
