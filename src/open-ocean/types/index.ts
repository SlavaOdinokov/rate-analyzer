export interface OpenOceanResponse {
  code: number;
  data: OpenOceanDataResponse[];
}

export interface OpenOceanDataResponse {
  makerAmount: string;
  takerAmount: string;
  signature: string;
  orderHash: string;
  createDateTime: string;
  orderMaker: string;
  remainingMakerAmount: string;
  makerBalance?: string;
  makerAllowance?: string;
  expireTime: string;
  statuses: number;
  data: OpenOceanInnerData;
  makerRate?: string;
  takerRate?: string;
}

export interface OpenOceanInnerData {
  makerAsset: string;
  makerAssetSymbol: string;
  makerAssetDecimals: number;
  makerAssetIcon: string;
  takerAsset: string;
  takerAssetSymbol: string;
  takerAssetDecimals: number;
  takerAssetIcon: string;
  getMakerAmount: string;
  getTakerAmount: string;
  makerAssetData?: string;
  takerAssetData?: string;
  salt: string;
  permit?: string;
  predicate: string;
  interaction?: string;
  makingAmount: string;
  takingAmount: string;
  maker: string;
  receiver: string;
  allowedSender: string;
}
