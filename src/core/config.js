/* @flow */

import {
  no,
  noop,
  identity
} from 'shared/util'

import { LIFECYCLE_HOOKS } from 'shared/constants'
//  todo  需要返回再看
//  定义config属性值的类型
export type Config = {
  // user
  optionMergeStrategies: { [key: string]: Function };
  silent: boolean;
  //  是否是生产模式
  productionTip: boolean;
  //
  performance: boolean;
  //  是否是开发模式
  devtools: boolean;
  errorHandler: ?(err: Error, vm: Component, info: string) => void;
  warnHandler: ?(msg: string, vm: Component, trace: string) => void;
  ignoredElements: Array<string | RegExp>;
  keyCodes: { [key: string]: number | Array<number> };

  // platform  平台
  isReservedTag: (x?: string) => boolean;
  isReservedAttr: (x?: string) => boolean;
  parsePlatformTagName: (x: string) => string;
  isUnknownElement: (x?: string) => boolean;
  getTagNamespace: (x?: string) => string | void;
  mustUseProp: (tag: string, type: ?string, name: string) => boolean;

  // private 私有
  async: boolean;

  // legacy 遗留    生命周期数组
  _lifecycleHooks: Array<string>;
};

export default ({
  /**
   * Option merge strategies (used in core/util/options)
   * 对象合并策略  core/util/options
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   * 默认不禁止显示警告
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   * 生产模式提示消息开关
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   * 是否是开发模式
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   * 默认不记录性能
   */
  performance: false,

  /**
   * Error handler for watcher errors
   * 程序错误处理程序
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   * 程序警告处理程序
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   * 忽略某些自定义元素
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   * 用户自定义密匙别名
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   * 检查是否保留了标记，以便它不能注册为组件。这取决于平台，可能会被覆盖。
   * 默认设为false
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   * 检查属性是否保留，以至于不能用于组件的prop。这取决于平台，可能会被覆盖。
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent. 依赖平台
   * 是否检查一个标记为未知元素
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   * 从元素中获取命名
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   * 从特定平台解析特定标签
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   * 检查一个属性必须用于property
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * 异步的完成更新，用于vue 测试实用程序
   * This will significantly reduce performance if set to false.
   * 如果设置为false将显著的降低性能
   */
  async: true,

  /**
   * Exposed for legacy reasons
   * 生命周期配置
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
}: Config)
