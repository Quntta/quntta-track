import React, { useState } from 'react'
import type { FormProps } from 'antd'
import { Form, Input, Flex, Space, Button } from 'antd'
import FullBtn from '@/components/fullBtn'
import DefaultBtn from '@/components/defaultBtn'
import LoginImg from '@/assets/login-p.png'
import { useCustomLocale } from '@/hooks'
import LanguageSwitch from '@/components/languageSwith'
import './index.less'

type FieldType = {
  username?: string
  password?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {
  const [active, setActive] = useState('signIn')
  const custom = useCustomLocale()
  return <div className='wrapper'>
    <Flex className="left-wrapper">
      <div className="left-bg"></div>
      <div className="login-info">
        <div className="login-title">Sign In to <br />Quntta-track Admin</div>
        <div className="login-message">if you don't have an account <br />You can<Button type='link' onClick={() => setActive('register')}>{custom['app.register.now']}!</Button></div>
      </div>
      <div className="login-img-wrapper">
        <img className='login-img' src={LoginImg} alt="" />
      </div>
    </Flex>
    <Flex className="right-wrapper" vertical>
      <Flex justify="flex-end">
        <Space size="middle">
          <LanguageSwitch />
          <DefaultBtn onClick={() => { setActive('signIn') }} type={active === 'signIn' ? 'link' : 'default'}>{custom['app.login']}</DefaultBtn>
          <DefaultBtn onClick={() => { setActive('register') }} type={active === 'register' ? 'link' : 'default'}>{custom['app.register']}</DefaultBtn>
        </Space>
      </Flex>
      <Flex justify='center' align='center' style={{ height: '100%' }}>
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={null}
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder='请输入用户名' allowClear />
          </Form.Item>

          <Form.Item<FieldType>
            label={null}
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder='请输入密码' allowClear />
          </Form.Item>
          <Form.Item label={null}>
            <FullBtn onClick={() => { console.log('click') }} disabled={active === 'register'}>{active === 'signIn' ? custom['app.login'] : custom['app.register']}</FullBtn>
          </Form.Item>
        </Form>
      </Flex>

    </Flex>
  </div >
}

export default Login