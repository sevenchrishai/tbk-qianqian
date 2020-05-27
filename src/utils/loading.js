/**
 * @author: chris
 * Date     2020-05-27
 */
import {Loading} from 'element-ui'
let loadingRequestCount = 0;
let loadingInstance = null

export const showLoading = () => {
    if (!loadingInstance && loadingRequestCount === 0) {
        loadingInstance = Loading.service({
            target: 'el-form',
            text: '拼命加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    loadingRequestCount++
}
export const hideLoading = () => {
    if (loadingRequestCount <= 0) return
    loadingRequestCount--
    if (loadingInstance && loadingRequestCount === 0) {
        loadingInstance.close();
        loadingInstance = null
    }
}