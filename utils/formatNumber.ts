export const formatNumberWithCommas = (number: number): string => {
  return new Intl.NumberFormat().format(number);
};
