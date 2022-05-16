/*
 * @Author: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @Date: 2022-03-10 15:20:21
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 * @LastEditTime: 2022-05-16 15:03:19
 * @FilePath: \jack-aps\src\pages\practice\production\components\productionList\popup\outgoing\Popup\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DatePicker, Form, Input, Modal, Radio } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { productionSingleApis } from '@/recoil/apis'
const Popup = (props: any) => {
  const {
    isModalVisible,
    setIsModalVisible,
    externalProduceOrderId,
    outgoing,
    editHandle,
    setEdited
  } = props
  const { outboundSave } = productionSingleApis
  const [value, setValue] = useState<any>(1)
  const [time, setTime] = useState<any>()
  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form] = Form.useForm()
  useEffect(() => {
    if (outgoing !== undefined) {
      outgoing.outProductFlag =
        outgoing.outProductFlag === null ? value : outgoing.outProductFlag

      outgoing.allPresentTime =
        outgoing.allPresentTime !== null
          ? moment(outgoing.allPresentTime)
          : null
      setTime(outgoing.allPresentTime)
      form.setFieldsValue(outgoing)
    }
  }, [outgoing])

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async (values: any) => {
    values.externalProduceOrderId = externalProduceOrderId
    values.allPresentTime = time

    await outboundSave(values)
    editHandle && editHandle()
    setIsModalVisible(false)
    setEdited(true)
  }
  const onChangeTime = (e) => {
    setTime(moment(e).valueOf())
  }
  return (
    <div>
      <Modal
        title="整单外发"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="外发物料" name="outProductFlag">
            <Radio.Group onChange={onChange}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="最早物料齐套时间"
            name="allPresentTime"
            rules={[
              {
                required: value === 1 ? true : false,
                message: '请选择最早物料齐套时间!'
              }
            ]}
          >
            <DatePicker onChange={onChangeTime} />
          </Form.Item>

          <Form.Item label="外发用时" name="outTime">
            <Input placeholder="请输入外发用时" suffix="天" />
          </Form.Item>

          <Form.Item label="回厂加工用时" name="inTime">
            <Input placeholder="请输入回厂加工用时" suffix="天" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Popup
