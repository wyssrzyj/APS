import { TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SorterResult } from 'antd/lib/table/interface'
import { cloneDeep } from 'lodash'
import { Key, useEffect, useRef, useState } from 'react'

import { getTreeData } from '@/utils/tool'

type Target = {
  pageNum?: number
  pageSize?: number
  condition?: any
  [key: string]: any
}

const useTableChange = (
  params: Target,
  getData: (params: any) => any,
  type?: string,
  required: string[] = [] // params中满足必选参数才发起请求
) => {
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [sorterField, setSorterField] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [pageNum, setPageNum] = useState<number>(params.pageNum || 1)
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const keys = Reflect.ownKeys(params)
      const flag = required.every((item) => keys.includes(item))
      flag && (await getDataList())
    })()
  }, [params, pageNum, pageSize, sorterField, order])

  useEffect(() => {
    setPageNum(1)
    setPageSize(10)
  }, [params])

  const getDataList = async () => {
    setLoading(true)
    let target: Target = {}
    target.pageNum = pageNum
    target.pageSize = pageSize
    const keys = Reflect.ownKeys(params)

    if (keys.length > 0) {
      target = { ...params, ...target }
    }
    let res = await getData(target)

    if (Array.isArray(res)) {
      setTotal(res.length)
      setDataSource(res)
      return
    }
    res = res || {}
    const { list = [], total = 0, records = [] } = res
    // const nData = cloneDeep(dataSource)

    if (type === 'tree' && records) {
      const treeData = getTreeData(list)
      setTotal(treeData.length)
      setDataSource(treeData)
    }

    if (type !== 'tree' && records) {
      setTotal(total)
      setDataSource(records)
      // if (pageNum === 1) {
      //   setDataSource(records)
      // } else {
      //   setDataSource([...nData, ...records])
      // }
    }
    setLoading(false)
  }

  const tableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    const { current, pageSize } = pagination
    setPageNum(current as number)
    setPageSize(pageSize as number)
    const { field, order } = sorter as SorterResult<any>
    setSorterField(field as string)
    setOrder(order as string)
  }

  const changeData = (field: string, value: any, idx: number | Key) => {
    const newData = cloneDeep(dataSource)
    newData[idx][field] = value
    setDataSource(newData)
  }

  return {
    tableChange,
    dataSource,
    total,
    sorterField,
    order,
    pageNum,
    pageSize,
    getDataList,
    changeData,
    loading
  }
}

export default useTableChange
