import { message } from 'antd';
import axios from 'axios';
import getToken from './getToken';
axios.defaults.baseURL = '';

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(config, 'config');

    return config;
  },
  (error) => {
    console.log(error);

    // return Promise.reject(error);
  }
);

// 拦截器
axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

export async function getAxios(url: string, headers?: any, ...params: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers,
        params: { ...params[0] }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    message.error(err.response.data ? err.response.data.msg : '未知请求错误');
  });
}

export async function postAxios(url: string, headers?: any, data?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      headers,
      method: 'post',
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    message.error(err.response.data ? err.response.data.msg : '未知请求错误');
  });
}

export async function putAxios(url: string, headers?: any, data?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      headers,
      method: 'put',
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    message.error(err.response.data ? err.response.data.msg : '未知请求错误');
  });
}

export async function deleteAxios(url: string, headers?: any, data?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      url,
      headers,
      method: 'delete',
      data: data
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  }).catch((err) => {
    message.error(err.response.data ? err.response.data.msg : '未知请求错误');
  });
}
export default axios;
