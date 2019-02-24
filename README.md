## 京东金融webAPP

### 工程构建
| 技术选型 | 方案    |
| :--------: | :-------: |
| MVVM框架 | Vue |
| 构建工具 | webpack |
| 移动端适配方案 | REM适配 |
| 代码检测工具 | ESLint |



### 模块化设计

#### CSS模块化设计

 - 设计原则
   - 可复用能继承要完整
     - 布局 -> 页面 -> 功能 -> 业务
   - 周期性迭代
- 设计方法
  - 先整体后部分再颗粒化
  - 先抽象再具体

#### JS模块化设计

- 设计原则

  - 高内聚低耦合

  - 周期性迭代

- 设计方法

  - 先整体后部分再颗粒化
  - 尽可能的抽象

### 自适应

- 基本概念
  1. CSS像素、设备像素、逻辑像素、设备像素比
  2. viewport
  3. rem
- 工作原理
  - 利用viewport和设备像素比调整基准像素
  - 利用px2rem自动转换css单位

### SPA设计

- 设计意义
   - 前后端分离
   - 减轻服务器压力
   - 增强用户体验
   - 使用预渲染或服务端渲染优化SEO
- 工作原理
  - 通过JS监听路由变化，匹配文件并渲染页面
  - History
    - pushState改变路由，popstate监听路由变化
  - Hash
    - location.hash改变路由，hashchange监听路由变化

### 项目模块化设计实践

#### 首页组件设计

- Header
- Slider
- btn
- panel
- Footer
- Navbar

### 功能划分

#### CSS

| 文件         | 功能     | 详情           |
| ------------ | -------- | -------------- |
| layout.scss  | 布局样式 | flex布局       |
| element.scss | 元素样式 | 按钮/列表/面板 |
| reset.scss   | 样式重置 | *              |

#### JS

- core目录: 抽象通用组件

  |    文件     |    功能    |                   详情                   |
  | :---------: | :--------: | :--------------------------------------: |
  |  core/btn   |  按钮组件  |               定义按钮样式               |
  | core/panel  |  面板组件  |               定义面板样式               |
  | core/slider | 轮播图组件 | 使用vue-awesome-swiper封装  实现轮播功能 |

- view目录: 页面布局组件

  |    文件    |   功能   |                 详情                 |
  | :--------: | :------: | :----------------------------------: |
  | views/home | 页面组件 | 只是引入业务组件, 自身不处理具体逻辑 |
  |            |          |                                      |
  |            |          |                                      |

- components: 业务组件

  |          文件          |   功能   |                    详情                    |
  | :--------------------: | :------: | :----------------------------------------: |
  | components/home-slider | 首页轮播 | 业务组件, 使用抽象的组件实现具体的业务逻辑 |
  |                        |          |                                            |
  |                        |          |                                            |

  



### webpack 优化

#### resolve优化

- 原理到
  - webpack 中每涉及到一个文件，就会经过 resolve 的过程。而 resolve 过程中其中针对一些不确定的因素，比如后缀名，node_modules 路径等，会存在探索的过程，从而使得整个 resolve 的链条很长。很多针对 webpack 的优化，都会提到利用 resolve 配置来减少文件搜索范围，明白了 resolve 的细节之后，再来看这些优化策略，便可以更好的了解其原因，做到“知其然知其所以然”
- 优化
  - 使用 resolve.alias
    我们日常开发项目中，常常会存在类似 common 这样的目录，common 目录下的文件，会被经常引用。比如 `common/index.js`。如果我们针对 common 目录建立一个 alias 的话，在所有用到 `common/index.js`的文件中，可以写` import xx from 'common/index.js'`。 由于 UnsafeCachePlugin 的存在，当 webpack 再次解析到 'common/index.js' 时，就可以直接使用缓存。重点是解析链条变短，缓存只是一部分吧
  - 设置 resolve.modules
    resolve.modules 的默认值为 ['node_modules']，所以在对 module 的 resolve 过程中，会依次查找 ./node_modules、../node_modules、../../node_modules 等，即沿着路径一层一层往上找，直到找到 node_modules。可以直接设置`resolve.modules:[path.resolve(__dirname, 'node_modules')]`
    如此会进入 ModulesInRootPlugin 而不是 ModulesInHierachicDirectoriesPlugin，避免了层层寻找 node_modules 的开销。
  - 对第三方模块设置 resolve.alias
    对第三方的 module 进行 resolve 过程中，除了上面提到的 node_modules 目录查找过程，还会涉及到对 package.json 中配置的解析等。可以直接为其设置 alias 为执行文件，来简化整个 resolve 过程，如下：`resolve.alias: {
        'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.common.js')
    }`
  - 合理设置 resolve.extensions，减少文件查找
    当我们的文件没有后缀时，AppendPlugin 会根据 resolve.extensions 中的值，依次添加后缀然后查找文件。为了减少文件查找，我们可以直接将文件后缀写上，或者设置 resolve.extensions 中的值，列表值尽量少，频率高的文件类型的后缀写在前面。
- 参考链接 :  https://juejin.im/entry/5c6cbcc7518825620469060d



### vue-2.6.0+服务端渲染

- 使用`serverPrefetch` 代替asyncData函数, 所有组件都可以使用这个函数, 不再需要我们自己配置调用的逻辑, 服务端渲染时会自动同步调用. 使用了`serverPrefetch` 之后不再需要我们配置客户端预取的逻辑了

### 踩坑

#### 服务端渲染Swiper组件不生效?
  - 服务端渲染出的HTML是没有`id=app`这个元素的, 需要我们手动加上, 如果不加上, 客户端挂载就会失败, 导致客户端代码无法正常运行, 而swiper组件就是在客户端这边运行的.