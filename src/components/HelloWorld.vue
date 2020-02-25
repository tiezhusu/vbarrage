<template>
  <div class="hello">
    <div class="ba" ref="ba">
      <vbarrage 
        :barrageList="list" 
        ref="vbarrage"
      ></vbarrage>
    </div>
    <button @click="send" >发弹幕</button>
    <button @click="start" >开始滚动</button>
    <button @click="pause" >暂停滚动</button>
    <button @click="clear" >清空弹幕</button>
    <button @click="change" >改变视窗大小</button>
    

  </div>
</template>

<script>
import vbarrage from '../lib/vbarrage/lib/vbarrage'
export default {
  name: 'HelloWorld',
  components: {
    vbarrage
  },
  data(){
    return {
      list: [
        {
          msg: '1这是一条弹幕',
          photo: '',
          nickname: '',
        },
        {
          msg: '2这是一条弹幕',
          photo: '',
          nickname: '',
        },
        {
          msg: '3这是一条弹幕',
          photo: '',
          nickname: '',
        },
        {
          msg: '4这是一条弹幕',
          photo: '',
          nickname: '',
        },
        {
          msg: '5这是一条弹幕',
          photo: '',
          nickname: '',
        },
        {
          msg: '6这是一条弹幕',
          photo: '',
          nickname: '',
        },
      ],
    }
  },
  methods:{
    send() {
      let item = {
          avatar:'',
          msg:'这是新增加的弹幕',
          nickname:''
      }
      this.$refs.vbarrage.$addBullet(item)
    },
    start(){
      this.$refs.vbarrage.$startScroll()

    },
    pause(){
      this.$refs.vbarrage.$pauseScroll()
    },
    clear(){
      this.$refs.vbarrage.$clearBarrageList()
    },
    change(){
      this.$refs.ba.style.width = '1500px'
      this.$refs.vbarrage.$resetCanvas()
      

    }
  },
  mounted() {
    for(let i = 0; i < 5; i++) {
      this.list.push(...this.list)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ba {
  width: 980px;
  height: 380px;
  padding: 10px;
  margin: 0 auto;
}
</style>
