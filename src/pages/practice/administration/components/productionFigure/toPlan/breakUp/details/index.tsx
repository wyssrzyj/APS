import { InputNumber, Modal, Table } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

function Details(props: { setDetailsPopup: any; detailsPopup: any }) {
  const { setDetailsPopup, detailsPopup } = props
  const [data, setData] = useState<any>([])
  const [gross, setGross] = useState<any>(0) //总值

  useEffect(() => {
    getInterfaceData()
  }, [])
  useEffect(() => {
    if (!isEmpty(data)) {
      cumulative(data)
    }
  }, [data])
  //获取总值
  const cumulative = (storage: any[]) => {
    const getGross = storage.reduce(
      (total: any, current: { totalPrice: any }) => {
        total += current.totalPrice
        return total
      },
      0
    )
    setGross(getGross)
  }

  const getInterfaceData = () => {
    const storage: any = [
      {
        id: 1,
        name: `红`,
        color: 'red',
        s: 100,
        m: 100,
        l: 100
      },
      {
        id: 2,
        name: `蓝`,
        color: 'blue',
        s: 100,
        m: 100,
        l: 100
      }
    ]
    //计算当前行
    storage.map((item: { totalPrice: any; s: any; m: any; l: any }) => {
      item.totalPrice = item.s + item.m + item.l
    })
    //添加最后一行
    storage.push({
      id: new Date(),
      totalPrice: 0
    })

    setData(storage)
  }

  const handleOk = () => {
    setDetailsPopup(false)
  }
  const handleCancel = () => {
    setDetailsPopup(false)
  }

  //替换数据
  const updateData = (record: any, list: any) => {
    /**
     * record 修改后的单个值
     * list 老数据
     */
    const sum = cloneDeep(list)
    const subscript = sum.findIndex((item: any) => item.id === record.id)
    if (subscript !== -1) {
      sum.splice(subscript, 1, record)
      setData(sum)
    }
  }
  //数字输入框的处理
  let timeout: NodeJS.Timeout
  const onBreakUp = (e: any, record: any, type: number) => {
    const sum = cloneDeep(data)
    if (type === 1) {
      record.s = e
    }
    if (type === 2) {
      record.m = e
    }
    if (type === 3) {
      record.l = e
    }
    record.totalPrice = record.s + record.m + record.l
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      updateData(record, sum)
    }, 500)
  }

  const columns: any = [
    {
      title: '颜色名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '颜色代码',
      align: 'center',
      dataIndex: 'color'
    },
    {
      title: 'S',
      align: 'center',
      dataIndex: 's',
      render: (_value: any, _row: any) => {
        return (
          <div>
            {_value ? (
              <InputNumber
                defaultValue={_value}
                onChange={(e) => onBreakUp(e, _row, 1)}
              />
            ) : null}
          </div>
        )
      }
    },
    {
      title: 'M',
      align: 'center',
      dataIndex: 'm',
      render: (_value: any, _row: any) => {
        return (
          <div>
            {_value ? (
              <InputNumber
                defaultValue={_value}
                onChange={(e) => onBreakUp(e, _row, 2)}
              />
            ) : null}
          </div>
        )
      }
    },
    {
      title: 'L',
      align: 'center',
      dataIndex: 'l',
      render: (_value: any, _row: any) => {
        return (
          <div>
            {_value ? (
              <InputNumber
                defaultValue={_value}
                onChange={(e) => onBreakUp(e, _row, 3)}
              />
            ) : null}
          </div>
        )
      }
    },
    {
      title: '生产量',
      align: 'center',
      width: 150,
      dataIndex: 'totalPrice', //
      render: (_value: any, _row: any, index: number) => {
        return (
          <div>
            {index === data.length - 1 ? <>{gross}</> : <div>{_value}</div>}
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Modal
        width={1000}
        visible={detailsPopup}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          bordered
          columns={columns}
          //   scroll={{ x: 1500, y: 500 }}
          dataSource={data}
          rowKey={'id'}
        />
      </Modal>
    </div>
  )
}

export default Details
