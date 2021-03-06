// 暂时不要使用iview了 谢谢
import Vue from 'vue'
import {
  BackTop,
  Button,
  Icon,
  Divider,
  Message,
  Modal,
  RadioGroup,
  Radio,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  CheckboxGroup,
  Input,
  Tabs,
  TabPane,
  Scroll,
  Poptip
} from 'iview'

import '@/assets/theme/iview-theme.css'

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

// Vue.use(iView);
Vue.component('BackTop', BackTop)
Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Divider', Divider)
Vue.component('Message', Message) // 好像没有已组件的形式使用 后续用不到就可以删除
Vue.component('Modal', Modal)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Checkbox', Checkbox)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Input', Input)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Scroll', Scroll)
Vue.component('Poptip', Poptip)
