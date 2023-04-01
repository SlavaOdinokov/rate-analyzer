import BigNumber from 'bignumber.js';

export const calcRate = (makingAmount: string, takingAmount: string): string => {
  return new BigNumber(takingAmount).dividedBy(makingAmount).toFixed(18);
};

/*
  -1 - rateF < rateO
  1 - rateF > rateO
  0 - rateF === rateO
*/
export const compareRates = (rateF: string, rateO: string): number => {
  return new BigNumber(rateF).comparedTo(rateO);
};

export const minRate = (arr: string[]): number => {
  let minimum = arr[0];
  for (const item of arr) {
    const isLess = new BigNumber(item).isLessThanOrEqualTo(minimum);
    if (isLess) {
      minimum = item;
    }
  }
  return arr.indexOf(minimum);
};

