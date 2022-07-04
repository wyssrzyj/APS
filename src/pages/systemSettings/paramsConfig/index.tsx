/*
 * @Author: lyj
 * @Date: 2022-05-19 08:38:27
 * @LastEditTime: 2022-07-04 18:03:54
 * @Description:
 * @LastEditors: lyj
 */
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
import { systemParametersApis } from '@/recoil/apis'

import Color from './Color/index'
import SingleColor from './Color/singleColor'
import DeliveryWeight from './deliveryWeight'
import EarlyWarning from './earlyWarning'
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
  const [InputNumberValue, setInputNumberValue] = useState()
  const [list, setList] = useState<any>({}) //接口数据

  const [form] = Form.useForm()
  const { systemParameter, systemParameters } = systemParametersApis

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
    setList(arr)
    setInputNumberValue(arr.deliveryDateDeductionDays)
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
  //判断是否重复
  const repeat = (item) => {
    const sum = []
    item.map((v) => {
      sum.push(v.expireTime)
    })
    const nary = sum.sort(function (a, b) {
      return a - b
    })

    for (let i = 0; i < nary.length; i++) {
      if (nary[i] === nary[i + 1]) {
        return true
      }
    }
  }

  const onFinish = async (values: any) => {
    const arr: any = {}
    //重新排程时锁定
    // arr.lockTime = values.lockTime.delay
    // arr.lockTimeUnit = values.lockTime.day
    //库存负荷图默认显示时间区间
    arr.stockLoadTime = values.stockLoadTime.delay
    arr.stockLoadTimeUnit = values.stockLoadTime.day

    // 订单甘特图默认显示时间区间
    // arr.orderGanttTime = values.orderGanttTime.delay
    // arr.orderGanttTimeUnit = values.orderGanttTime.day
    arr.orderGanttTime = 30
    arr.orderGanttTimeUnit = '1'
    //资源甘特图默认显示时间区间
    // arr.resourceTime = values.resourceTime.delay
    // arr.resourceTimeUnit = values.resourceTime.day
    arr.resourceTime = 30
    arr.resourceTimeUnit = '1'

    arr.waringColor = values.waringColor[0].color

    //规则设置
    // 承诺交期计算
    arr.deliveryDateDeductionDays = InputNumberValue

    //  未延期
    arr.unExpireTime = values.deliveryWeight[0].delay
    arr.unExpireTimeUnit = values.deliveryWeight[0].day
    arr.unExpireWeight = values.deliveryWeight[0].weight

    // 预警延期
    arr.earlyWaringTime = values.deliveryWeight[1].delay
    arr.earlyWaringTimeUnit = values.deliveryWeight[1].day
    arr.earlyWaringWeight = values.deliveryWeight[1].weight

    //  延期
    arr.expireTime = values.deliveryWeight[2].delay
    arr.expireTimeUnit = values.deliveryWeight[2].day
    arr.expireWeight = values.deliveryWeight[2].weight

    arr.expireColorConfigs = values.expireColorConfigs

    // 预警设置
    arr.waringConfigs = values.waringConfigs

    if (repeat(arr.expireColorConfigs) !== true) {
      const res = await systemParameters(arr)
      if (res === true) {
        message.success('保存成功')
      }
      api()
    } else {
      message.warning('时间不能重复')
    }
  }
  const sum = [
    // { label: '重新排程时锁定', name: 'lockTime', unit: 'lockTimeUnit' },
    {
      label: '班组负荷图默认显示时间区间',
      name: 'stockLoadTime',
      unit: 'stockLoadTimeUnit',
      width: 180
    }

    // {
    //   label: '生产单甘特图默认显示时间区间',
    //   name: 'orderGanttTime',
    //   unit: 'orderGanttTimeUnit'
    // },
    // {
    //   label: '班组甘特图默认显示时间区间',
    //   name: 'resourceTime',
    //   unit: 'resourceTimeUnit'
    // }
  ]
  const preservation = () => {
    form.submit()
  }
  const getInputNumberValue = (e) => {
    setInputNumberValue(e.target.value)
  }

  return (
    <div className={styles.qualification}>
      <div>{/* <Title title={'系统参数设置'} /> */}</div>
      <div className={styles.content}>
        <Form
          form={form}
          name="basic"
          {...layout}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div>
            显示设置
            <div className={styles.border}></div>
            {sum.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <Form.Item key={item.name} label={item.label} name={item.name}>
                <Inputs onChange={undefined} list={list} item={item} />
              </Form.Item>
            ))}
            <Form.Item label="预警显示颜色" name="waringColor">
              {/* 颜色 */}
              <SingleColor onChange={undefined} list={list} />
            </Form.Item>
            <Form.Item label="延期显示颜色" name="expireColorConfigs">
              {/* 颜色 */}
              <Color onChange={undefined} list={list}></Color>
            </Form.Item>
          </div>

          <div>
            规则设置
            <div className={styles.border}></div>
            <Form.Item label="承诺交期计算" name="6666">
              承诺交期 = 销售订单交期-{' '}
              <InputNumber
                value={list.deliveryDateDeductionDays}
                style={{ width: 70 }}
                min={1}
                onBlur={getInputNumberValue}
              />
              天
            </Form.Item>
            <Form.Item label="交期权重" name="deliveryWeight">
              <DeliveryWeight onChange={undefined} list={list} />
            </Form.Item>
          </div>
          <div>
            {/* 显示设置 */}
            {/* <div className={styles.border}></div> */}
            {sum.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <Form.Item key={item.name} label={item.label} name={item.name}>
                <Inputs onChange={undefined} list={list} item={item} />
              </Form.Item>
            ))}
            {/* <Form.Item label="预警显示颜色" name="color">
              <SingleColor onChange={undefined} list={null} />
            </Form.Item> */}
            <Form.Item label="延期显示颜色" name="expireColorConfigs">
              {/* 颜色 */}
              <Color onChange={undefined} list={list}></Color>
            </Form.Item>
          </div>

          {/* <div>
            预警设置
            <div className={styles.border}></div>
            <Form.Item label="未完成生产单预警" name="waringConfigs">
              <EarlyWarning onChange={undefined} list={list} />
            </Form.Item>
          </div> */}
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
