import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
  value?: boolean
  onChange?: (checked: boolean) => void
}

const FormSwitch = (props: Props) => {
  const { onChange, value = false } = props

  const [checked, setChecked] = useState<boolean>(value)

  const valueChange = (date: boolean) => {
    // console.log(date)

    setChecked(date)
  }

  useEffect(() => {
    onChange && onChange(checked)
  }, [checked])

  return <Switch checked={checked} onChange={valueChange}></Switch>
}

export default FormSwitch
