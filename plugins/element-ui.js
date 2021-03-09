import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import {
  Icon,
  Button,
  Radio,
  RadioButton,
  RadioGroup,
  Row,
  Col,
  InputNumber,
  Carousel,
  CarouselItem,
  Popover,
  Tabs,
  TabPane,
  Tooltip,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Image,
  Card,
  // Message,
  // MessageBox,
  Input,
  Form,
  FormItem,
  Divider,
  Checkbox,
  Loading,
  Select,
  Option,
  Table,
  TableColumn,
  Dialog,
  Rate,
  Backtop,
  Upload,
  Autocomplete,
  Cascader,
  CheckboxGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  CheckboxButton
} from 'element-ui'

export default () => {
  Vue.use(Icon)
  Vue.use(Button)
  Vue.use(Radio)
  Vue.use(RadioButton)
  Vue.use(RadioGroup)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(InputNumber)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Popover)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Tooltip)
  Vue.use(Pagination)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Image)
  Vue.use(Card)
  Vue.use(Input)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Divider)
  Vue.use(Checkbox)
  Vue.use(Loading.directive)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Dialog)
  Vue.use(Rate)
  Vue.use(Backtop)
  Vue.use(Upload)
  Vue.use(Autocomplete)
  Vue.use(Cascader)
  Vue.use(CheckboxGroup)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(CheckboxButton)

  // Vue.prototype.$message = Message
  // Vue.prototype.$msgbox = MessageBox
  // Vue.prototype.$prompt = MessageBox.prompt
  // Vue.prototype.$confirm = MessageBox.confirm
}

// Vue.use(Element, { locale })
