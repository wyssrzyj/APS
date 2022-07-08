/* eslint-disable prefer-const */
import { DatePicker, Input, Select, Space, Table } from 'antd'
// import Virtual from './virtual'
import classNames from 'classnames'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components'
import { materialSetApis } from '@/recoil/apis'

import Forms from './forms'
import styles from './index.module.less'
const FormTable = (props: any) => {
  const {
    tableData,
    sizeList,
    saveData,
    select,
    recheckData,
    workshopSection
  } = props
  const { Option } = Select

  const [initialData, setInitialData] = useState<any>([]) //接口初始数据

  const [notData, setNotData] = useState<any>([]) //操作数据
  const [columnsList, setColumnsList] = useState<any>([]) //格式
  const [data, setData] = useState<any>([]) //table 展示 数据
  const [loading, setLoading] = useState<any>(true) //加载
  const [renderData, setRenderData] = useState<any>()

  const [defaultExpandedRow, setDefaultExpandedRow] = useState<any>([]) //全部展开
  const [time, setTime] = useState<any>() //手动设置的的齐套日期
  const [cloneData, setCloneData] = useState<any>([]) // 重新检查修改后的数据

  const [section, setSection] = useState<any>([]) //所属工段
  const sectionType = useRef({ type: false, id: '0' }) //获取最新 的值

  const [materialDate, setMaterialDate] = useState<any>() //物料齐套日期的时间

  const { sectionList, materialCompletionTimeList } = materialSetApis
  const map = new Map()
  map.set('1', '裁剪')
  map.set('2', '缝制')
  map.set('3', '后整')
  map.set('4', '包装')
  map.set('5', '外发')
  map.set('6', '缝制线外组')

  useEffect(() => {
    if (select) {
      console.log(select)

      getSectionList()
    }
  }, [select])
  //处理格式
  const formatProcessing = (data) => {
    data.map((item: any) => {
      item.name = map.get(item.section)
      item.id = item.section
      item.value = item.allReadyTime
    })
    return data
  }

  //数据替换
  const dataReplacement = (timeList, list) => {
    const cloneList = cloneDeep(list)
    console.log('换用', timeList)

    timeList.forEach((item) => {
      const subscript = cloneList.findIndex(
        (v: any) => v.section === item.section
      )
      if (subscript !== -1) {
        cloneList.splice(subscript, 1, item)
      }
    })
    return cloneList
  }
  let getSectionList = async () => {
    //原始的工厂数据
    let section = await sectionList()
    section.map((item) => {
      item.externalProduceOrderId = item.dictValue
      item.externalProduceOrderNum = item.dictValue
      item.section = item.dictValue
      item.allReadyTime = null
    })

    let res = await materialCompletionTimeList({
      id: select.externalProduceOrderId
    })
    if (!isEmpty(res)) {
      setSection(formatProcessing(dataReplacement(res, section)))
    } else {
      setSection(formatProcessing(section))
    }

    //所属工段
  }
  useEffect(() => {
    workshopSection && workshopSection(section)
  }, [section])

  //初始赋值
  useEffect(() => {
    if (!isEmpty(tableData)) {
      setInitialData(tableData)
    }
  }, [tableData])

  useEffect(() => {
    if (!isEmpty(notData)) {
      saveData && saveData(notData, materialDate)
    }
    //给后台传递的数据
  }, [notData, materialDate])
  //添加最后一层的时间
  const getMaxTime = (v) => {
    let time = []
    if (!isEmpty(v)) {
      let arr = []
      v.forEach((item) => {
        if (!isEmpty(item.children)) {
          arr.push(item.children)
        }
      })
      if (!isEmpty(arr.flat(Infinity))) {
        arr.flat(Infinity).forEach((item) => {
          if (item.prepareTime !== null) {
            time.push(item.prepareTime)
          }
        })
      }
    }
    if (!isEmpty(time)) {
      return Number(Math.max(...time))
    } else {
      return null
    }
  }

  //已检查且已计划 才不可用
  const whetherAvailable = (e) => {
    if (e !== undefined) {
      if ((e.checkStatus === 1 && e.status === 2) || e.name === '已检查') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  useEffect(() => {
    if (!isEmpty(sizeList)) {
      const columns: any = [
        {
          title: '物料类型',
          width: 100,
          dataIndex: 'materialKind',
          fixed: 'left',
          align: 'center',
          key: 'materialKind'
        },
        {
          title: '物料代码',
          dataIndex: 'materialCode',
          width: 150,
          align: 'center',
          fixed: 'left',
          key: 'material'
        },
        {
          title: '物料名称',
          width: 100,
          dataIndex: 'materialName',
          fixed: 'left',
          align: 'center',
          key: 'materialName'
        },
        {
          title: '所属工段',
          width: 100,
          dataIndex: 'section',
          fixed: 'left',
          align: 'center',
          key: 'section',
          render: (e) => <>{map.get(e)}</>
        },
        // {
        //   title: '物料颜色代码',
        //   dataIndex: 'skuCode',
        //   width: 100,
        //   align: 'center',
        //   key: 'materialColCode'
        // },
        {
          title: '颜色',
          dataIndex: 'proColName',
          width: 100,
          align: 'center',
          key: 'proColName'
        },
        {
          title: '物料需求数量',
          width: 100,
          dataIndex: 'requireQuantity',
          align: 'center',
          key: 'requireQuantity'
        },
        {
          title: '单位',
          width: 100,
          dataIndex: 'unit',
          align: 'center',
          key: 'unit'
        },
        {
          title: '物料库存数量',
          width: 100,
          dataIndex: 'availableStockQtyTotal',
          align: 'center',
          key: 'availableStockQtyTotal'
        },
        {
          title: '已出库数量',
          width: 100,
          dataIndex: 'deliveredQty',
          align: 'center',
          key: 'deliveredQty'
        },
        {
          title: '冲销数量',
          dataIndex: 'counteractNum',
          align: 'center',
          fixed: 'right',
          width: 150,
          key: 'counteractNum',
          render: (_item: any, v: any) =>
            isEmpty(v.children) ? (
              <>
                <Input
                  type="number"
                  disabled={whetherAvailable(select)}
                  min={0}
                  defaultValue={_item}
                  onBlur={(e) => {
                    quantity(e.target.value, v)
                  }}
                />
              </>
            ) : (
              _item
            )
        },
        {
          title: '物料缺少数量',
          dataIndex: 'shortOfProductNum',
          align: 'center',
          fixed: 'right',
          width: 70,
          key: 'shortOfProductNum',
          render: (_item: any) => <div>{_item.toFixed(2)}</div>
        },
        {
          title: '是否充足',
          dataIndex: 'enoughFlag',
          width: 70,
          align: 'center',
          key: 'enoughFlag',
          fixed: 'right',
          render: (_item: any) => (
            <Space size="middle">
              {_item === 1 ? (
                <Icon type="jack-icon-test" className={styles.previous} />
              ) : (
                <Icon type="jack-cuowu" className={styles.previous} />
              )}
            </Space>
          )
        },
        {
          title: '齐料日期',
          dataIndex: 'prepareTime',
          fixed: 'right',
          align: 'center',
          width: 150,
          key: 'prepareTime',
          render: (_item: any, v: any) => (
            <Space size="middle">
              {isEmpty(v.children) ? (
                !v.enoughFlag ? (
                  <>
                    <DatePicker
                      disabled={true}
                      allowClear={false}
                      value={_item ? moment(Number(_item)) : undefined}
                      onChange={(e) => {
                        onChange(e, v)
                      }}
                    />
                  </>
                ) : null
              ) : null}
            </Space>
          )
        }
      ]
      columns.map((item: { align: string }) => {
        item.align = 'center'
      })
      const index = columns.findIndex(
        (item: { dataIndex: string }) => item.dataIndex === 'proColName'
      )
      columns.splice(index + 1, 0, sizeList)
      // setType(true)
      setRenderData(columns.flat(Infinity))
    }
  }, [sizeList])

  //渲染最终数据
  useEffect(() => {
    if (sectionType.current.type === false) {
      if (select !== undefined) {
        if (select.name === '重新检查') {
          //判断修改中是否有值 有值就用老数据
          if (!isEmpty(cloneData)) {
            setData(cloneData)
            recheckData && recheckData(cloneData)
          } else {
            setData(notData)
            recheckData && recheckData(notData)
          }
        }

        if (select.name === '已检查') {
          setData(notData)
        }

        if (select.name !== '已检查' && select.name !== '重新检查') {
          setData(notData)
        }
      }
      if (!isEmpty(renderData)) {
        setLoading(false)
        setColumnsList(renderData) //渲染结构
      }
    }
  }, [renderData, notData, select])

  //处理建值对
  const conversion = (data: any[]) => {
    //data 数据
    const obj: any = {}
    data.map((e: { sizeCode: string | number; qtyFinal: any }) => {
      //键名=建值
      obj[e.sizeCode] = e.qtyFinal
    })
    return obj
  }

  const sizeAssignment = (e) => {
    if (!isEmpty(e)) {
      return { ...conversion(e.produceCheckSizeVOList), ...e }
    }
  }
  //处理子项
  const subitemProcessing = (e) => {
    if (!isEmpty(e)) {
      const arr = e.map((v: any) => {
        v.id = v.materialCode
        v.key = v.id

        v.deliveredQty = v.deliveredQty === null ? 0 : v.deliveredQty //测试~~~已出库数量暂无 设置0
        v.availableStockQtyTotal =
          v.availableStockQtyTotal === null ? 0 : v.availableStockQtyTotal //测试~~~物料库存数量暂无 设置0
        // v.counteractNum = 0
        //物料缺少数量 计算
        v.shortOfProductNum =
          v.requireQuantity -
            v.availableStockQtyTotal -
            v.deliveredQty -
            v.counteractNum -
            v.deliveredQty >
          0
            ? v.requireQuantity -
              v.availableStockQtyTotal -
              v.deliveredQty -
              v.counteractNum -
              v.deliveredQty
            : 0

        v.enoughFlag = v.shortOfProductNum > 0 ? 0 : 1
        v = sizeAssignment(v) //获取尺码数量
        return v
      })
      return arr
    } else {
      return []
    }
  }
  //处理初始表格数据
  useEffect(() => {
    // 调取接口口添加 key和 counteractNum -半成品冲销数量的字段
    let defaultExpandedRow = []
    if (!isEmpty(initialData)) {
      initialData.map((item: any) => {
        item.deliveredQty = item.deliveredQty === null ? 0 : item.deliveredQty //测试~~~已出库数量暂无 设置0
        item.id = item.materialCode //id是 materialCode
        item.key = `${item.materialCode}8848` //添加 key
        defaultExpandedRow.push(item.key)
        // item.counteractNum = 0 //添加初始 冲销数量
        item.children = subitemProcessing(item.children) //处理子项
        item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
        item.enoughFlag = item.shortOfProductNum > 0 ? 0 : 1 //物料缺少数量-头
      })

      // setTime(initialData[0].bottomTime)

      setNotData([...initialData])
      setDefaultExpandedRow([...defaultExpandedRow])
    }
  }, [initialData])

  //计算总值
  const total = (count: any[], field: string) => {
    //count 数组
    //field 需要计算的字段
    const res = count.reduce((total: any, current: any) => {
      total += current[field]
      return total
    }, 0)
    return res
  }

  const onChange = (e: any, currentValue: any) => {
    // const cloneTime = getData.current.getData
    const cloneTime = notData
    processingData(cloneTime, moment(e).valueOf(), currentValue, 'time')
  }

  // let timeout: NodeJS.Timeout

  const quantity = (e: any, currentValue: any) => {
    // console.log('uef获取最新的值', getData.current.getData)
    // const cloneNumber = getData.current.getData
    const cloneNumber = notData

    processingData(cloneNumber, e, currentValue, 'number')
  }

  //**处理数据**
  const processingData = (
    current: any[],
    e: any,
    currentValue: any,
    type: any
  ) => {
    if (!isEmpty(current)) {
      current.map((item: any) => {
        if (item.key === `${currentValue.materialCode}8848`) {
          if (!isEmpty(item.children)) {
            item.children.map((v: any) => {
              // 先赋值

              if (v.id === currentValue.id) {
                if (type === 'number') {
                  v.counteractNum = Number(e)
                  //物料缺少数量-子
                  v.shortOfProductNum =
                    v.requireQuantity -
                      v.availableStockQtyTotal -
                      v.counteractNum -
                      v.deliveredQty >
                    0
                      ? v.requireQuantity -
                        v.availableStockQtyTotal -
                        v.counteractNum -
                        v.deliveredQty
                      : 0

                  v.enoughFlag = v.shortOfProductNum > 0 ? 0 : 1
                }
                if (type === 'time') {
                  v.prepareTime = e
                }
              }
              // 在累加
              item.counteractNum = total(item.children, 'counteractNum') //顶部数据
              item.shortOfProductNum = total(item.children, 'shortOfProductNum') //物料缺少数量-头
              item.enoughFlag = item.shortOfProductNum > 0 ? 0 : 1 //物料缺少数量-头
            })
          }
        }
      })
      current[0].bottomTime = getMaxTime(current) //添加物料齐套日期的时间
      let arr = cloneDeep(current)
      setNotData([...arr])

      //**判断是否选择 选择 所属工段 直接过滤显示
      if (sectionType.current.type === true) {
        const arrFilter = arr.filter(
          (item) => item.section === sectionType.current.id
        )
        setData([...arrFilter])
      }
      setCloneData([...arr]) //重新检查使用
    }
  }

  const show = (e, v) => {
    //e 是接口数据
    //v 重新数据
    if (select !== undefined) {
      if (select.name === '重新检查') {
        if (v.length >= 1) {
          return v
        } else {
          return e
        }
      } else {
        return e
      }
    }
  }
  //展开
  const onExpand = (e, v) => {
    const sum = cloneDeep(defaultExpandedRow)
    const subscript = sum.findIndex((item: any) => item === v.key)
    if (subscript !== -1) {
      sum.splice(subscript, 1)
      setDefaultExpandedRow([...sum])
    } else {
      sum.push(v.key)
      setDefaultExpandedRow([...sum])
    }
  }

  const FormData = (e: any) => {
    if (e.factoryId !== undefined) {
      sectionType.current = { type: true, id: e.factoryId }
      const cloneNotData = cloneDeep(notData)
      const arr = cloneNotData.filter((item) => item.section === e.factoryId)
      setData([...arr])
    } else {
      sectionType.current.type = false
      setData([...notData])
    }
  }

  const updateSection = (e) => {
    setSection([...e])
    let sum = []
    if (!isEmpty(e)) {
      e.forEach((item) => {
        sum.push(Number(item.value))
      })
    }
    let max = sum.sort().reverse()[0]
    setTime(max)
  }

  const disabledEndDate = (current: any, startTime: any) => {
    //sectionType 工段选中后 不再进行判断不可用时间
    return current && startTime && current < startTime
  }

  const materialDateBottom = (e) => {
    let arr = cloneDeep(data)
    arr[0].bottomTime = moment(e).valueOf()
    setData([...arr])
    setTime(moment(e).valueOf())
    setCloneData([...arr])
  }
  //获取最大值
  const displayTime = (v: any, i: any, section: any) => {
    //未选择工段
    if (sectionType.current.type === false) {
      let sum = []
      if (!isEmpty(section)) {
        section.forEach((item) => {
          sum.push(Number(item.value))
        })
      }
      let max = sum.sort().reverse()[0]

      let maxMaterialDate = max > i ? max : i
      if (maxMaterialDate === null) {
        return undefined
      } else {
        if (v !== null && v !== undefined) {
          if (v > maxMaterialDate) {
            return moment(v)
          } else {
            return moment(maxMaterialDate)
          }
        } else {
          return moment(maxMaterialDate)
        }
      }
    } else {
      let sum = []
      if (!isEmpty(section)) {
        section.forEach((item) => {
          sum.push(Number(item.value))
        })
      }
      let max = sum.sort().reverse()[0]
      // 展示数据不为空
      if (!isEmpty(data)) {
        let maxMaterialDate = max > getMaxTime(data) ? max : getMaxTime(data)
        return moment(maxMaterialDate)
      } else {
        return moment(max)
      }
    }
  }
  const setDisplayTime = (v, i, section) => {
    if (displayTime(v, i, section) === undefined) {
      return undefined
    } else {
      setMaterialDate(displayTime(v, i, section).valueOf())
      return displayTime(v, i, section)
    }
  }
  //底部
  const Dome = (e, data) => {
    const cloneData = cloneDeep(e)
    const value = cloneData.splice(2)
    if (!isEmpty(cloneData)) {
      return (
        <>
          <Table.Summary.Cell index={0}>物料齐套日期</Table.Summary.Cell>
          {value.map((_item, index) => (
            // eslint-disable-next-line react/jsx-key
            <Table.Summary.Cell
              key={index}
              index={index + 1}
            ></Table.Summary.Cell>
          ))}

          <Table.Summary.Cell index={e.length - 1}>
            <DatePicker
              disabled={true}
              allowClear={false}
              disabledDate={(current) =>
                disabledEndDate(current, getMaxTime(notData))
              }
              value={setDisplayTime(time, data[0].bottomTime, section)}
              onChange={(e) => {
                materialDateBottom(e)
              }}
            />
          </Table.Summary.Cell>
        </>
      )
    } else {
    }
  }

  return (
    <div>
      <div>
        <Forms
          type={whetherAvailable(select)}
          factoryData={section}
          FormData={FormData}
          data={data}
          updateSection={updateSection}
        ></Forms>
      </div>
      <Table
        expandedRowKeys={defaultExpandedRow}
        loading={loading}
        columns={columnsList}
        dataSource={data}
        rowKey={'key'}
        scroll={{ x: 1500, y: 300 }}
        onExpand={onExpand}
        summary={() => (
          <Table.Summary fixed>
            {!isEmpty(data) ? (
              <Table.Summary.Row>{Dome(columnsList, data)}</Table.Summary.Row>
            ) : null}
          </Table.Summary>
        )}
      />
    </div>
  )
}

export default FormTable
