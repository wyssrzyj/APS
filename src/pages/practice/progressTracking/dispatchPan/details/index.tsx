import { InputNumber, message, Modal, Table } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'
import { ResponseProps } from '@/recoil/types'

type Column = {
  title: string
  align: 'center' | 'right' | 'left'
  fixed: 'right' | 'left'
  width: number
  dataIndex: string
  [key: string]: any
}

function Details(props: { setDetailsPopup; detailsPopup; editData }) {
  const { setDetailsPopup, detailsPopup, editData } = props
  const { detailsSewingPlan, getSKU, updateSewingPlan } = practice
  const [list, setList] = useState<any>() //table处理后的格式

  const [sku, setSku] = useState<any>() //后台的sku
  const [data, setData] = useState<any>([]) //table 数据
  const [newData, setNewData] = useState<any>([]) //处理后的table 数据
  const [size, setSize] = useState<any>([]) //尺码
  const [modifyValue, setModifyValue] = useState<any>() //更改值

  const columns: Partial<Column>[] = [
    {
      title: '产品款号',
      align: 'center',
      fixed: 'left',
      width: 50,
      dataIndex: 'productNum'
    },
    {
      title: '产品名称',
      align: 'center',
      fixed: 'left',
      width: 100,
      dataIndex: 'productName'
    },
    {
      title: '颜色名称',
      align: 'center',
      fixed: 'left',
      width: 50,
      dataIndex: 'colorName'
    },
    {
      title: '颜色代码',
      align: 'center',
      fixed: 'left',
      width: 50,
      dataIndex: 'colorCode'
    },
    {
      title: `生产量 【最大${
        editData !== undefined ? editData.productionAmount : 0
      }】`,
      align: 'center',
      width: 100,
      fixed: 'right',
      dataIndex: 'totalPrice', //
      render: (_value, _row, index: number) => {
        return (
          <div>
            {/* {console.log('渲染顺序', _value)} */}

            <div>{_value}</div>
          </div>
        )
      }
    }
  ]

  //table数据
  useEffect(() => {
    if (editData !== undefined) {
      tableData(editData)
    }
  }, [editData])
  const tableData = async (v) => {
    // 判断是新增还是编辑
    console.log(v.auditStatus)
    //生成
    if (v.auditStatus === -1) {
      console.log(v)
      const sku = await getSKU({ produceOrderId: v.externalProduceOrderId })
      if (!isEmpty(sku)) {
        formatProcessing(sku, v)
      }
    }
  }
  //**处理 sku格式问题 、获取尺码
  const formatProcessing = (v, externalData) => {
    /**
     * v 是尺码
     * externalData 是外部数据
     */
    const dome = v
    console.log('测试展示', dome)

    //后面 dome 直接换成v
    //模拟代码
    // const dome: any = [
    //   {
    //     id: '1',
    //     colorName: '特白',
    //     colorCode: '01-0 01 ',
    //     sizeCode: 'A',
    //     sizeName: 'A',
    //     productionNum: 6,
    //     remainNum: 2120,
    //     skuId: null
    //   },
    //   {
    //     id: '2',
    //     colorName: '特白',
    //     colorCode: '01-0 01 ',
    //     sizeCode: 'B',
    //     sizeName: 'B',
    //     productionNum: 82,
    //     remainNum: 20,
    //     skuId: null
    //   },
    //   {
    //     id: '3',
    //     colorName: '特白',
    //     colorCode: '01-0 01 ',
    //     sizeCode: 'C',
    //     sizeName: 'C',
    //     productionNum: 313,
    //     remainNum: 30,
    //     skuId: null
    //   },
    //   {
    //     id: '4',
    //     colorName: '特紫',
    //     colorCode: '01-0 02 ',
    //     sizeCode: 'A',
    //     sizeName: 'A',
    //     productionNum: 586,
    //     remainNum: 40,
    //     skuId: null
    //   },
    //   {
    //     id: '5',
    //     colorName: '特紫',
    //     colorCode: '01-0 02 ',
    //     sizeCode: 'B',
    //     sizeName: 'B',
    //     productionNum: 586,
    //     remainNum: 50,
    //     skuId: null
    //   },
    //   {
    //     id: '6',
    //     colorName: '特紫',
    //     colorCode: '01-0 02 ',
    //     sizeCode: 'C',
    //     sizeName: 'C',
    //     productionNum: 586,
    //     remainNum: 60,
    //     skuId: null
    //   },
    //   {
    //     id: '7',
    //     colorName: '特粉',
    //     colorCode: '01-0 03 ',
    //     sizeCode: 'A',
    //     sizeName: 'A',
    //     productionNum: 6,
    //     remainNum: 70,
    //     skuId: null
    //   },
    //   {
    //     id: '8',
    //     colorName: '特粉',
    //     colorCode: '01-0 03 ',
    //     sizeCode: 'B',
    //     sizeName: 'B',
    //     productionNum: 82,
    //     remainNum: 80,
    //     skuId: null
    //   },
    //   {
    //     id: '9',
    //     colorName: '特粉',
    //     colorCode: '01-0 03 ',
    //     sizeCode: 'C',
    //     sizeName: 'C',
    //     productionNum: 313,
    //     remainNum: 90,
    //     skuId: null
    //   }
    // ]

    //生成 才设置0
    dome.map((item) => {
      item.sizeNumber = item.sizeNumber ? item.sizeNumber : 0
    })

    setSku(dome)

    //尺码  ["xxx","xxl","l","m"]
    const size = []
    dome.map((item: { sizeName }) => {
      if (size.includes(item.sizeName) === false) {
        size.push(item.sizeName)
      }
    })

    //测试生成--------------------------
    // 拆分出来    [{},{}]
    const colorCode = []
    dome.map((item: { colorCode }) => {
      if (colorCode.includes(item.colorCode) === false) {
        colorCode.push(item.colorCode)
      }
    })
    console.log('拆分出来', colorCode)

    const list = []
    if (!isEmpty(colorCode)) {
      colorCode.map((item) => {
        list.push({
          list: dome.filter((i: { colorCode }) => i.colorCode === item)
        })
      })
    }
    //转成 需要的格式
    console.log('过滤出来的', list)
    if (!isEmpty(list)) {
      list.map((item, index) => {
        item.id = index + 1
        item.type = index + 1
        item.productNum = externalData.productNum
        item.productName = externalData.productName
        item.demo = ownKeys(item.list)
        item.colorName = item.list[0].colorName
        item.colorCode = item.list[0].colorCode
      })
    }
    // 处理对象嵌套
    const handleObject = list.map((item: { demo; list }) => {
      const obj = { ...item, ...item.demo }
      delete item.demo
      delete item.list
      return obj
    })

    handleObject.map((item) => {
      item.type = true
      let sum = 0
      size.map((v) => {
        sum += item[v]
      })
      item.totalPrice = sum
    })

    let sum = 0
    if (!isEmpty(handleObject)) {
      handleObject.map((item) => {
        sum += item.totalPrice
      })
    }
    console.log(sum)

    //  handleObject[handleObject.length - 1].totalPrice =
    //    sum - handleObject[handleObject.length - 1].totalPrice
    //添加最后一行
    handleObject.push({
      id: new Date(),
      type: false,
      totalPrice: sum
    })
    setData(handleObject)
    setSize(size)
  }

  // 获取 a：0，b:1
  const ownKeys = (data) => {
    const obj = {}
    data.map((e: { sizeName: string | number; sizeNumber }) => {
      obj[e.sizeName] = e.sizeNumber
    })
    return obj
  }

  //**替换 尺码
  useEffect(() => {
    if (size !== undefined) {
      sizeReplace(size)
    }
  }, [size])
  const sizeReplace = (resSize) => {
    const goodsSize: {
      title
      dataIndex
      key
      align: string
      width: number
      render?: (value: any, row: Record<string, any>, index: number) => any
    }[] = []
    resSize.map((item) => {
      goodsSize.push({
        title: item.toUpperCase(),
        dataIndex: item.toUpperCase(),
        key: item.toUpperCase(),
        align: 'center',
        width: 80
      })
    })
    goodsSize.map((item) => {
      item.render = (_value, _row) => {
        return (
          <div>
            {_row.type ? (
              <InputNumber
                key={_row.id}
                // max={maximum(_row, item.title)}
                max={20}
                min={0}
                defaultValue={_value === undefined ? 0 : _value}
                onChange={(e) => onBreakUp(e, _row, item.title, resSize)}
              />
            ) : null}
          </div>
        )
      }
    })
    //替换
    const index = columns.findIndex(
      (item: { dataIndex: string }) => item.dataIndex === 'colorCode'
    )
    if (goodsSize !== undefined) {
      columns.splice(index + 1, 0, goodsSize)
      setList(columns.flat(Infinity))
    }
  }

  //处理尾部
  useEffect(() => {
    if (!isEmpty(data)) {
      if (modifyValue === undefined) {
        setNewData([...data])
      } else {
        //替换数据
        updateData(modifyValue, data)
      }
    }
  }, [data, modifyValue])

  const updateData = (record, clone) => {
    /**
     * record 修改后的单个值
     * clone 老数据  用最新的值 不能用旧值
     */

    const subscript = clone.findIndex((item) => item.id === record.id)
    if (subscript !== -1) {
      clone.splice(subscript, 1, record) //替换
      let sum = 0
      clone.map((item) => {
        if (item.type !== false) {
          sum += item.totalPrice
        }
      })

      clone[clone.length - 1].totalPrice = sum
      const dome = cloneDeep(clone) //传递的时候深拷贝一下
      setNewData([...dome])
    }
  }
  //数字输入框的处理
  let timeout: NodeJS.Timeout
  const onBreakUp = (e, record, value: number, size) => {
    console.log('没执行')

    //当前
    record[value] = e

    //总和
    let sum = 0
    size.map((item) => {
      sum += record[item]
    })
    record.totalPrice = sum

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setModifyValue({ ...record })
    }, 200)
  }
  const handleOk = async () => {
    if (newData[newData.length - 1].totalPrice <= editData.productionAmount) {
      sku.map((item) => {
        item.planNum = saveFormatConversion(item, newData)
        item.produceSkuId = item.id
        item.id = ''
        item.sewingPlanTaskId = ''
      })
      const obj: any = {}
      obj.billingDate = ''
      obj.billingUserId = ''
      obj.detailId = editData.id // 发单详情id.
      obj.estimatedDate = editData.id // 预估工期

      const estimatedDate =
        (editData.planEndTime - editData.planStartTime) / 1000 / 60 / 60 / 24
      obj.estimatedDate = Math.abs(Math.ceil(estimatedDate)) //预估工期
      obj.id = ''
      obj.outType = ''
      // 开始时间
      obj.planStartDate = moment(editData.planStartTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      // 结束时间
      obj.planEndDate = moment(editData.planEndTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      // 生产单id
      obj.produceOrderId = editData.externalProduceOrderId

      obj.sewingSkuDTOList = sku
      obj.teamManagerId = editData.teamId
      const res = await updateSewingPlan(obj)
      console.log(res)
    } else {
      message.error('已超出生产量总量')
    }

    // setDetailsPopup(false)
  }
  // 获取当前最大值
  const maximum = (v, title) => {
    // return 20
    const colorCode = sku.filter(
      (item: { colorCode }) => item.colorCode === v.colorCode
    )
    if (!isEmpty(colorCode)) {
      const remainNum = colorCode.filter((item) => item.sizeName === title)[0]
        .remainNum
      console.log(remainNum)

      return remainNum
    }
  }
  //保存格式转换
  const saveFormatConversion = (v, value) => {
    const colorCode = value.filter((item) => item.colorCode === v.colorCode)
    return colorCode[0][v.sizeName]
  }
  //HUQOU D
  const handleCancel = () => {
    setDetailsPopup(false)
  }

  return (
    <div>
      <Modal
        width={1200}
        visible={detailsPopup}
        centered={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          bordered
          columns={list}
          scroll={{ x: 1500, y: 1000 }}
          dataSource={newData}
          rowKey={'id'}
        />
      </Modal>
    </div>
  )
}

export default Details
