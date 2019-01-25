<template>
    <div class="comment-list">
      <div class="page-title" v-if="comments.length">
        评论
      </div>
      <div class="comment"
           v-for="comment in comments"
           :key="comment.id"
           @click="handleClick(comment)"
      >
        <div class="user">
          <div class="inline">
            <img :src="comment.image" class="avatar" mode="aspectFit">
            {{comment.title}}
          </div>
          <div class="right">
            {{comment.location || '未知地点'}}
            <span class="text-primary">--</span>
            {{comment.phone || '未知型号'}}
          </div>
        </div>
        <div class="comment">
          {{comment.comment}}
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'CommentList',
    props: ['comments', 'type'],
    methods: {
      handleClick (item) {
        if (this.type === 'user') {
          wx.navigateTo({
            url: '/pages/detail/main?id=' + item.bookid
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.comment-list{
  background: #eee;
  font-size: 14px;
  .comment {
    background: #fff;
    margin-bottom: 10px;
    padding: 5px 20px;
    .content{
      margin: 10px 0;
    }
    .user{
      .inline{
        display: inline;
        .avatar{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
