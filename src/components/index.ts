// import customised global comppnents
import SvgIcon from '@/components/SvgIcon/index.vue'

//import all icon components from ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: any = { SvgIcon }

export default {
  // 自定义插件的方法
  install(app: any) {
    //regist all customised global components
    Object.keys(allGlobalComponent).forEach((key) => {
      console.log(allGlobalComponent[key])
      app.component(key, allGlobalComponent[key])
    })

    //regist all icons from ElementPlus
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
