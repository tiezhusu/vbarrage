<template>
  <div id="vbarrage">
      <canvas id="canvas">当前浏览器不支持canvas特性</canvas>
  </div>
</template>

<script>
import Bullet from './bullet'
import utils from './utils'
let canvas
let ctx
export default {
  name: 'vbarrage',
  props: {
    barrageList: {
      type: Array,
      default() {
        return []
      }
    },
    bulletBorder:{
      type: Boolean,
      default: false,
    },
    bulletAvatar:{
      type: Boolean,
      default: false,
    },
    bulletNickname: {
      type: Boolean,
      default: false,
    },
    bulletFontSize: {
      type: Number,
      default: 28,
    },
    bulletFontStyle: {
      type: String,
      default: 'Arial'
    },
    scrollSpeed: {
      type: Number,
      default: 1
    }
    


  },
  data(){
    return {
      list: [], // 由外界传入的待发送列表
      bulletArray: [],// 正在发送的弹幕池
      isScroll: true,// 弹幕滚动状态
      animateState: null,// 储存动画函数以便后续进行暂停等操作
    }
  },
  mounted() {
    this.list = this.barrageList
    this.initCanvas()
    this.initBullet()
    this.animate()
  },
  methods: {
    // 初始化canvas
    initCanvas() {
      let div = document.getElementById('vbarrage')
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      let winW = div.offsetWidth
      let winH = div.offsetHeight
      canvas.width = winW
      canvas.height = winH
    },

    // 单条弹幕构造函数
    initBullet() {
      let isFull = false;// 各条轨道是否已满
      // 将数据Push进弹幕池
      for( let i = 0; i < this.list.length; i++) {
        let y = Math.random() * (canvas.height - 50) + 10;
        // 进行碰撞测试，确保新发送代码不与前弹幕重叠
        for (let j = 0; j<this.bulletArray.length; j++) {
          if(utils.getDistance(
            this.bulletArray[j].x,
            this.bulletArray[j].y,
            this.bulletArray[j].width,
            this.bulletArray[j].height,
            canvas.width,
            y,
            36,
            )) {
            y += Math.random() * 35 + 5;
            j = -1
          }
          if(y > (canvas.height - 100)) {
            isFull = true
            break;
          }
        }
        // 若当前各条轨道皆满
        if(isFull) {
          // 将已发送的弹幕数据 从 待发送列表中删除
          for(let k = 0; k < this.list.length; k++) {
            if(this.list[k] == '' || typeof(this.list[k]) == 'undefined') {
              this.list.splice(k,1);
              k = k - 1
            }
          }
          // 一秒钟后重新执行 将待播放列表中的数据加入弹幕池
          setTimeout(() => {
            this.initBullet()
          },1000)
          break;
        }

        let options = {
          x:canvas.width,
          y,
          dx: this.scrollSpeed,
          fontSize: this.bulletFontSize,
          fontStyle: this.bulletFontStyle,
          bulletBorder: this.bulletBorder,
          bulletAvatar: this.bulletAvatar,
          bulletNickname: this.bulletNickname
        }

        this.bulletArray.push(new Bullet(this.list[i],options))
        //将该条数据置空
        this.list.splice(i,1,'')
      }
    },
    // 发送单条弹幕
    $addBullet(item){
      let isFull = false
      let y = Math.random() * (canvas.height - 50) + 10;
        // 进行碰撞测试，确保新发送代码不与前弹幕重叠
        for (let j = 0; j<this.bulletArray.length; j++) {
          if(utils.getDistance(
            this.bulletArray[j].x,
            this.bulletArray[j].y,
            this.bulletArray[j].width,
            this.bulletArray[j].height,
            canvas.width,
            y,
            36,
            )) {
            y += Math.random() * 35 + 5;
            j = -1
          }
          if(y > (canvas.height - 100)) {
            isFull = true
            break;
          }
        }
        // 若当前各条轨道皆满
        if(isFull) {
          // 一秒钟后重新执行 将待播放列表中的数据加入弹幕池
          setTimeout(() => {
            this.initBullet()
          },1000)
        }

        let options = {
          x:canvas.width,
          y,
          dx: this.scrollSpeed,
          fontSize: this.bulletFontSize,
          fontStyle: this.bulletFontStyle,
          bulletBorder: this.bulletBorder,
          bulletAvatar: this.bulletAvatar,
          bulletNickname: this.bulletNickname
        }

        this.bulletArray.push(new Bullet(item,options))
        //将该条数据置空
    },
    // 暂停弹幕滚动
    $pauseScroll(){
      cancelAnimationFrame(this.animateState)
      console.log(this.bulletBorder)
    },
    // 重新开始弹幕滚动
    $startScroll(){
      this.animateState = this.animate
      requestAnimationFrame(this.animateState)
    },
    // 清空当前屏幕弹幕
    $clearBarrageList(){
      this.bulletArray = []
    },
    // 重新初始化canvas宽高
    $resetCanvas() {
      this.initCanvas()
    },

    // 动画刷新
    animate() {
      this.animateState = requestAnimationFrame(this.animate)
      ctx.clearRect(0,0, canvas.width, canvas.height);
      // 刷新弹幕池中的弹幕位置
      for (let i = 0; i < this.bulletArray.length; i++) {
        let bullet = this.bulletArray[i]
        // 检测该条弹幕是否已离开窗口，若离开则从弹幕池中删除，减少内存占用
        if(bullet.x + bullet.width <= 0) {
          this.bulletArray.splice(i, 1);
          i--;
          continue;
        }
        bullet.update(ctx)
      }
    }
    
  }
}
</script>
<style>
#vbarrage {
    width: 100%;
    height: 100%;
}
</style>