/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'

import FormNode from '@/components/FormNode'
import { efficiencyTemplateApis } from '@/recoil/apis'

import { formItemConfig as originFormItemConfig } from '../conifgs'
import EfficiencyTable from './efficiencyTable/index'
const { teamList, updateEfficiencyInfo } = efficiencyTemplateApis
const FormItem = Form.Item
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 13 }
}
const itemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 22 }
}
function AddModal(props: Record<string, any>) {
  const { isModalVisible, onAddCancel, type, modalInfo, facList } = props
  const disabled = type === 'view'
  const [form] = Form.useForm()
  const { setFieldsValue, validateFields, resetFields } = form
  const [formItemConfig, setFormItemConfig] = useState(originFormItemConfig)
  const [formValue, setFormValue] = useState(cloneDeep(modalInfo))

  useEffect(() => {
    initFormItemConfigs()
  }, [isModalVisible])

  const initFormItemConfigs = async () => {
    const nFormItemConfig = cloneDeep(formItemConfig)
    const hasFactoryId = formValue.factoryId
    await Promise.all(
      nFormItemConfig.map(async (item, index) => {
        item.disabled = disabled
        if (item.name === 'teamId') {
          item.disabled = disabled || !hasFactoryId
          if (hasFactoryId) {
            item.options = await changeTeamConfig(formValue.factoryId, true)
          }
        }
        if (index === 1) item.options = facList
        return item
      })
    )
    setFormItemConfig(nFormItemConfig)
  }
  const onValuesChange = (changedValues: Record<string, any>) => {
    const nFormValue = cloneDeep(formValue)
    const changeKey: any = Reflect.ownKeys(changedValues)[0]
    const isFactoryIdChange = changeKey === 'factoryId'
    if (changeKey === 'factoryId') changeTeamConfig(changedValues.factoryId)
    nFormValue[changeKey] = changedValues[changeKey]
    if (isFactoryIdChange) {
      nFormValue.teamId = undefined
      setTimeout(() => {
        form.resetFields(['teamId'])
      })
    }
    setFormValue(nFormValue)
  }

  const changeTeamConfig = async (factoryId?: string, isInit?: boolean) => {
    const nConfigs: any[] = cloneDeep(formItemConfig)
    const list: any = factoryId ? await teamList({ factoryId }) : []
    list.forEach((item: any) => {
      item.label = item.teamName
      item.value = item.id
    })
    if (isInit) {
      return list
    } else {
      nConfigs[2]['options'] = list
      nConfigs[2]['disabled'] = !factoryId
      setFormItemConfig(nConfigs)
    }
  }

  const validator = (_: any, value: any) => {
    const flag = !!value.length
    if (!value || flag) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('请填写信息'))
  }

  const handleOk = async () => {
    try {
      const values = cloneDeep(await validateFields())
      if (type === 'edit') values.id = modalInfo.id
      await updateEfficiencyInfo(values)
      onAddCancel(true)
    } catch (err) {
      console.log(err)
    }
  }
  const okButtonProps = {
    onClick: () => handleOk(),
    style: { display: `${disabled ? 'none' : 'inlineBlock'}` }
  }
  return (
    <div>
      <Modal
        width={700}
        title={`${
          type === 'add' ? '新增' : type === 'edit' ? '编辑' : '查看'
        }产能效率`}
        visible={isModalVisible}
        onCancel={() => onAddCancel(false)}
        okButtonProps={okButtonProps}
        centered={true}
      >
        <Form
          form={form}
          name="basic"
          initialValues={formValue}
          {...layout}
          autoComplete="off"
          onValuesChange={onValuesChange}
        >
          {formItemConfig.map((item: any) => {
            const keys = [
              'type',
              'placeholder',
              'disabled',
              'options',
              'required',
              'treeData',
              'min',
              'treeCheckable',
              'allowClear'
            ]
            const data: any = {}
            keys.forEach((i: any) => {
              if (![null, undefined].includes(item[i])) {
                data[i] = item[i]
              }
            })
            return (
              <FormItem
                key={item.name}
                name={item.name}
                label={item.label}
                rules={[{ required: item.required, message: item.message }]}
              >
                <FormNode {...data} key={item.value}></FormNode>
              </FormItem>
            )
          })}
          <FormItem
            {...itemLayout}
            name="capacityEfficiencyList"
            rules={[{ validator: validator, required: true }]}
          >
            <EfficiencyTable disabled={disabled} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

export default AddModal
