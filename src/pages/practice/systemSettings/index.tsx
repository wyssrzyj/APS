import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popover,
  Row,
  Select
} from 'antd'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Title } from '@/components'
import { commonState } from '@/recoil'
import { practice } from '@/recoil/apis'

import Color from './Color/index'
import DeliveryWeight from './deliveryWeight'
import styles from './index.module.less'
import Inputs from './inputs'

function Vacations() {
  //获取全局中依赖的数据
  const value = useRecoilValue(commonState.lyj)

  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total] = useState<number>(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗+
  const [list, setlist] = useState([]) //接口数据

  const [form] = Form.useForm()
  const { systemParameter, systemParameters } = practice

  const { Option } = Select
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 15
    }
  }

  useEffect(() => {
    api()
  }, [])
  const api = async () => {
    const arr = await systemParameter()

    setlist(arr)
  }

  // eslint-disable-next-line no-sparse-arrays

  const data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    })
  }
  //头部form的数据
  const FormData = (e: any) => {
    console.log(e)
  }
  const onPaginationChange = (
    page: React.SetStateAction<number>,
    pageSize: React.SetStateAction<number>
  ) => {
    setPageNum(page)
    setPageSize(pageSize)
  }
  const editUser = (type: boolean) => {
    if (type === true) {
      setType(false)
      setIsModalVisible(true)
    } else {
      console.log('查看')
    }
  }
  //删除
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      setMovIsModalVisible(true)
    }
  }
  const movApi = () => {
    console.log('删除逻辑')
    console.log('选中的删除id', selectedRowKeys)
  }
  const onSelectChange = (selectedRowKeys: React.SetStateAction<never[]>) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: React.SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const executionMethod = () => {
    setIsModalVisible(true)
    setType(true)
  }
  const onFinish = async (values: any) => {
    const arr: any = {}
    //重新排程时锁定
    arr.lockTime = values.lockTime.delay
    arr.lockTimeUnit = values.lockTime.day
    //库存负荷图默认显示时间区间
    arr.stockLoadTime = values.stockLoadTime.delay
    arr.stockLoadTimeUnit = values.stockLoadTime.day
    // 订单甘特图默认显示时间区间
    arr.orderGanttTime = values.orderGanttTime.delay
    arr.orderGanttTimeUnit = values.orderGanttTime.day
    //资源甘特图默认显示时间区间
    arr.resourceTime = values.resourceTime.delay
    arr.resourceTimeUnit = values.resourceTime.day
    //交期权重
    //  未延期
    arr.unExpireTime = values.deliveryWeight[0].delay
    arr.unExpireTimeUnit = values.deliveryWeight[0].day
    arr.unExpireWeight = values.deliveryWeight[0].weight
    //  延期
    arr.expireTime = values.deliveryWeight[1].delay
    arr.expireTimeUnit = values.deliveryWeight[1].day
    arr.expireWeight = values.deliveryWeight[1].weight
    arr.expireColorConfigs = values.expireColorConfigs
    const res = await systemParameters(arr)
    if (res === true) {
      message.success('保存成功')
    }
    api()

    // 处理数据
  }
  const sum = [
    { label: '重新排程时锁定', name: 'lockTime', unit: 'lockTimeUnit' },
    {
      label: '资源负荷图默认显示时间区间',
      name: 'stockLoadTime',
      unit: 'stockLoadTimeUnit'
    },

    {
      label: '生产单甘特图默认显示时间区间',
      name: 'orderGanttTime',
      unit: 'orderGanttTimeUnit'
    },
    {
      label: '班组甘特图默认显示时间区间',
      name: 'resourceTime',
      unit: 'resourceTimeUnit'
    }
  ]
  const preservation = () => {
    form.submit()
  }
  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'系统参数设置'} />
      </div>
      <div className={styles.content}>
        <Form
          form={form}
          name="basic"
          {...layout}
          onFinish={onFinish}
          autoComplete="off"
        >
          {sum.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Form.Item key={item.name} label={item.label} name={item.name}>
              <Inputs onChange={undefined} list={list} item={item} />
            </Form.Item>
          ))}

          <Form.Item
            label="交期权重"
            name="deliveryWeight"
            rules={[{ required: true, message: '请输入交期权重!' }]}
          >
            <DeliveryWeight onChange={undefined} list={list} />
          </Form.Item>
          <Form.Item label="延期显示颜色" name="expireColorConfigs">
            {/* 颜色 */}
            <Color onChange={undefined} list={list}></Color>
          </Form.Item>
        </Form>
        <div className={styles.executionMethod}>
          <Button type="primary" htmlType="submit" onClick={preservation}>
            保存
          </Button>
        </div>
        {/* <div>测试全局：{value}</div> */}
      </div>
    </div>
  )
}

export default Vacations
