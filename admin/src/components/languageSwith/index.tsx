import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space, Flex, Button } from 'antd'
import { useCustomLocale } from '@/locale/useLocale'
// import { CustomLocale } from '@/types'


const LanguageSwitch: React.FC = () => {
  const { customLocale, setCustomLocale, cacheLocale } = useCustomLocale()
  const { custom } = customLocale
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type='link' onClick={() => setCustomLocale('zh')}>
          {custom['app.zh']}
        </Button>
      )
    },
    {
      key: '2',
      label: (
        <Button type='link' onClick={() => setCustomLocale('us')}>
          {custom['app.us']}
        </Button>
      )
    }
  ]
  return <Dropdown menu={{ items }} placement="bottom">
    <Button type='link'>
      <Flex align="center">
        <Space>
          {cacheLocale === 'zh' ? custom['app.zh'] : custom['app.us']}
          <DownOutlined />
        </Space>
      </Flex>
    </Button>
  </Dropdown>
}

export default LanguageSwitch