// 工具函数库
import config from './config'

/**
 *  小于10前置添0
 * @param n  要判断的数值
 * @returns {string}
 */
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/**
 *  格式化时间
 * @param date  时间
 * @returns {string}
 */
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 *  get请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function get (url, data) {
  return request(url, 'GET', data)
}

/**
 * post请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function post (url, data) {
  return request(url, 'POST', data)
}

/**
 *  request 请求
 * @param url
 * @param method
 * @param data
 * @returns {Promise<any>}
 */
export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

/**
 * 成功提示信息
 * @param text
 */
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

/**
 * 显示弹窗
 * @param title
 * @param content
 */
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export default {
  formatNumber,
  formatTime,
  get,
  post,
  request,
  showSuccess,
  showModal
}
