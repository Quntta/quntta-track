import { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { CustomLocale } from '@/types';

const useCustomLocale = () => {
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const { custom } = locale as CustomLocale;
  return custom || {};
};

export default useCustomLocale;
