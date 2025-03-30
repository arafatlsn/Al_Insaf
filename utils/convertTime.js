export function convertToUTC(date) {
  return new Date(date - 6 * 60 * 60 * 1000);
}

export function convertToLocal(date) {
  return new Date(date + 6 * 60 * 60 * 1000);
}
