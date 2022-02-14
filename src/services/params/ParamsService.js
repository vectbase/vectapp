// import * as Logger from 'js-logger'
// import Cookies from 'js-cookie'
// import UrlParse from 'url-parse'
//
// /****
//  * ParamsService
//  */
// export class ParamsService {
//   constructor () {
//     Logger.useDefaults()
//     this.logger = Logger.default
//     //
//     this.urlParser = new UrlParse(window.location.href, true)
//   }
//
//   setParams (key, value) {
//     Cookies.set(key, value)
//   }
//   //
//   allUrlQueryParams () {
//     let allUrlQuery = this.urlParser.query
//     return allUrlQuery
//   }
//   allCookiesParams () {
//     let allCookies = Cookies.get()
//     return allCookies
//   }
//   //
//   allParams () {
//     let allUrlQuery = this.urlParser.query
//     let allCookies = Cookies.get()
//     return Object.assign(allUrlQuery, allCookies)
//   }
//   loginTokenValue () {
//     return this.paramValue('loginToken')
//   }
//
//   /***
//      * 验证测试是否为空
//      * []
//      */
//   vPageInitParamsIsNUll (arrayKeys) {
//     //
//     let errormsg = []
//
//     arrayKeys.forEach((value, key) => {
//       //
//       let dataValue = this.paramValue(value)
//       if (dataValue == undefined || dataValue == null || ((dataValue + '').trim().length == 0)) {
//         errormsg.push(value)
//       }
//     })
//     //
//     if (errormsg.length === 0) {
//       return false
//     }
//     return true
//   }
//
//   /***
//      *1:查询参数url
//      * 2：查询 cookies
//      * @param keyStr
//      */
//   paramValue (key) {
//     let value = this.urlParser.query[key]
//     console.log('paramValue()' + key + ' value:' + JSON.stringify(value))
//
//     if (value == undefined || value == null || (value.trim()).length == 0) {
//       value = Cookies.get(key)
//     }
//     return value
//   }
// }
