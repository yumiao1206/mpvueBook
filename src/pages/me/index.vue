<template>
    <div class="container">
      <div class="userinfo" @click="login">
        <img :src="userinfo.avatarUrl" alt="">
        <p>{{userinfo.nickName}}</p>
      </div>
      <YearProgress></YearProgress>

      <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
    </div>
</template>

<script>
  import YearProgress from '@/components/YearProgress'
  import {post, showSuccess, showModal} from '@/utils/index'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/utils/config'

  export default {
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    methods: {
      scanBook () {
        var self = this
        wx.scanCode({
          success (res) {
            if (res.result) {
              self.addBook(res.result)
            }
          }
        })
      },
      async addBook (isbn) {
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        })
        console.log(res.title)
        showModal('添加成功', `${res.title}`)
      },
      login () {
        let user = wx.getStorageSync('userinfo')
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: userInfo => {
              console.log('登录成功', userInfo)
              showSuccess('登录成功')
              // qcloud.request({
              //   url: config.userUrl,
              //   login: true,
              //   success (userRes) {
              //     console.log(userRes.data.data)
              //   }
              // })
              wx.setStorageSync('userinfo', userInfo)
              this.userinfo = userInfo
            },
            fail: err => {
              console.log('登录失败', err)
            }
          })
        }
      }
    },
    onShow () {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding:0 30rpx;
    .userinfo {
      text-align: center;
      margin-top: 100rpx;
      margin-bottom: 50rpx;
      img {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
  }
</style>
