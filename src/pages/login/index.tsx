/*
 * @Author: zjr
 * @Date: 2022-05-11 10:02:54
 * @LastEditTime: 2022-07-12 16:53:51
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Form, Input, message, Tabs } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '@/components/Icon'
import { loginApis } from '@/recoil/apis'
import { clearLocalStorage } from '@/utils/tool'

import aps_left from '../../imgs/aps_left.png'
import aps_logo from '../../imgs/aps_logo.png'
import styles from './index.module.less'

const UserIcon = () => <Icon type="jack-yonghuming" className={styles.icon} />
const PwdIcon = () => <Icon type="jack-yanzhengma" className={styles.icon} />

const LoginContent = () => {
  const navigate = useNavigate()
  const [loadings, setLoadings] = useState(false)
  const { login } = loginApis
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form

  const submit = async () => {
    clearLocalStorage()
    try {
      setLoadings(true)
      const values = await validateFields()
      const res = await login(values)
      const homePage = {
        upper: [
          { name: '生产单动态', type: true },
          { name: '生产任务动态', type: true }
        ],
        lower: [
          { name: '生产单剩余工期查询', type: false },
          { name: '生产延期查询', type: true },
          { name: '生产任务动态', type: true }
        ]
      }
      //设置配置
      localStorage.setItem('homePage', JSON.stringify(homePage))
      if (res && res.success) location.replace('/home')
      setLoadings(false)
    } catch (err) {
      setLoadings(false)
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.imgContainerLeft}>
          <img src={aps_left} alt="logo" />
        </div>
        <div className={styles.section}>
          <div className={styles.imgContainer}>
            <img src={aps_logo} alt="logo" />
          </div>
          <Form
            form={form}
            scrollToFirstError={true}
            className={styles.form}
            size="large"
          >
            <Form.Item
              name="loginAccount"
              label=""
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserIcon />}
                placeholder="请输入用户名"
                onPressEnter={submit}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label=""
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                }
              ]}
            >
              <Input.Password
                prefix={<PwdIcon />}
                placeholder="请输入密码"
                onPressEnter={submit}
              />
            </Form.Item>
            <Form.Item label="">
              {/* <Button type={'primary'} onClick={submit} block loading={loadings}> */}
              <Button type={'primary'} onClick={submit} block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginContent
