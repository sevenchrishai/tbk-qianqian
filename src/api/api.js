import axios from 'axios'
import urls from './url'
import api_host from '@/api'

// 定义axios基本设置
const request = axios.create({
    baseURL: api_host,
    timeout: 30000,//请求超时时间
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 请求uke-api要求配置时间搓和密钥
    config.headers = {
        requestTime: new Date().getTime(),
        'Content-Type': 'application/json; charset=utf-8'
    };
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response['Content-Type'] = 'application/json;charset=UTF-8'
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 错误统一处理
const createError = (code, resp) => {
    const err = new Error(resp.message)
    err.code = code
    return err
}

/**
 * @请求统一处理
 * **/
const handleRequest = ({status, data}) => {
    if (status === 200) {
        return data
    } else {
        throw createError(status)
    }
}

export default () => {
    return {
        async getTpwdConvertSc(obj) {
            return handleRequest(await request.post(urls.tpwdConvertSc, obj))
        },
        async getTpwdCreate(obj) {
            return handleRequest(await request.post(urls.tpwdCreate, obj))
        },

    }
}
