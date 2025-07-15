export const getSanityImageWidth = (image: string) => {
  return image.split("x")[0].split("-")[1];
};

export const getSanityImageHeight = (image: string) => {
  return image.split("x")[1].split(".")[0];
};

interface Hotspot {
  x: number;
  y: number;
}

export function getPositionFromHotspot(hotspot: Hotspot) {
  if (!hotspot || !hotspot.x || !hotspot.y) return "center";

  return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
}
