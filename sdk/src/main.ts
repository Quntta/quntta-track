import '@/utils/reWriteHistory';
import { parseString, getHash, getHistory, encrypt } from './utils';
import {
  urlChangeType,
  trackOptionsType,
  watchOptionsType,
  serverOptionsType,
  scriptErrorType,
  domErrorType,
  clickType,
  requestType
} from './types';
import fingerPrint from 'get-browser-fingerprint';
// const secretKey = 'your-secret-key';
// const data = '123';
// const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
// console.log('encryptedData', encryptedData);
// const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
// console.log('decryptedData', decryptedData);
class EventListener {
  events: {
    [key: string]: any[];
  };
  previousURL: string;
  pageViewTime: number;
  pageEndTime: number;
  pageViewDuration: number;
  constructor() {
    this.events = {};
    this.previousURL = document.location.href;
    this.pageViewTime = Date.now();
    this.pageEndTime = 0;
    this.pageViewDuration = 0;
  }
  listener(options: watchOptionsType) {
    if (options.errorWatch) {
      this.scriptErrorListener();
    }
    if (options.domErrorWatch) {
      this.domErrorListener();
    }
    if (options.clickWatch) {
      this.clickListener();
    }
    if (options.urlWatch && options.urlType === 'hash') {
      this.hashChangeListener();
    }
    if (options.urlWatch && options.urlType === 'history') {
      this.historyChangeListener();
    }
  }
  scriptErrorListener() {
    window.addEventListener('error', (error) => {
      console.log('error', error);
      quntta_track.validTrack() &&
        this.emit('scriptError', {
          message: error.error.message,
          stack: error.error.stack,
          lineno: error.lineno,
          colno: error.colno,
          filename: error.filename,
          href: window.location.href,
          eventType: 'scriptError'
        });
    });
  }
  domErrorListener() {
    document.addEventListener(
      'error',
      (error: any) => {
        if (error.target?.src.indexOf('track/track.gif') === -1) {
          quntta_track.validTrack() &&
            this.emit('domError', {
              eventType: 'domError',
              href: error.target?.baseURI,
              src: error.target?.src
            });
        }
      },
      true
    );
  }
  clickListener() {
    document.addEventListener(
      'click',
      (event: any) => {
        // 在捕获阶段监听
        if (event.target?.dataset?.track) {
          console.log('event.target', event);
          const trackData = parseString(event.target.dataset.track);
          this.emit('click', {
            eventType: 'click',
            eleId: event.target.id,
            eleClass: event.target.className,
            href: window.location.href,
            ...trackData
          });
        }
      },
      true // 捕获阶段
    );
  }
  hashChangeListener() {
    window.addEventListener('hashchange', () => {
      this.pageEndTime = Date.now();
      this.pageViewDuration = this.pageEndTime - this.pageViewTime;
      this.pageViewTime = this.pageEndTime;
      const currentURL = document.location.href;
      const from = getHash(this.previousURL);
      const to = getHash(currentURL);
      quntta_track.validTrack() &&
        this.emit('hashChange', {
          eventType: 'hashChange',
          previousURL: this.previousURL,
          currentURL,
          from,
          to,
          pageViewDuration: this.pageViewDuration
        });
      this.previousURL = currentURL;
    });
  }
  historyChangeListener() {
    window.addEventListener('historychange', (event: any) => {
      this.pageEndTime = Date.now();
      this.pageViewDuration = this.pageEndTime - this.pageViewTime;
      this.pageViewTime = this.pageEndTime;
      const { previousURL, currentURL } = event.detail;
      const from = getHistory(previousURL);
      const to = getHistory(currentURL);
      quntta_track.validTrack() &&
        this.emit('historyChange', {
          eventType: 'historyChange',
          previousURL,
          currentURL,
          from,
          to,
          pageViewDuration: this.pageViewDuration
        });
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
  serverUrl: string;
  appId: string;
  sender: Sender;
  constructor(sender: Sender) {
    this.serverUrl = '';
    this.appId = '';
    this.sender = sender;
  }
  init(options: serverOptionsType) {
    this.serverUrl = options.serverUrl;
    this.appId = options.appId;
  }
  click(data: clickType) {
    console.log('click', data);
    this.sender.send(data);
  }
  scriptError(data: scriptErrorType) {
    console.log('scriptError', JSON.stringify(data));
    this.sender.send(data);
  }
  domError(data: domErrorType) {
    console.log('domError', data);
    this.sender.send(data);
  }
  hashChange(data: urlChangeType) {
    console.log('hashChange', data);
    this.sender.send(data);
  }
  historyChange(data: urlChangeType) {
    console.log('historyChange', data);
    this.sender.send(data);
  }
  customTrack(eventId: string, options: any) {
    console.log('customTrack', eventId, options);
  }
}
class Sender {
  serverUrl: string;
  appId: string;
  requestType: requestType;
  constructor() {
    this.serverUrl = '';
    this.appId = '';
    this.requestType = 'img';
  }
  init(options: serverOptionsType) {
    this.serverUrl = options.serverUrl;
    this.appId = options.appId;
    this.requestType = options.requestType || 'img';
  }
  async send(data: any) {
    console.log('send');
    if (!quntta_track.fingerPrint) {
      console.log('wait finger');
      await quntta_track.waitFingerPrintFinish();
    }
    if (this.requestType === 'img') {
      this.sendByImg(data);
    } else {
      this.sendByBeacon(data);
    }
  }
  sendByImg(data: any) {
    const req = {
      fingerPrint: quntta_track.fingerPrint,
      userId: quntta_track.userId,
      eventData: data
    };
    console.log('req', JSON.stringify(req));
    const img = document.createElement('img');
    const str = encrypt(JSON.stringify(req), this.appId);
    img.src = `${this.serverUrl}/track/track.gif?data=${str}`;
    img.style.display = 'none';
    document.body.appendChild(img);
  }
  sendByBeacon(data: any) {
    const req = {
      fingerPrint: quntta_track.fingerPrint,
      userId: quntta_track.userId,
      eventData: data
    };
    console.log('req', JSON.stringify(req));
    const str = encrypt(JSON.stringify(req), this.appId);
    const url = `${this.serverUrl}/track/track.gif?data=${str}`;
    navigator.sendBeacon(url);
  }
}
class Track {
  eventListener: EventListener;
  pusher: Pusher;
  sender: Sender;
  hasInit: boolean;
  userId: string;
  fingerPrint: number | string;
  rate: number;
  autoTrack: boolean;
  constructor() {
    this.eventListener = new EventListener();
    this.sender = new Sender();
    this.pusher = new Pusher(this.sender);
    this.hasInit = false;
    this.userId = '';
    this.fingerPrint = '';
    this.rate = 1;
    this.autoTrack = true;
    this.eventListener.on('click', this.pusher.click.bind(this.pusher));
    this.eventListener.on('scriptError', this.pusher.scriptError.bind(this.pusher));
    this.eventListener.on('domError', this.pusher.domError.bind(this.pusher));
    this.eventListener.on('hashChange', this.pusher.hashChange.bind(this.pusher));
    this.eventListener.on('historyChange', this.pusher.historyChange.bind(this.pusher));
    this.getFingerPrint();
  }
  init({
    serverUrl = '',
    appId = '',
    urlWatch = true,
    urlType = 'hash',
    performanceWatch = false,
    errorWatch = true,
    domErrorWatch = true,
    clickWatch = true,
    requestType = 'img',
    rate = 1,
    autoTrack = true
  }: trackOptionsType) {
    if (!serverUrl || !appId) {
      throw new Error('serverUrl和appId不能为空');
      return;
    }
    this.rate = rate;
    this.autoTrack = autoTrack;
    const listenerOptions = {
      urlWatch,
      urlType,
      performanceWatch,
      errorWatch,
      domErrorWatch,
      clickWatch
    };
    this.eventListener.listener(listenerOptions);
    this.pusher.init({ serverUrl, appId });
    this.sender.init({ serverUrl, appId, requestType });
    this.hasInit = true;
  }
  validTrack() {
    return this.autoTrack && Math.random() <= this.rate;
  }
  async getFingerPrint() {
    try {
      const fingerprint = await fingerPrint();
      this.fingerPrint = fingerprint;
      console.log('this.fingerprint', fingerprint);
    } catch (e) {
      console.log('create fingerPrint error');
    }
  }
  async waitFingerPrintFinish() {
    let timer: any;
    return new Promise((reslove, reject) => {
      timer = setInterval(() => {
        if (this.fingerPrint) {
          clearInterval(timer);
          reslove(true);
        }
      }, 10);
    });
  }
  track(eventId: string, options: any) {
    if (!this.hasInit) {
      throw new Error('请先执行track.init({...})初始化');
      return;
    }
    this.pusher.customTrack(eventId, { ...options });
  }
  setProfile(userId: string) {
    this.userId = userId;
  }
}

const quntta_track = new Track();
export default quntta_track;

// if (typeof window !== 'undefined') {
//   (window as any).qunttaTrack = qunttaTrack;
// }
// track.init({
//   serverUrl: 'http://localhost:3000',
//   appId: '123'
// });
