/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-03-10 15:20:21
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-09 13:28:28
 * @FilePath: \jack-aps\src\pages\practice\administration\components\scheduling\forms\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Form, Select } from 'antd'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'

const { Option } = Select

const HeaderForm = (props: { FormData: any }) => {
  const { FormData } = props
  const { factoryList } = practice
  const [list, setList] = useState<any>([])
  const [theDefault, setTheDefault] = useState<any>() //默认展示
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data
    if (res.code === 200) {
      //  默认展示第2条数据
      setTheDefault(arr[0])
      FormData && FormData(arr[0].id)
      arr.map((item: { name: any; deptName: any }) => {
        item.name = item.deptName
      })
      setList(arr)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  const { validateFields } = form

  const handleSubmit = debounce(async () => {
    const values = await validateFields()
    FormData && FormData(values.keyword)
  }, 500)

  const getValueFromEvent = (event: any, type = 'text') => {
    setTimeout(async () => {
      await handleSubmit()
    })
    if (type === 'select') {
      return event
    }
  }

  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="keyword"
          label="选择工厂"
          getValueFromEvent={(event: InputEvent) =>
            getValueFromEvent(event, 'select')
          }
        >
          {theDefault ? (
            <Select
              allowClear
              defaultValue={theDefault.deptName}
              style={{ width: 300 }}
              // onChange={handleChange}
            >
              {list.map(
                (item: {
                  id: React.Key | null | undefined
                  name:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined
                }) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                )
              )}
            </Select>
          ) : null}
        </Form.Item>
      </Form>
    </div>
  )
}

export default HeaderForm
