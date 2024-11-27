import '@/utils/reWriteHistory';
import { parseString } from './utils';

class EventListener {
  events: {
    [key: string]: any[];
  };
  previousURL: string;
  constructor() {
    this.events = {};
    this.previousURL = document.location.href;
  }
  listener() {
    window.addEventListener('error', (error) => {
      console.log('error', error);
    });
    document.addEventListener(
      'error',
      (error) => {
        console.log('document error', error);
      },
      true
    );
    document.addEventListener(
      'click',
      (event: any) => {
        // 在捕获阶段监听
        if (event.target?.dataset?.track) {
          const trackData = parseString(event.target.dataset.track);
          console.log('track', event.target.dataset.track, trackData);
          this.emit('click', trackData);
        }
      },
      true
    );
    window.addEventListener('historychange', (event: any) => {
      const { previousURL, currentURL } = event.detail;
      console.log(
        'History changed from: ' + previousURL + ' to: ' + currentURL
      );
    });
    window.addEventListener('hashchange', () => {
      const currentURL = document.location.href;
      console.log(
        'Hash changed from: ' + this.previousURL + ' to: ' + currentURL
      );
      this.previousURL = currentURL;
    });
  }
  on(type: string, callback: Function) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(callback);
  }
  emit(type: string, ...args: any[]) {
    if (this.events[type]) {
      this.events[type].forEach((callback) => {
        callback(...args);
      });
    }
  }
}
class Pusher {
  click(msg: string) {
    console.log('click', msg);
  }
  scriptError(msg: string) {
    console.log('scriptError', msg);
  }
  domError(msg: string) {
    console.log('domError', msg);
  }
  hashChange(msg: string) {
    console.log('hashChange', msg);
  }
  historyChange(msg: string) {
    console.log('historyChange', msg);
  }
}

class Track {
  eventListener: EventListener;
  pusher: Pusher;
  constructor() {
    this.eventListener = new EventListener();
    this.pusher = new Pusher();
    this.eventListener.on('click', this.pusher.click.bind(this.pusher));
    this.eventListener.on(
      'scriptError',
      this.pusher.scriptError.bind(this.pusher)
    );
    this.eventListener.on('domError', this.pusher.domError.bind(this.pusher));
    this.eventListener.on(
      'hashChange',
      this.pusher.hashChange.bind(this.pusher)
    );
    this.eventListener.on(
      'historyChange',
      this.pusher.historyChange.bind(this.pusher)
    );
  }
  init() {
    this.eventListener.listener();
  }
}

const track = new Track();
track.init();
