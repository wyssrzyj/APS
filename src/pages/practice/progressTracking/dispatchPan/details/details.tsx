/*
 * @Author: your name
 * @Date: 2022-04-29 11:22:59
 * @LastEditTime: 2022-04-29 11:23:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jack-aps\src\pages\practice\progressTracking\dispatchPan\details\index copy.tsx
 */
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

function Details(props: {
  setDetailsPopup: any
  detailsPopup: any
  editData: any
  update: any
}) {
  const { setDetailsPopup, detailsPopup, editData, update } = props
  const { detailsSewingPlan, getSKU, updateSewingPlan, detailsSewing } =
    practice
  const [list, setList] = useState<any>() //table处理后的格式

  const [sku, setSku] = useState<any>() //后台的sku
  const [data, setData] = useState<any>([]) //table 数据
  const [newData, setNewData] = useState<any>([]) //处理后的table 数据
  const [size, setSize] = useState<any>([]) //尺码
  const [modifyValue, setModifyValue] = useState<any>() //更改值
  const [edit, setEdit] = useState<any>() //编辑

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
      render: (
        _value:
          | boolean
          | React.ReactChild
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined,
        _row: any,
        index: number
      ) => {
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
    console.log('table 展示数据', newData)
  }, [newData])
  //table数据
  useEffect(() => {
    if (editData !== undefined) {
      tableData(editData)
    }
  }, [editData])
  const tableData = async (v: any) => {
    // 判断是新增还是编辑
    console.log('判断是新增还是编辑', v.auditStatus)
    //生成
    if (v.auditStatus === -1) {
      const sku = await getSKU({ produceOrderId: v.externalProduceOrderId })
      if (!isEmpty(sku)) {
        console.log('生成')
        formatProcessing(sku, v)
      }
    } else {
      const editor = await detailsSewing({
        id: v.sewingPlanTaskId
      })
      if (editor.code === 200) {
        if (!isEmpty(editor.data.sewingSkuDTOList)) {
          //sku  主题
          console.log('编辑')
          setEdit(editor.data)
          formatProcessing(editor.data.sewingSkuDTOList, v)
        }
      }
    }
  }
  //**处理 sku格式问题 、获取尺码
  const formatProcessing = (v: any, externalData: any) => {
    /**
     * v 是尺码
     * externalData 是外部数据
     */
    const dome = v

    //生成 才设置0
    dome.map((item: { planNum: any }) => {
      item.planNum = item.planNum !== undefined ? item.planNum : 0
    })
    console.log('第一条的数据', dome[0].planNum)

    setSku(dome)

    //尺码  ["xxx","xxl","l","m"]
    const size: any[] = []
    dome.map((item: { sizeName: any }) => {
      if (size.includes(item.sizeName) === false) {
        size.push(item.sizeName)
      }
    })

    //测试生成--------------------------
    // 拆分出来    [{},{}]
    const colorCode: any[] = []
    dome.map((item: { colorCode: any }) => {
      if (colorCode.includes(item.colorCode) === false) {
        colorCode.push(item.colorCode)
      }
    })
    console.log('拆分出来', colorCode)

    const list: { list: any }[] = []
    if (!isEmpty(colorCode)) {
      colorCode.map((item) => {
        list.push({
          list: dome.filter((i: { colorCode: any }) => i.colorCode === item)
        })
      })
    }
    //转成 需要的格式
    console.log('过滤出来的', list)
    if (!isEmpty(list)) {
      list.map((item: any, index) => {
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
    const handleObject = list.map((item: { demo: any; list: any }) => {
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
  const ownKeys = (data: { sizeName: string | number; planNum: any }[]) => {
    const obj = {}
    data.map((e: { sizeName: string | number; planNum: any }) => {
      obj[e.sizeName] = e.planNum
    })
    return obj
  }

  //**替换 尺码
  useEffect(() => {
    if (size !== undefined) {
      sizeReplace(size)
    }
  }, [size])
  const sizeReplace = (resSize: any[]) => {
    const goodsSize: {
      title: number
      dataIndex: any
      key: any
      align: string
      width: number
      render?: (value: any, row: Record<string, any>, index: number) => any
    }[] = []
    resSize.map((item: any) => {
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
        console.log('传递的值', data)

        setNewData([...data])
      } else {
        //替换数据
        updateData(modifyValue, data)
      }
    }
  }, [data, modifyValue])

  const updateData = (record: { id: any }, clone: any[]) => {
    /**
     * record 修改后的单个值
     * clone 老数据  用最新的值 不能用旧值
     */

    const subscript = clone.findIndex(
      (item: { id: any }) => item.id === record.id
    )
    if (subscript !== -1) {
      clone.splice(subscript, 1, record) //替换
      let sum = 0
      clone.map((item: { type: boolean; totalPrice: number }) => {
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
  const onBreakUp = (
    e: any,
    record: Record<string, any>,
    value: number,
    size: any[]
  ) => {
    console.log('没执行')

    //当前
    record[value] = e

    //总和
    let sum = 0
    size.map((item: string | number) => {
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
      console.log(editData.auditStatus)
      //生产
      if (editData.auditStatus === -1) {
        sku.map((item: any) => {
          item.planNum = saveFormatConversion(item, newData)
          item.produceSkuId = item.id
          item.id = ''
          item.sewingPlanTaskId = ''
        })

        // 生产
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
        console.log('生产', sku)

        const res = await updateSewingPlan(obj)
        if (res.code === 200) {
          setDetailsPopup(false)
          update && update()
        }
      } else {
        // 编辑
        console.log('编辑', sku)
        sku.map((item: any) => {
          item.planNum = saveFormatConversion(item, newData)
        })
        console.log('查看', sku)

        edit.sewingSkuDTOList = sku
        const res = await updateSewingPlan(edit)
        if (res.code === 200) {
          setDetailsPopup(false)
          update && update()
        }
      }
    } else {
      message.error('已超出生产量总量')
    }
  }
  // 获取当前最大值
  const maximum = (v: { colorCode: any }, title: any) => {
    // return 20
    const colorCode = sku.filter(
      (item: { colorCode: any }) => item.colorCode === v.colorCode
    )
    if (!isEmpty(colorCode)) {
      const remainNum = colorCode.filter(
        (item: { sizeName: any }) => item.sizeName === title
      )[0].remainNum
      console.log(remainNum)

      return remainNum
    }
  }
  //保存格式转换
  const saveFormatConversion = (
    v: { colorCode: any; sizeName: string | number },
    value: any[]
  ) => {
    const colorCode = value.filter(
      (item: { colorCode: any }) => item.colorCode === v.colorCode
    )
    return colorCode[0][v.sizeName]
  }
  //HUQOU D
  const handleCancel = () => {
    setDetailsPopup(false)
  }

  return (
    <div>
      {detailsPopup ? (
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
      ) : null}
    </div>
  )
}

export default Details
