import { Input } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'

type InputEvent = ChangeEvent<HTMLInputElement>

const ConcatInput = (props: any) => {
  const { onChange, value } = props

  const [code, setCode] = useState<string>(value.code)
  const [mobilePhone, setMobilePhone] = useState<string>(value.mobilePhone)

  const valueChange = (event: InputEvent, type: string) => {
    const { value } = event.target
    type === 'code' && setCode(value)
    type === 'mobilePhone' && setMobilePhone(value)
  }

  useEffect(() => {
    const params = { code, mobilePhone }
    onChange && onChange(params)
  }, [code, mobilePhone])

  return (
    <Input.Group compact>
      <Input
        value={code}
        style={{ width: '20%' }}
        defaultValue="+86"
        onChange={(event: InputEvent) => valueChange(event, 'code')}
      />
      <Input
        value={mobilePhone}
        style={{ width: '80%' }}
        onChange={(event: InputEvent) => valueChange(event, 'mobilePhone')}
      />
    </Input.Group>
  )
}

export default ConcatInput
