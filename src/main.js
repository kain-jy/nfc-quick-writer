import { createApp } from 'vue'
import { Locale, Uploader, Button, FloatingPanel, Empty, Tabs, Tab, Pagination } from 'vant';

import 'vant/lib/index.css'
import enUS from 'vant/es/locale/lang/en-US';
import App from './App.vue'

const app = createApp(App)
app.use(Uploader)
app.use(Button)
app.use(FloatingPanel)
app.use(Empty)
app.use(Tabs)
app.use(Tab)
app.use(Pagination)

Locale.use('en-US', enUS);

app.mount('#app')
