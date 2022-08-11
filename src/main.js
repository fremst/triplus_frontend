import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

//테마설정
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(store);
app.use(router);

app.use(PrimeVue);

// PrimeVue의 컴포넌트를 전역으로 사용하고 싶을땐 여기에 등록해서 사용한다.
app.component("InputText", InputText);
app.component("Button", Button);

app.mount("#app");
