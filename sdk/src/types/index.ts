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
