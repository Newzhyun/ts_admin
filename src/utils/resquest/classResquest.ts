import axios from 'axios';
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse
} from 'axios';
//拦截器回调函数
interface InstanceHooks {
  resquest?: (resquest: AxiosRequestConfig) => AxiosRequestConfig;
  resquestCatch?: (err: any) => any;
  response?: (response: AxiosResponse) => AxiosResponse;
  responseCatch?: (err: any) => any;
}

interface ResquestInstanceHooks extends AxiosRequestConfig {
  instanceConfig: InstanceHooks;
}
export default class Resquest {
  //axios实例
  instance: AxiosInstance;
  //回调函数属性
  instanceConfig?: InstanceHooks;
  constructor(config: ResquestInstanceHooks) {
    //生成实例
    this.instance = axios.create(config);
    //保存拦截器回调函数
    this.instanceConfig = config.instanceConfig;
    // 响应和请求拦截器
    this.instance.interceptors.request.use(
      this.instanceConfig.resquest,
      this.instanceConfig.responseCatch
    );
    this.instance.interceptors.response.use(
      this.instanceConfig.response,
      this.instanceConfig.responseCatch
    );
  }
  //请求方法
  resquest<T = any>(config: AxiosRequestConfig): Promise<T> {
    //保证值的类型
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  //get 方法
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.resquest({ ...config, method: 'GET' });
  }
  //post 方法
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.resquest({ ...config, method: 'POST' });
  }
}
