// 自定义用户事件
export interface CustomEvent {
  detail: {
    previousURL: string;
    currentURL: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// 事件监听器
export interface EventListenerType {
  events: {
    [key: string]: any[];
  };
  previousURL: string;
  listener(): void;
  on(type: string, callback: Function): void;
  emit(type: string, ...args: any[]): void;
}

// url变化
export type urlChangeType = {
  previousURL: string;
  currentURL: string;
  from: string;
  to: string;
  pageViewDuration: number;
  eventType: 'hashChange' | 'historyChange';
};

// 网络请求类型
export type requestType = 'img' | 'beacon';

// 服务设置
export type serverOptionsType = {
  serverUrl: string;
  appId: string;
  requestType?: requestType;
  rate?: number;
  autoTrack?: boolean;
};

// 监听选项
export type watchOptionsType = {
  urlWatch?: boolean;
  urlType?: 'hash' | 'history';
  performanceWatch?: boolean;
  errorWatch?: boolean;
  domErrorWatch?: boolean;
  clickWatch?: boolean;
  requestType?: requestType;
};

// track初始化参数
export type trackOptionsType = serverOptionsType & watchOptionsType;

// 报错类型
export type errorType = 'scriptError' | 'domError';

// 脚本报错参数
export type scriptErrorType = {
  message: '';
  stack: '';
  lineno: number;
  colno: number;
  filename: '';
  href: '';
  eventType: errorType;
};

// dom报错参数
export type domErrorType = {
  href: '';
  src: '';
  eventType: errorType;
};

// 点击事件参数
export type clickType = {
  eventType: 'click';
  eleId: string;
  eleClass: string;
  href: string;
  [key: string]: any;
};
