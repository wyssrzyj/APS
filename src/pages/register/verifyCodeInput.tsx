import { Button, Input } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { registerApis } from '@/recoil/apis'

import styles from './index.module.less'

type InputEvent = ChangeEvent<HTMLInputElement>

const VerifyCodeInput = (props: any) => {
  const { onChange, value, tel, placeholder, code, ...rest } = props

  const { sendVerifyCode } = registerApis
  const verifyTime = 60

  const [lastTime, setLastTime] = useState<number>(verifyTime)
  const [sending, setSending] = useState<boolean>(false)
  const [timer, setTimer] = useState<any>(null)

  const valueChange = (event: InputEvent) => {
    onChange && onChange(event.target.value)
  }

  useEffect(() => {
    const last = localStorage.getItem(`verifyTime${code}`)
    if (last) {
      const lastFlag = Date.now() - +last < verifyTime * 1000
      if (lastFlag) {
        setLastTime(Math.ceil((Date.now() - +last) / 1000))
        setSending(true)
        timerRun()
      } else {
        // 初始化 倒计时时间
        setLastTime(verifyTime)
        localStorage.setItem(`verifyTime${code}`, '')
      }
    }
  }, [])

  const timerRun = () => {
    let last: any = localStorage.getItem(`verifyTime${code}`)

    if (!last) {
      last = Date.now().toString()
      localStorage.setItem(`verifyTime${code}`, last)
    }

    const t = setInterval(() => {
      setLastTime(() => {
        const n = verifyTime - (Date.now() - +last) / 1000
        return Math.ceil(n)
      })
    }, 1000)
    setTimer(t)
  }

  const sendCode = async () => {
    if (sending) return

    const res = await sendVerifyCode(tel)
    res && setSending(true)
    res && timerRun()
  }

  useEffect(() => {
    if (lastTime <= 0) {
      setSending(false)
      clearInterval(timer)
      setTimer(null)
      setLastTime(verifyTime)
    }
  }, [lastTime])

  return (
    <div className={styles.verifyBtnBox}>
      <Input
        onChange={valueChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      <Button
        disabled={sending}
        onClick={sendCode}
        type={'primary'}
        className={styles.verifyBtn}
      >
        {sending ? `${lastTime}s` : '发送验证码'}
      </Button>
    </div>
  )
}

export default VerifyCodeInput
