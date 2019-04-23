/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * dep是一个可观察（依赖收集） 他可以有重复的指令去订阅他
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;  //  ts自定义Watcher类型  订阅数组

  constructor () {
    this.id = uid++
    this.subs = []
  }
//  添加监听
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
//  移除监听 remove函数查找当前元素在数组中的位置，然后splice删除
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      //  dep.target 代表当前对象的watcher
        //  当前操作会判断订阅数组中是否存在该订阅，避免重复订阅
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    // 首先利用数组slice返回新数组的特性 深拷贝一下
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      //  如果不运行async，则不会在计划程序中对sub进行排序
      // we need to sort them now to make sure they fire in correct
      //  我们现在需要对它们进行排序，以确保它们正确触发
      // order
      //  config.async开关为true
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      //  循环对每一个订阅通知更新
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
//  评估当前目标观察者
// This is globally unique because only one watcher
//  这是全局唯一的  因为在一段时间内只能去评估一个观察者
// can be evaluated at a time.
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
