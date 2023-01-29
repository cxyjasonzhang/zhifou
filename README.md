# Vue 3 + TypeScript + Vite

### 一、开篇   ----  搭建项目 及 一些问题

使用vite搭建一个项目模板，安装第三方模块，安装eslint，配置eslint

1、eslint 报错

![1669082924251](C:\Users\12080\AppData\Roaming\Typora\typora-user-images\1669082924251.png)

解决：

![1669083064445](C:\Users\12080\AppData\Roaming\Typora\typora-user-images\1669083064445.png)

2. ```
   [eslint] 'module' is not defined. (no-undef)
   消除这个报错
   加上框框里面的
   ```

解决： ![1669084585707](C:\Users\12080\AppData\Roaming\Typora\typora-user-images\1669084585707.png)

### 二、项目开始

> 分析原型图，拆分组件，
>
> 先写静态页面

三、透传attribute

> 禁用透传：inheriAttrs: false    加这个属性
>
> 如果要指定元素来继承这个由父组件传过来的属性(不是通过props)，指定的元素使用v-bind = "$attrs"

### 四、ref 不仅可以访问子元素还可以访问子组件实例

> 访问子组件场景：访问子组件并触发其里面定义的方法

### 五、父子组件通信

> 

### 六、this在setup中无法访问

### 七、在vue3 + ts 项目中使用vue-router

> 支持vue3的为 4.x版本

```typescript
import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'

const routerHistory = createWebHistory() // history模式
const router = createRouter({
  history: routerHistory,
  routes:[
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Home.vue')
    },
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```

在组件中获取route实例对象

```js
import {useRoute} from 'vue-router'

```



### 八、place-items     css样式属性

> 比如在flex布局中的align-items、justify-items的合体
>
> place-items: center start;  第一个值为align-items 第二个值为justify-items

九、

![1669778640369](C:\Users\12080\AppData\Roaming\Typora\typora-user-images\1669778640369.png)

### 十、状态管理工具       -----   解决了什么问题

> 第一： 全局对象的弊端  
>
> 1、数据不是响应式的
>
> 2、数据修改无法追踪
>
> 3、不符合组件设计的原则

它解决了什么问题？ 这边是指Vuex

一个类似于object的全局数据结构 -- 称之为 store   （核心）

只能调用一些特殊的方法实现对数据的修改

其状态储存是响应式的

不能直接改变store中的状态，唯一途径就是显式地提交（commit） mutation



#### 十一、路由守卫

router.beforeEach()  路由前置守卫

#### 十二、页面管理

> 有些页面在不登录也能访问，有些页面要登录才能访问
>
> 如何实现？使用路由元信息 
>
> 

#### 十三、什么是RESTful  API？

 endPoints：具体路径(具体网址)

methods: 请求方法

发送请求的具体参数

请求返回的具体数据格式

5f3e86d62c56ee13bb83096b      ----- 慕课网 那个请求的code

