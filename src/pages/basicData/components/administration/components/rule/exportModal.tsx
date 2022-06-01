/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Modal } from 'antd'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'

import FormNode from '@/components/FormNode'
import { efficiencyTemplateApis } from '@/recoil/apis'
import { changeBolbToXls } from '@/utils/tool'

import { exportModalConfig as originFormItemConfig } from './conifgs'
const { teamList, exportTemplate } = efficiencyTemplateApis
const FormItem = Form.Item
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 13 }
}
const itemLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 22 }
}
function ExportModal(props: Record<string, any>) {
  const { isModalVisible, onCancel, type, modalInfo, facList } = props
  const [form] = Form.useForm()
  const { validateFields, resetFields } = form
  const [formItemConfig, setFormItemConfig] = useState(originFormItemConfig)
  const [formValue, setFormValue] = useState({} as any)

  useEffect(() => {
    initFormItemConfigs()
  }, [isModalVisible])

  const initFormItemConfigs = async () => {
    const nFormItemConfig: any[] = cloneDeep(formItemConfig)
    nFormItemConfig[0]['options'] = facList
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
      nConfigs[1]['options'] = list
      nConfigs[1]['disabled'] = !factoryId
      setFormItemConfig(nConfigs)
    }
  }

  const handleOk = async () => {
    try {
      const values = cloneDeep(await validateFields())
      const res = await exportTemplate(values)
      if (res) {
        changeBolbToXls(res, '产能效率模板')
        onCancel()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Modal
        width={500}
        title={'导出模板'}
        visible={isModalVisible}
        onCancel={() => onCancel(false)}
        onOk={handleOk}
        okText="下载模板"
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
        </Form>
      </Modal>
    </div>
  )
}

export default ExportModal
