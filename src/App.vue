<script>
export default {
  async created () {
    console.log('小程序启动了！')
  }
}
</script>

<style>
  .text-footer{
    text-align: center;
    font-size: 12px;
  }
  .text-primary{
    color: #EA5149;
  }
  .page-title{
    padding-left: 20px;
    background: #eee;
    line-height: 40px;
    font-size: 14px;
  }
  .right{
    float: right;
  }
  .btn{
    color: #fff;
    background: #EA5A49;
    margin: 10px auto;
    padding: 0 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 95%;
  }
  .btn:active{
    background: #FA5A49;
  }
</style>
