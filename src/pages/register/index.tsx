import { Button, Form, Input } from 'antd'
import classNames from 'classnames'
import * as _ from 'lodash'
import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@/components'
import { registerApis } from '@/recoil/apis'

import VerifyInput from '../login/verifyInput'
import styles from './index.module.less'

type InputEvent = ChangeEvent<HTMLInputElement>
type CommonObj = {
  [key: string]: any
}

const hasEmpty: any = (obj: CommonObj) => {
  if (!obj) return true
  const keys = Reflect.ownKeys(obj)

  return keys.some((item: any) => {
    if (typeof obj[item] === 'object') {
      return hasEmpty(obj[item])
    } else {
      return !obj[item]
    }
  })
}

const UserIcon = () => <Icon type="jack-yonghuming" className={styles.icon} />
const PwdIcon = () => <Icon type="jack-mima" className={styles.icon} />
const PhoneIcon = () => <Icon type="jack-shouji1" className={styles.icon} />
const CodeIcon = () => <Icon type="jack-yanzhengma" className={styles.icon} />

export const phoneReg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
export const pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,}$/

const initErrors = {
  userName: false,
  pwd: false,
  pwd2: false,
  mobilePhone: false,
  code: false
}

const initHelps = {
  userName: '',
  pwd: '',
  pwd2: '',
  mobilePhone: '',
  code: ''
}

