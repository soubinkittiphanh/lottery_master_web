import { createApp } from "vue";
import App from "./App.vue";
import './axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./store/index.js";
import router from "./router.js";
// import url from "./config";

const app=createApp(App);
app.use(store);
app.use(router);
// app.use(url);
app.mount("#app");
