import { Col, Form, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import FormNode from '@/components/FormNode'
import { departmentApis } from '@/recoil/apis'

import styles from './index.module.less'

const FormItem = Form.Item
// const { useForm } = Form

const EditModal = (props: any) => {
  const {
    visible,
    onCancel,
    title,
    modalId,
    modalParentId,
    modalStatus,
    treeData
  } = props
  const [form] = Form.useForm()
  const { setFieldsValue, validateFields, resetFields } = form
  const { getDepartmentDetail, editDepartment, getUsers } = departmentApis

  const formRef: any = useRef()

  const [initValues, setInitValues] = useState<Record<string, any>>({})
  const [users, setUsers] = useState([])
  const [tag, setTag] = useState(0)

  const treeInitData = [
    {
      children: treeData,
      title: '',
      value: '0'
    }
  ]

  useEffect(() => {
    ;(async () => {
      const target: any = {}
      if ([1, 2].includes(+modalStatus)) {
        target.parentId = modalParentId
        setInitValues(target)
      } else {
        const target = await getDepartmentDetail(modalId)
        if (target) {
          if (+modalStatus === 0) {
            setInitValues(target)
          }
        }
      }

      const usersData = await getUsers()
      const { records = [] } = usersData
      records.forEach((item: any) => {
        item.label = item.realName
        item.value = item.staffId
      })
      setUsers(records)
      resetFields()
    })()
  }, [])

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }

  const modalConfigs = [
    {
      label: '上级部门',
      name: 'parentId',
      value: '',
      type: 'tree',
      treeData: treeInitData,
      required: true,
      treeCheckable: false
    },
    {
      label: '级数',
      name: 'level',
      value: '',
      type: 'input',
      required: true
    },
    {
      label: '部门名称',
      name: 'deptName',
      value: '',
      type: 'input',
      required: true,
      message: '请输入部门名称'
    },
    {
      label: '负责人',
      name: 'principalId',
      value: '',
      type: 'select',
      options: users,
      required: false
    },
    {
      label: '联系方式',
      name: 'principalMobile',
      disabled: true,
      value: '',
      type: 'input',
      required: false
    },
    {
      label: '显示排序',
      name: 'deptOrder',
      value: '',
      type: 'number',
      min: 0,
      required: true,
      message: '请填写显示排序'
    },
    {
      label: '备注',
      name: 'remark',
      value: '',
      type: 'textarea',
      required: false
    }
  ]
  const modalSubmit = async () => {
    try {
      const values = await validateFields()
      if (+modalStatus === 0) {
        values.id = modalId
      }

      await editDepartment(values)
      onCancel && onCancel()
    } catch (error) {
      console.log(error)
    }
  }

  const onValuesChange = async (changedValues: any) => {
    const changeKeys = Reflect.ownKeys(changedValues)
    if (changeKeys.includes('principalId')) {
      const target: any = users.find(
        (item: any) => item.staffId === changedValues.principalId
      )
      await setFieldsValue({
        principalMobile: target.mobile
      })
      setTag((n) => n + 1)
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      title={title}
      width={800}
      onOk={modalSubmit}
      maskClosable={false}
    >
      <Form
        ref={formRef}
        form={form}
        onValuesChange={onValuesChange}
        className={styles.modalForm}
        key={tag}
        {...layout}
      >
        {modalConfigs.map((item: any) => {
          const keys = [
            'type',
            'placeholder',
            'disabled',
            'options',
            'required',
            'treeData',
            'min',
            'treeCheckable'
          ]
          const data: any = {}
          keys.forEach((i: any) => {
            if (![null, undefined].includes(item[i])) {
              data[i] = item[i]
            }
          })
          return (
            <Col key={item.name} span={12}>
              <FormItem
                name={item.name}
                label={item.label}
                initialValue={initValues[item.name]}
                rules={[{ required: item.required, message: item.message }]}
              >
                <FormNode {...data}></FormNode>
              </FormItem>
            </Col>
          )
        })}
      </Form>
    </Modal>
  )
}
export default EditModal
