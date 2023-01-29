import axios from "axios"
import type { AxiosInstance } from "axios"
import type {HYRequestInterceptors, HYRequestConfig} from "./type";
// 引入ui组件库的加载样式 这边暂不引入
const DEFAULT_LOADING  = false

class HYRequest {
  instance: AxiosInstance;
  showLoading: boolean;
  // loading? Loading实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if(this.showLoading) {
          alert('加载中')  // 代替loading
        }
        return config
      },
      (err) => {
        console.log("请求拦截失败")
        return err
      }
    )
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log("响应拦截器，拦截成功")
        // 若上面有loading  则将loading移除
        const data = res.data as any
        if(data.code === '401') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('响应拦截器，拦截失败');
        if (err.response.status === 404) {
          console.log("404的错误")
        }
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			if (config.showLoading === true) {
				this.showLoading = config.showLoading;
			}
			this.instance
				.request<any, any>(config)
				.then(res => {
					this.showLoading = DEFAULT_LOADING
					resolve(res);
				})
				.catch(err => {
					this.showLoading = DEFAULT_LOADING
					reject(err);
					return err;
				});
		});
  }


 
  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({...config, method: "get"});
  }
 
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({...config, method: "post"});
  }
 
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({...config, method: "delete"});
  }
 
  patch<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({...config, method: "patch"});
  }
}

export default HYRequest