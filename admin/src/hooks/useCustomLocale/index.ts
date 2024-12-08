import { useContext } from 'react';
import { ConfigProvider } from 'antd';

const useCustomLocale = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  return locale?.custom || {};
};

export default useCustomLocale;
