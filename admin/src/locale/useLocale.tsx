
import React, { createContext, useContext, useState, ReactNode } from 'react'
import customLocaleZh from './customLocaleZh'
import customLocaleUs from './customLocaleUs'
import { getItem, setItem } from "@/utils"
import { CustomLocale } from '@/types'
interface SetCustomProps {
  (locale: string): void
}
interface MyProviderProps {
  children: ReactNode
}

interface LocaleContextProps {
  customLocale: CustomLocale
  setCustomLocale: SetCustomProps,
  cacheLocale: string
}
const cacheItem = getItem('locale')
console.log('cacheItem', cacheItem)
const defaultLocale = cacheItem === 'zh' ? customLocaleZh : customLocaleUs
const defaultLocaleContext: LocaleContextProps = {
  customLocale: defaultLocale,
  setCustomLocale: () => { },
  cacheLocale: cacheItem || 'zh'
}

export const LocalContext = createContext<LocaleContextProps>(defaultLocaleContext)
export const MyLocalProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [cacheLocale, setCacheLocale] = useState(cacheItem || 'zh')
  const [customLocale, setLocale] = useState<CustomLocale>(cacheItem === 'zh' ? customLocaleZh : customLocaleUs)
  const setCustomLocale: SetCustomProps = (locale: string) => {
    setItem('locale', locale)
    setCacheLocale(locale)
    setLocale(locale === 'zh' ? customLocaleZh : customLocaleUs)
  }
  return (
    <LocalContext.Provider value={{ customLocale, setCustomLocale, cacheLocale }}>
      {children}
    </LocalContext.Provider>
  )
}

export const useCustomLocale = () => {
  const context = useContext(LocalContext)
  if (!context) {
    throw new Error('useCustomLocale must be used within a MyLocalProvider')
  }
  return context
}