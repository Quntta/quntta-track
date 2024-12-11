import React, { useState } from 'react'
import { Form, Input, Flex, Space, Button } from 'antd'
import { useLocation, useNavigate } from "react-router-dom"
import FullBtn from '@/components/fullBtn'
import DefaultBtn from '@/components/defaultBtn'
import LoginImg from '@/assets/login-p.png'
import { useCustomLocale } from '@/hooks'
import LanguageSwitch from '@/components/languageSwith'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setUserInfo } from '@/store/userSlice'
import './index.less'

type FieldType = {
  userName?: string
  passWord?: string
}


const Login: React.FC = () => {
  const [active, setActive] = useState('signIn')
  const [form] = Form.useForm()
  const custom = useCustomLocale()
  const navigate = useNavigate()
  const userName = useSelector((state: RootState) => state.user.userInfo.userName)
  const dispatch = useDispatch()
  const onSubmit = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue()
      console.log('values', values)
      dispatch(setUserInfo(values || ''))
      navigate('/')
    }).catch((err) => {
      console.log('error', err)
    })
  }
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
          form={form}
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={null}
            name="userName"
            rules={[{ required: true, message: '请输入用户名!' }]}
            initialValue={userName}
          >
            <Input placeholder='请输入用户名' allowClear />
          </Form.Item>

          <Form.Item<FieldType>
            label={null}
            name="passWord"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder='请输入密码' allowClear />
          </Form.Item>
          <Form.Item label={null}>
            <FullBtn onClick={() => onSubmit()} disabled={active === 'register'}>{active === 'signIn' ? custom['app.login'] : custom['app.register']}</FullBtn>
          </Form.Item>
        </Form>
      </Flex>

    </Flex>
  </div >
}

export default Login