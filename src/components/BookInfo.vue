<template>
  <div class="book-info">
    <div class="thumb" @click="abc()">
      <img class="back"
           mode="aspectFill"
           :src="info.image">
      <img class="img"
           mode="aspectFit"
           :src="info.image">
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.image" class="avatar" mode='aspectFit'>
      {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分 <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
    </div>
  </div>
</template>

<script>
  import Rate from '@/components/Rate'

export default {
    components: {
      Rate
    },
    name: 'BookInfo',
    props: ['info'],
    computed: {
      userinfo () {
        return this.info.user_info || {}
      }
    }
}
</script>

<style lang="scss" scoped>
.book-info{
  font-size: 14px;
  .right{
    float: right;
  }
  .detail{
    padding: 5px 10px;
    .avatar{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back{
      width: 100%;
      filter: blur(15px);
    }
    .img {
      position: absolute;
      width: 100%;
      height: 300rpx;
      left: 0;
      top: 30rpx;
    }
    .info{
      color: #fff;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title{
        font-size: 20px;
      }
      .author{
        font-size: 14px;
      }
    }
  }
  .tags{
    .badge{
      display: inline-block;
      margin: 5px;
      padding: 5px;
      border-radius: 10px;
      border: 1px solid #EA5A49;
      color: #EA5A49;
    }
  }
  .summary{
    margin-top: 10px;
    padding: 0 15px;
    p{
      text-indent: 2em;
      font-size: 14px;
    }
  }
}
</style>
