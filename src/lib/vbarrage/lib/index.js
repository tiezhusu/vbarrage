// vbarrage.vue写我们的组件
import vbarrage from './vbarrage'

// 定义我们的插件
const myPlugin = {    
    // 该插件有一个install方法
    // 方法的第一个参数是传入的Vue，第二个参数可以插件的自定义参数
    // 不过感觉如果要自定义参数的话，在用的组件里面去定义会好一些
    install (Vue, options) {
        // 将其注册为vue的组件，'vpay'是组件名，keyboard是我们开发的组件
        Vue.component('vbarrage', vbarrage)    
    }
}

// 将插件导出，并在main.js中通过Vue.use()即可使用插件
export default myPlugin
// 由小小苏编写，目前就是个练手水平，千万别在工作里用啊
