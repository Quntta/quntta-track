import { useState } from "react"
import customLocaleZh from './customLocaleZh'
import customLocaleUs from './customLocaleUs'
import { getItem, setItem } from "@/utils"
import { CustomLocale } from '@/types'
interface SetCustomProps {
  (locale: string): void
}

const useCustomLocale = () => {
  const [cacheLocale, setCacheLocale] = useState(getItem('locale') || 'zh')
  const [locale, setLocale] = useState<CustomLocale>(cacheLocale === 'zh' ? customLocaleZh : customLocaleUs)
  const setCustomLocale: SetCustomProps = (locale: string) => {
    setItem('locale', locale)
    setCacheLocale(locale)
    setLocale(locale === 'zh' ? customLocaleZh : customLocaleUs)
  }
  return [locale, setCustomLocale, cacheLocale]
}

export default useCustomLocale