<template>
    <div>
      <book-info :info="info"></book-info>
      <comment-list :comments="comments"></comment-list>
      <div class="comment" v-if="showAdd">
        <textarea
          v-model="comment"
          class="textarea"
          maxlength="100"
          placeholder="请输入图书短评"
        ></textarea>
        <div class="location">
          地理位置
          <switch color="#EA5A49" :checke="location"  @change="getGeo"></switch>
          <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone">
          手机型号
          <switch color="#EA5A49" :checke="phone" @change="getPhone"></switch>
          <span class="text-primary">{{phone}}</span>
        </div>
        <button class="btn" @click="addComment">评论</button>
      </div>
      <div v-else class="text-footer">
        未登录或已评论
      </div>
      <button open-type="share" class="btn">转发</button>
    </div>
</template>

<script>
  import {get, post, showModal} from '@/utils/index'
  import BookInfo from '@/components/BookInfo'
  import CommentList from '@/components/CommentList'

  export default {
    components: {
      BookInfo,
      CommentList
    },
    data () {
      return {
        bookid: '',
        info: {},
        comment: '',
        location: '',
        phone: '',
        userinfo: {},
        comments: []
      }
    },
    computed: {
      showAdd () {
        if (!this.userinfo.openId) {
          return false
        }
        // 评论页面里查到自己的openid
        if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
          return false
        }
        return true
      }
    },
    methods: {
      async getDetail () {
        const info = await get('/weapp/bookdetail', {id: this.bookid})
        this.info = info
        wx.setNavigationBarTitle({
          title: info.title
        })
      },
      getGeo (e) {
        // elWDwD5qOkRueF1ZVNdG5gOAckBVj8mg
        const ak = 'elWDwD5qOkRueF1ZVNdG5gOAckBVj8mg'
        let url = 'http://api.map.baidu.com/geocoder/v2/'
        if (e.target.value) {
          wx.getLocation({
            success: geo => {
              wx.request({
                url,
                data: {
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json',
                  ak
                },
                success: res => {
                  if (res.data.status === 0) {
                    this.location = res.data.result.addressComponent.city
                  } else {
                    this.location = '未知地点'
                  }
                }
              })
            }
          })
        } else {
          this.location = ''
        }
      },
      getPhone (e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          this.phone = phoneInfo.model
        } else {
          this.phone = ''
        }
      },
      async addComment () {
        if (!this.comment) {
          return
        }
        // 评论  手机型号  地理位置  图书id  用户的openid
        const data = {
          comment: this.comment,
          phone: this.phone,
          location: this.location,
          bookid: this.bookid,
          openid: this.userinfo.openId
        }
        try {
          await post('/weapp/addcomment', data)
          this.comment = ''
          this.getComment()
        } catch (e) {
          showModal('失败', e.msg)
        }
      },
      async getComment () {
        const comment = await get('/weapp/commentlist', {bookid: this.bookid})
        this.comments = comment.list || []
      }
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComment()
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    }
  }
</script>

<style lang="scss" scoped>
.comment{
  margin-top: 10px;
  .textarea{
    background: #eee;
    padding: 10rpx;
    width: 730rpx;
    height: 200rpx;
  }
  .location{
    margin-top: 10px;
  }
  .phone{
    margin-top: 10px;
  }
}
</style>
