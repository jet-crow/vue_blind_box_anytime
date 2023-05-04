import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import './assets/css/reset.css';
import 'vant/es/toast/style';
import {showSuccessToast, showFailToast} from 'vant';

const app = createApp(App);
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://localhost:9090';

/* 获取的token放到headers中 */
axios.interceptors.request.use(
    function (config) {
        let token = localStorage.getItem("token");
        if (token) {
            // 添加headers
            config.headers['token'] = token; // token
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

app.config.globalProperties.$api = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$showSuccessToast = showSuccessToast;
app.config.globalProperties.$showFailToast = showFailToast;

/* 全局方法 */
//获取本地图片
app.config.globalProperties.$getImgUrl = (src) => {
    if (src === undefined) {
        return "/";
    }
    // return require("./images/" + src)
    return "./images/" + src;
};

app.use(router);
app.mount('#app');
