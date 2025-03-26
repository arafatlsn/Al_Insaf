export const bdFormatNumber = (number) => {
  let bdt = 0;
  if (number) {
    bdt = number.toLocaleString("bn-BD");
  }
  return bdt;
};