const Register = () => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const navigate = useNavigate()
  const { register, checkUser } = registerApis

  // const { getFieldValue, validateFields, setFieldsValue } = form
  const [disabled, setDisabled] = useState<boolean>(true)
  const [mobilePhone, setMobilePhone] = useState<string>()

  const [errors, setErrors] = useState(initErrors)
  const [helps, setHelps] = useState(initHelps)

  const getValueFromEvent = (event: InputEvent, type: string) => {
    // 可根据需要 通过 setFieldsValue 设置联动效果
    if (type === 'verifyCode') {
      return event
    }
    return event.target.value
  }

  const handleSubmit = async () => {
    try {
      const values = await validateFields()

      delete values.pwd2

      const encode = encodeURI(values.pwd)
      // 对编码的字符串转化base64
      const base64 = btoa(encode)
      const params = {
        code: values.code,
        mobilePhone: values.mobilePhone,
        password: base64,
        userName: values.userName
      }
      const registerRes = await register(params)
      if (registerRes && registerRes.success) {
        navigate('/user/login')
        localStorage.setItem('currentUser', JSON.stringify({}))
      }
    } catch (err) {
      console.log(err)
      // const { errorFields } = err
      // console.log(errorFields, '---')
    }
  }

  const onValuesChange = async (changedValues: any, allValues: CommonObj) => {
    const key = Object.keys(changedValues)[0]
    const value = changedValues[key]
    const nHelps: any = _.cloneDeep(helps)
    const nErrors: any = _.cloneDeep(errors)
    switch (key) {
      case 'userName':
        const userReg = /^[0-9a-zA-Z\u4e00-\u9fa5]{6,20}$/g
        let flag
        if (value) {
          flag = await checkUser(value, 'userName')
        }
        if (!value) {
          nHelps[key] = '请输入用户名~'
          nErrors[key] = true
        } else {
          const regFlag = userReg.test(value)

          nHelps[key] = !regFlag
            ? '请输入6-20位中文、英文或数字~'
            : !flag && '用户名已注册~'
          nErrors[key] = !regFlag || !flag
        }

        setErrors(nErrors)
        setHelps(nHelps)
        break
      case 'pwd':
        if (!value) {
          nHelps[key] = '请输入密码~'
          nErrors[key] = true
        } else {
          const regFlag = pwdReg.test(value)

          nHelps[key] = !regFlag && '密码(字母、符号或数字中至少2项且超过6位)~'
          nErrors[key] = !regFlag
        }

        setErrors(nErrors)
        setHelps(nHelps)
        break
      case 'pwd2':
        if (!value) {
          nHelps[key] = '请确认密码~'
          nErrors[key] = true
        } else {
          nHelps[key] = value !== allValues.pwd && '两次密码输入不一致~'
          nErrors[key] = value !== allValues.pwd
        }
        setErrors(nErrors)
        setHelps(nHelps)
        break
      case 'mobilePhone':
        const { mobilePhone } = allValues

        let phoneFlag
        if (mobilePhone) {
          phoneFlag = await checkUser(mobilePhone, 'mobilePhone')
        }

        const pFlag = phoneReg.test(mobilePhone)
        if (!mobilePhone || mobilePhone.length !== 11 || !pFlag) {
          nHelps[key] = '请输入正确的手机号~'
          nErrors[key] = true
        } else {
          nHelps[key] = !phoneFlag && '手机号已注册~'
          nErrors[key] = !phoneFlag
        }
        setErrors(nErrors)
        setHelps(nHelps)
        break
    }

    const errorKeys = Reflect.ownKeys(nErrors)
    const hasError = errorKeys.some((item) => nErrors[item])

    const flag = hasEmpty(allValues) || hasError
    setMobilePhone(allValues.mobilePhone)
    setDisabled(flag)
  }

  const toLogin = () => {
    navigate('/user/login')
  }

  return (
    <div className={styles.content}>
      <div className={styles.title}>用户注册</div>
      <Form
        form={form}
        scrollToFirstError={true}
        className={styles.formContainer}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          name="userName"
          label=""
          rules={[{ required: true, message: '请输入用户名~' }]}
          getValueFromEvent={getValueFromEvent}
          validateStatus={errors.userName ? 'error' : 'success'}
          help={helps.userName}
        >
          <Input placeholder="用户名" prefix={<UserIcon />}></Input>
        </Form.Item>
        <Form.Item
          name="pwd"
          label=""
          rules={[{ required: true, message: '请输入密码' }]}
          validateStatus={errors.pwd ? 'error' : 'success'}
          help={helps.pwd}
          getValueFromEvent={getValueFromEvent}
        >
          <Input
            placeholder="密码(字母、符号或数字中至少2项且超过6位)"
            type="password"
            prefix={<PwdIcon />}
          ></Input>
        </Form.Item>
        <Form.Item
          name="pwd2"
          label=""
          rules={[{ required: false }]}
          validateStatus={errors.pwd2 ? 'error' : 'success'}
          help={helps.pwd2}
          getValueFromEvent={getValueFromEvent}
        >
          <Input
            prefix={<PwdIcon />}
            placeholder="确认密码"
            type="password"
          ></Input>
        </Form.Item>
        <Form.Item
          name="mobilePhone"
          label=""
          trigger={'onChange'}
          rules={[{ required: true, message: '请输入正确的手机号~' }]}
          validateStatus={errors.mobilePhone ? 'error' : 'success'}
          help={helps.mobilePhone}
          getValueFromEvent={getValueFromEvent}
        >
          <Input placeholder="手机号" prefix={<PhoneIcon />}></Input>
          {/* <ConcatInput prefix={<PhoneIcon />} /> */}
        </Form.Item>
        <Form.Item
          name="code"
          label=""
          trigger={'onChange'}
          getValueFromEvent={(event) => getValueFromEvent(event, 'verifyCode')}
        >
          <VerifyInput
            prefix={<CodeIcon />}
            code={'register'}
            tel={mobilePhone}
            checkCallback={checkUser}
            placeholder={'验证码'}
          />
        </Form.Item>
        {/* 滑动验证 */}
        <div id="your-dom-id" className="nc-container"></div>
        <Button
          className={classNames(styles.agreeBtn, !disabled && styles.blueBtn)}
          // disabled={disabled}
          type={'primary'}
          htmlType={'submit'}
          onClick={handleSubmit}
        >
          注册
        </Button>
      </Form>
      <div className={styles.fastLogin}>
        <span onClick={toLogin}>使用已有账户登录</span>
      </div>
    </div>
  )
}

export default Register
