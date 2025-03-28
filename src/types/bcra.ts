export interface MetaData {
  count: number;
  offset: number;
  limit: number;
}

export interface ResponseData {
  status: number;
  errorMessages: string[];
  results: TimeSeriesData[];
  metadata: {
    results: MetaData;
  };
}

export interface TimeSeriesData {
  fecha: string;
  valor: number;
}
