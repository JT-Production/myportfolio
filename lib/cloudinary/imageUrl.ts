export function optimizedCloudinaryUrl(url: string, width: number) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "res.cloudinary.com") return url;

    const uploadMarker = "/upload/";
    const markerIndex = parsed.pathname.indexOf(uploadMarker);
    if (markerIndex === -1) return url;

    const pathAfterUpload = parsed.pathname.slice(
      markerIndex + uploadMarker.length,
    );
    const firstSegment = pathAfterUpload.split("/")[0];
    const transformation = `f_auto,q_auto,w_${Math.min(Math.max(Math.round(width), 1), 2000)}`;
    const optimizedPath = /^v\d+$/.test(firstSegment)
      ? `${parsed.pathname.slice(0, markerIndex + uploadMarker.length)}${transformation}/${pathAfterUpload}`
      : `${parsed.pathname.slice(0, markerIndex + uploadMarker.length)}${transformation},${firstSegment}/${pathAfterUpload.slice(firstSegment.length + 1)}`;

    parsed.pathname = optimizedPath;
    return parsed.toString();
  } catch {
    return url;
  }
}
