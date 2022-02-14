import axios from 'axios'
import store from '../../store/appStore'
import qs from 'qs'

const AXIOS = axios.create({
  // baseURL: 'http://localhost:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

AXIOS.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

const AXIOS_DOWNLOAD = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  responseType: 'arraybuffer'
})

AXIOS_DOWNLOAD.interceptors.request.use(config => {
  // config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

// eslint-disable-next-line camelcase
const AXIOS_Ws = axios.create({
  timeout: 5000,
  headers: {},
  transformRequest: [function (data) {
    data = data || {}
    return qs.stringify(data.params)
  }]
})

AXIOS_Ws.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

const AXIOS_UPLOAD = axios.create({
  // baseURL: 'http://localhost:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

AXIOS_UPLOAD.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

const AXIOS1 = axios.create({
  withCredentials: true,
  timeout: 5000,
  headers: {
    'content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [function (data) {
    data = data || {}
    return qs.stringify(data)
  }]
})

AXIOS1.interceptors.request.use(config => {
  config.headers['x-csrf-token'] = store.state.csrfToken
  return config
})

export default class AxiosService {
  /***
   * @param uri
   * @param jsonParams
   * @returns {Promise<{}>}
   *test url:
   * http://localhost:8080/api/user/list/1/type
   */
  async getData (uri, jsonParams) {
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS.get(uri, {params: jsonParams}).then(res => {
        data = res.data
        resolve(res.data)
      }).catch(function (error) {
        // logger.info("error:" + JSON.stringify(error));
        reject(error)
      })
    })

    return data
  }

  // 同步请求数据
  async postSync (uri, requestData) {
    //
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS.post(uri, requestData).then(res => {
        data = res.data
        resolve(res.data)
      }).catch(function (error) {
        // logger.info("error:" + JSON.stringify(error));
        reject(error)
      })
    })

    return data
  }

  // download
  async postDownload (uri, requestData) {
    //
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS_DOWNLOAD.post(uri, requestData).then(res => {
        let headers = res.headers
        let blob = new Blob([res.data], {
          type: headers['content-type']
        })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = requestData.title
        link.click()
      }).catch(function (error) {
        // logger.info("error:" + JSON.stringify(error));
        reject(error)
      })
    })

    return data
  }

  // 同步请求数据
  async postSync1 (uri, JsonParams) {
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS1.post(uri, JsonParams).then(res => {
        data = res.data
        resolve(res.data)
      }).catch(function (error) {
        reject(error)
      })
    })
    return data
  }

  async postSyncWs (uri, jsopParams) {
    //
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS_Ws.post(uri, {params: jsopParams}).then(res => {
        data = res.data
        resolve(res.data)
      }).catch(function (error) {
        // logger.info("error:" + JSON.stringify(error));
        reject(error)
      })
    })

    return data
  }

  async postSyncUpload (uri, JsonParams) {
    let data = {}
    await new Promise((resolve, reject) => {
      AXIOS_UPLOAD.post(uri, JsonParams).then(res => {
        data = res.data
        resolve(res.data)
      }).catch(function (error) {
        reject(error)
      })
    })
    return data
  }
}
