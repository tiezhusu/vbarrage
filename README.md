# vbarrage

Easy and lightest danmaku component for web UI.</br>
一个易用且轻便的canvas弹幕插件

## 当前版本 0.2.0
---

目前已实现在项目中安装、使用。</br>
提供边框、头像、昵称、字体、字号、滚动速度的选用</br>
提供发送单条弹幕，暂停滚动、恢复滚动、清空当前弹幕、重设canvas（以便适应窗口变化）的api接口</br>

下一版本将优化弹幕样式


## 插件安装与使用
---

### 安装至项目中

1.使用npm安装

```
npm i vbarrage
```

2.在main.js中引入使用

```
import vbarrage from 'vbarrage'

Vue.use(vbarrage);
```

### 在组件中使用


```
<template>
  <div class="app">
    <vbarrage 
    :barrageList="list" 
    ></vbarrage>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
          {
              msg:'这里是弹幕内容'
          }
      ] //弹幕列表
    }
  }
}
</script>
```
</br>

到这里为止，你就使用上这款弹幕插件啦，是不是很简单

</br>

## API 
---
### Options
|Name|Type|是否必填|介绍|
|-|:-:|:-:|:-:|
|bulletBorder|Boolean|否|默认为false，即不显示边框|
|bulletAvatar|Boolean|否|默认为false，即不显示头像|
|bulletNickname|Boolean|否|默认为false，即不显示昵称|
|bulletFontSize|Number|否|字号，默认为28|
|bulletFontStyle|String|否|字体，默认为'Arial'|
|scrollSpeed|Number|否|滚动速度，默认为1|

</br>

### Barrage List Format
|Name|Type|是否必填|介绍|
|-|:-:|:-:|:-:|
|msg|String|是|弹幕的文本内容|
|avatar|String|否|发送者的头像,若开启了头像显示，则为必填|
|nickname|String|否|发送者的昵称，若开启了昵称显示，则为必填|

</br>

### Methods

|Name|是否必须传参|介绍|
|-|:-:|:-:|
|$addBullet|是|发送单条弹幕方法，参数格式与barrageList的元素保持一致即可|
|$pauseScroll|否|暂停弹幕滚动|
|$startScroll|否|重新开始弹幕滚动|
|$clearBarrageList|否|清空当前屏幕的弹幕（还未显示的不会清空）|
|$resetCanvas|否|重新初始化canvas宽高（以便适应窗口变化）|

</br>

## Examples
---
这里是一个实际使用时候的例子
```
<template>
  <div class="app">
    <div class="barrage-node">
      <vbarrage 
        :barrageList="list" 
        :bulletFontSize="33"
        :bulletNickname="true"
        ref="vbarrage"
      ></vbarrage>
    </div>
    <button @click="send" >发送弹幕</button>
    <button @click="start" >恢复滚动</button>
    <button @click="pause" >暂停滚动</button>
    <!-- 为组件设定一个ref，以便调用其方法 -->
    <!-- canvas将继承父节点的宽高 -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [
        {
          msg: '假设这是提前使用ajax',
          avatar: '',
          nickname: '',
        },
        {
          msg: '获取到的弹幕列表',
          avatar: '',
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
      // 通过$addBullet方法发送的弹幕，将会即时显示在屏幕中
    },
    start(){
      this.$refs.vbarrage.$startScroll()
      // 通过this.$refs.vbarrage来调用组件的方法
    },
    pause(){
      this.$refs.vbarrage.$pauseScroll()
    },
  }
}
</script>

<style scoped>
.barrage-node {
  width: 980px;
  height: 380px;
  padding: 10px;
  margin: 0 auto;
}
</style>

```



</br>

## 关于效果展示和源码
---

可以直接将本项目克隆至本地

克隆至本地后，安装依赖
```
npm install
```

启动项目
```
npm run serve
```

启动项目后打开项目页面，即可看到弹幕滚动效果

</br>

插件代码所在目录
```
src/lib/vbarrage
```