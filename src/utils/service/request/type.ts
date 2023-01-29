
import type {AxiosRequestConfig} from "axios";
//拦截器
export interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: any) => any;
  rrequestInterceptorCatch?: (error: any) => any;
}
 
export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors;
  showLoading?: boolean;
}
