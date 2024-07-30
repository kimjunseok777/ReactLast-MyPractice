import { LAYOUT_METADATA } from "../consts/metadata";

export function dynamicLayoutMetadata(pathname) {
  const basePath = pathname.split("/").slice(0, 2).join("/");
  return LAYOUT_METADATA[basePath];
}
