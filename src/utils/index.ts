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
