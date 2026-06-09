export type FontScale = "normal" | "large" | "xlarge";

export const fontScales: FontScale[] = ["normal", "large", "xlarge"];

/** Prozentwert, der auf die Root-`font-size` (`<html>`) angewendet wird. */
export const fontScalePercent: Record<FontScale, string> = {
  normal: "100%",
  large: "115%",
  xlarge: "130%",
};
