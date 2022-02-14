import {services} from '../../store/appStore'
import {URL} from '../../store/URLConst'

/**
 * LoginService Obj
 */
// const forge = require('node-forge')
export default class LoginService {
  async register (paramJson) {
    return paramJson.time > new Date().getTime() ? services.axiosService.postSync1(URL.auth.register_url, paramJson)
      : {}
  }

  async csrf () {
    return services.axiosService.postSync1(URL.auth.csrf_init)
  }

  async password () {
    return services.axiosService.postSync1(URL.auth.passwd_init)
  }

  async checkDomain (paramJson) {
    return services.axiosService.postSync1(URL.auth.chk_domain_url, paramJson)
  }

  async login (paramJson) {
    return services.axiosService.postSync1(URL.auth.login_user_url, paramJson)
  }

  async getCurrentUser () {
    return services.axiosService.postSync1(URL.auth.current_user, {props: 'name,entityId,firstName,lastName,email'})
    /* return {
      'success': true,
      'code': 200,
      'msg': 'SUCCESS',
      'data': {
        'password': '08c682b8c2f72c0907c63706dbe768f1',
        'accountEntityId': '1478385151783292929',
        'displayName': 'xy',
        'loginName': 'xy',
        'newUser': false,
        'name': 'xy',
        'entityId': '1477937487979532290',
        'currentRoleEntityId': '1477937488369565699',
        'userName': 'xy',
        'passwordSalt': 'a26e86160d20f3d771368e9c4e08536f',
        'email': 'andy.lu@vectbase.com',
        'changePassword': true
      }
    } */
  }

  async changeUserInfo (param) {
    return services.axiosService.postSync1(URL.auth.change_user_info, param)
  }

  async changePassword (param) {
    return services.axiosService.postSync1(URL.auth.change_password, param)
  }

  async signOut () {
    return services.axiosService.postSync1(URL.auth.sign_out, {})
  }
}
