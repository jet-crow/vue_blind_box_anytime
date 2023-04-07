import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'


const app = createApp(App);

/* 全局方法 */
//获取本地图片
/* 
使用：
 css请使用行内样式
 :style="{backgroundImage:`url(${$getImgUrl('loginBg.jpg')})`}"
 js：请调用
    $getImgUrl('xxx.jpg')
*/
app.config.globalProperties.$getImgUrl = (src) => {
    return "./images/" + src
}

app.use(router);
app.mount('#app');
