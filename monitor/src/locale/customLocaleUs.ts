import enUS from 'antd/es/locale/en_US';

const customLocale = {
  ...enUS,
  // 在这里添加或覆盖默认的国际化配置
  custom: {
    'app.login': 'login in',
    'app.register': 'register',
    'app.register.here': 'Register here!',
    'app.zh': 'Chinese',
    'app.us': 'English',
    'app.register.now': 'Register here'
  }
  // 其他组件的自定义配置
};

export default customLocale;
