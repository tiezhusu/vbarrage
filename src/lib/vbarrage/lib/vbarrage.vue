<template>
  <div id="vbarrage">
      <canvas id="canvas">www</canvas>
      <div>sss</div>
  </div>
</template>

<script>
import Bullet from './bullet'
import utils from './utils'
let canvas
let ctx
export default {
  name: 'vbarrage',
  data(){
    return {
      list: [
        {
          msg: '1这是一条弹幕',
          photo: '',
          nickname: '',
        },
      ],
      bulletArray: []
      
    }
  },
  mounted() {
    for(let i = 0; i < 300; i++) {
      this.list.push(
        {
          msg: `${i}这是一条弹幕`,
          photo: '',
          nickname: '',
        }
      )
    }
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
      console.log('init完成')
    },

    // 单条弹幕构造函数
    initBullet() {
      let isFull = false;
      for( let i = 0; i < this.list.length; i++) {
        let y = Math.random() * 5 + 10;
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
          // if(time >= 30) {
          //   time = 0
          //   break;
          // }
        }
        if(isFull) {
          for(let k = 0; k < this.list.length; k++) {
            if(this.list[k] == '' || typeof(this.list[k]) == 'undefined') {
              this.list.splice(k,1);
              k = k - 1
            }
          }
          setTimeout(() => {
            this.initBullet()
          },1000)
          break;
        }
        this.bulletArray.push(new Bullet(
          canvas.width,
          y,
          1,
          this.list[i].avatar,
          this.list[i].msg,
          this.list[i].nickname
          ))
        this.list.splice(i,1,'')
      }
    },

    // 重新初始化canvas
    resetCanvas() {
      this.initCanvas()
    },

    // 动画刷新
    animate() {
      requestAnimationFrame(this.animate)
      ctx.clearRect(0,0, canvas.width, canvas.height);
      for (let bullet of this.bulletArray) {
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