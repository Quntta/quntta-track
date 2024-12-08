import zhCN from 'antd/locale/zh_CN';

const customLocale = {
  ...zhCN,
  // 在这里添加或覆盖默认的国际化配置
  custom: {
    'app.login': '登录',
    'app.register': '注册',
    'app.register.here': '立即注册',
    'app.zh': '中文',
    'app.us': '英文'
  }
  // 其他组件的自定义配置
};

export default customLocale;
