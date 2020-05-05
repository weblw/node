Vue源码流程

- 入口文件 entry-runtime-with-compiler——附加编译器
- runtime/index——挂载$mount方法——执行mountComponent
  - 定义updateComponent方法
  - 执行render渲染vnode
  - diff并挂载vnode——path.js  通过snabbdom的init方法创建patch函数
  - 创建Watcher——组件级别的watcher，每次实例化Vue就创建一个watcher
- core/index——导出instance/index中的Vue构造函数
  - instance/index ——initMixin 初始化
  - instance/init ——初始化，挂载$options
  - 初始化状态，执行$mount方法，挂载vnode
  - instance/state ——初始化状态
    - 初始化data、methods，代理到Vue实例上



数据双向绑定

- index——实现数据响应化，get添加依赖，set通知更新
- dep——创建依赖列表，添加依赖，通知更新
- watcher——new实例时，触发getter，将自己添加到依赖列表，
  - 更新时执行回调，重新渲染组件



计算属性

- 创建watcher—— lazy属性
- 在Watcher创建中——根据lazy给this.dirtyf赋值
- Watcher原型挂载get方法——读取值时将当前watcher添加到Dep中的targetStack
  - pushTarget——给Dep.target赋值当前watcher
  - popTarget——恢复Dep.target初始值
- watcher update方法
  - 如果lazy为true，给dirty赋值true，如果lazy为false，通过get方法获取计算属性值

- watcher evaluate方法
  - 重新获取计算属性，将dirty赋值为false
- 在state中使用watcher响应化计算属性
  - watcher——如果dirty属性为true，执行evaluate方法，重新计算
  - 如果Dep.target存在，调用watcher.depend方法
  - 返回watcher.value



数据响应化

```javascript
// 响应化
function defineReactive(obj, key, val) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enmurable: true,
    configurable: true,
    get() {
      // 收集依赖
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set(newVal) {
      // 通知更新
      val = newVal
      dep.nofity()
    }
  })
}
// 遍历递归响应化数据
function observe(data) {
  const keys = Object.keys(data)
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i]
    let val = data[key]
    if (typeof val === 'object') {
      observe(val)
    }
    defineReactive(data, key, val)
  }
}
// 收集依赖
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 取消依赖
  removeSub(sub) {
    let index = this.sunbs.indexOf(sub)
    if (index > -1) {
      this.subs = this.subs.splice(index, 1)
    }
  }
  // 通知更新
  nofity() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 观察者
class Watcher {
  constructor(cb) {
    this.cb = cb
    this.get()
  }
  // 触发依赖收集
  get() {
    Dep.target = this
    this.cb()
    Dep.target = null
  }
  // 回调更新
  update() {
    this.get()
  }
}

let test = {
  user: {
    name: '张三',
    age: 18
  }
}
observe(test)
function callback() {
  console.log(test.user.name, test.user.age)
}
let watch = new Watcher(callback)
test.user.name = '李四'
```

事件监听

```javascript
class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, fn) {
    let fnList = this.events[eventName] || (this.events[eventName] = [])
    fnList.push(fn)
    this.events[eventName] = fnList
  }
  emit(eventName) {
    const keys = Object.keys(this.events)
    keys.forEach(key => {
      if (key === eventName) {
        this.events[key].forEach(fn => {
          fn()
        })
      }
    })
  }
  off(eventName, cb) {
    if (!eventName) {
      this.events = {}
    } else if (!cb) {
      this.events[eventName] = []
    } else {
      let fnList = this.events[eventName]
      fnList && fnList.forEach((fn, index) => {
        if (fn === cb) {
          fnList = fnList.splice(index, 1)
        }
      })
    }
  }
  once(eventName, fn) {
    let cb = () => {
      fn()
      this.off(eventName, cb)
    }
    this.on(eventName, cb)
  }
}
let test = new EventEmitter()
test.on('hello', () => {
  console.log('hello')
})
test.on('hello', () => {
  console.log('world')
})
test.emit('hello')
test.off('hello', () => {
  console.log('hello')
})
test.emit('hello')
test.once('nihao', () => {
  console.log('nihao')
})
test.emit('nihao')
test.emit('nihao')
```

