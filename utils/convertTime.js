export function convertToUTC(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export function convertToLocal(date) {
  return new Date(date.getTime() + 6 * 60 * 60 * 1000);
}
