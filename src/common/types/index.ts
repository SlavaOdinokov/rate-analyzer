export interface ProxyRequest {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  params?: any;
  data?: any;
  headers?: HttpHeaders;
}

export interface ProxyParams {
  page?: number;
  limit?: number;
  statuses?: number[]; // [1,2,3]
  chainId?: number; // 1, 56, 137, 250, 43114
}

export type ProxyResponse = any | ErrorResponse;

export interface ErrorResponse {
  status: number;
  error: string;
}

export interface HttpHeaders {
  [key: string]: string;
}

export interface AxiosError {
  response: { status: number; data: any };
}

export interface DeleteResponse {
  status: number;
  message: string;
}
