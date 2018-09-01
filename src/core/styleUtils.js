// @flow


export const size = (size: number|string) =>
  Number.isFinite(size) ? `${size}px` : size
