import CryptoJS from 'crypto-js';
// 将字符串按照&符号分割并返回对象
export const parseString = (str: string) => {
  if (!str) return {};
  return str.split('&').reduce((acc: any, cur: string) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {});
};

// 获取hash路由
export const getHash = (url: string) => {
  if (url) {
    return new URL(url).hash.slice(1);
  }
  return window.location.hash.slice(1);
};

// 获取history路由
export const getHistory = (url: string) => {
  let location = url ? new URL(url) : window.location;
  return location.pathname;
};

// 加密字符串
export const encrypt = (data: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// 获取公共参数、userAgent、时间戳、屏幕尺寸、是移动端还是PC端、如果是移动端获取设备信息、如果是PC端获取操作系统信息
export const getCommonParams = () => {
  const commonParams = {
    userAgent: window.navigator.userAgent,
    timestamp: Date.now(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
  };
  return commonParams;
};
