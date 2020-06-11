export interface ApiMap {
  [type: string]: ApiMapItem;
}

export interface ApiMapItem {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete';
}

export interface HttpRequestCfg {
  type: string;
  data?: any;
  urlParams?: any;
  disableBI?: boolean;
}

export interface LocationAutoCompleteResponse {
  AdministrativeArea: any;
  Country: any;
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
}
