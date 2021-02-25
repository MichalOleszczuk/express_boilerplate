export interface Unit {
  code: string;
  description: string;
  iconUrl?: any;
}

export interface RateUnit {
  code: string;
  description: string;
  iconUrl?: any;
}

export interface Value {
  '@type': string;
  value: any;
}

export interface OfferAttribute {
  code: string;
  groupCode: string;
  name: string;
  description: string;
  iconUrl?: any;
  unit: Unit;
  rateUnit: RateUnit;
  value: Value;
  ordinalNumber: number;
}

export interface IOffer {
  name: string;
  netPrice: number;
}

export interface IOffersResponse {
  offers: IOffer[];
}
