import type { Locale } from 'antd/lib/locale';

export interface CustomLocale extends Locale {
  custom: { [key: string]: string };
}
