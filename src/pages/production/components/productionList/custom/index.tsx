/*
 * @Author: lyj
 * @Date: 2022-07-15 13:43:31
 * @LastEditTime: 2022-07-22 10:26:06
 * @Description:
 * @LastEditors: lyj
 */
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, InputNumber, message, Modal, Select, Table } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { dockingData } from '@/recoil'
import { productionSingleApis } from '@/recoil/apis'

import styles from './index.module.less'

function Custom(props) {
  const { content } = props
  const { customType, setCustomType, types, currentlySelected, setEmpty } =
    content

  const { customSection, userDefinedSectionSaving } = productionSingleApis

  const { Option } = Select

  const searchConfigs = useRecoilValue(dockingData.searchConfigs)

  const [data, setData] = useState<any>([])
  useEffect(() => {
    getCustomSection()
  }, [currentlySelected])
  const getCustomSection = async () => {
    const res = await customSection({
      externalProduceOrderId: currentlySelected.externalProduceOrderId
    })

    setData(res)
  }
  //增加
  const increase = () => {
    const arr = data
    arr.push({
      key: Date.now(),
      ids: Date.now(),
      section: null,
      reservedTime: null
    })
    setData([...arr])
  }

  const reduce = (ids: any) => {
    const arr = cloneDeep(data)
    const res = arr.filter((item: { ids: any }) => item.ids !== ids)
    setData([...res])
  }

  const updateData = (record: any, list: any) => {
    /**
     * record 修改后的单个值.
     * list 老数据
     */
    const subscript = list.findIndex((item: any) => item.id === record.id)
    if (subscript !== -1) {
      list.splice(subscript, 1, record)
      setData([...list])
    } else {
    }
  }

  const handleChange = async (e: any, record: any, type) => {
    const sum = cloneDeep(data)
    record[type] = e
    console.log('处理后的', record)

    updateData(record, sum)
  }
  const columns: any = [
    {
      title: '序号',
      align: 'center',
      fixed: 'left',
      width: 80,
      dataIndex: 'sectionSn',
      key: 'sectionSn',
      render: (_value: any, _row: any, index: any) => {
        return <div key={_value}>{index + 1}</div>
      }
    },
    {
      title: '所属工段',
      align: 'center',
      width: 150,
      key: 'section',
      dataIndex: 'section',
      render: (_value, _row, index) => {
        return (
          <div>
            <Select
              disabled={types}
              placeholder="请选择所属工段"
              defaultValue={_value}
              style={{ width: 150 }}
              onChange={(e) => handleChange(e, _row, 'section')}
            >
              {searchConfigs.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        )
      }
    },
    {
      title: '固定耗时（单位：天）',
      align: 'center',
      width: 80,
      key: 'reservedTime',
      dataIndex: 'reservedTime',
      render: (_value, _row) => {
        return (
          <>
            <InputNumber
              disabled={types}
              controls={false}
              min={0}
              // disabled={_row.createPlanStatus}
              value={_value}
              onBlur={(e) => handleChange(e.target.value, _row, 'reservedTime')}
            />
          </>
        )
      }
    },
    {
      title: (
        <div>
          <Button
            disabled={types}
            onClick={increase}
            type="primary"
            icon={<PlusOutlined />}
          />
        </div>
      ),
      align: 'center',
      dataIndex: 'address',
      key: 'address',
      width: 80,
      fixed: 'right',
      render: (_value: any, _row: any, index: number) => {
        return (
          <div className={styles.flex}>
            {data.length > 1 ? (
              <Button
                disabled={types}
                onClick={() => reduce(_row.ids)}
                type="primary"
                icon={<MinusOutlined />}
              />
            ) : null}
          </div>
        )
      }
    }
  ]

  const showModal = () => {
    setCustomType(true)
  }

  const handleOk = async () => {
    const type = data.every((item: any) => {
      return item.section !== null && item.reservedTime !== null
    })
    if (isEmpty(data)) {
      message.error('不能为空')
    } else {
      if (type) {
        const parameter = {
          externalProduceOrderId: currentlySelected.externalProduceOrderId,
          externalProduceOrderNum: currentlySelected.externalProduceOrderNum,
          customSections: data
        }

        data.map((item, index) => {
          item.sectionSn = index
        })

        await userDefinedSectionSaving(parameter)
        setCustomType(false)
        message.success('保存成功')
        setEmpty(false)
      } else {
        message.error('所属工段、固定耗时不能为空')
      }
    }
  }
  const handleCancel = () => {
    setCustomType(false)
  }

  return (
    <div>
      <Modal
        centered={true}
        title="自定义"
        visible={customType}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          className={styles.table}
          bordered
          columns={columns}
          dataSource={data}
          rowKey={'key'}
        />
      </Modal>
    </div>
  )
}

export default Custom
