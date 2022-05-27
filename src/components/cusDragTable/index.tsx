import { FunnelPlotOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, Table } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import classNames from 'classnames'
import { cloneDeep, debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

import styles from './index.module.less'

type Column = Partial<{
  label: string
  value: string | number
  width: string | number
  title: any
  draggable: boolean
  align: string
  show: boolean
  dataIndex: string
  [key: string]: any
}>

const DropContent = (props: {
  initData?: Column[] | undefined
  callback: (params: Column[]) => void
}) => {
  const { initData = [], callback } = props

  const [dragIdx, setDragIdx] = useState<number>(0)

  const onChange = (event: CheckboxChangeEvent, index: number) => {
    const nData = cloneDeep(initData)
    nData[index]['show'] = event.target.checked
    callback && callback(nData)
  }

  const dragStart = (index: number) => {
    setDragIdx(index)
  }

  const drop = (index: number) => {
    const nData = cloneDeep(initData)
    const startItem = nData[dragIdx]
    const changeItem = nData[index]
    nData[dragIdx] = changeItem
    nData[index] = startItem
    callback && callback(nData)
  }

  return (
    <div className={styles.dropDownContainer}>
      {[...initData].map((item: Column, index: number) => (
        <div
          className={classNames(
            styles.dropDownItem,
            item.fixed || !item.draggable ? styles.hiddenDrop : ''
          )}
          key={`${item.value}-${index}`}
          draggable={item.draggable}
          onDragStart={() => dragStart(index)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => drop(index)}
        >
          <Checkbox
            onChange={(event) => onChange(event, index)}
            checked={item.show}
          >
            {item.label}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}

type CusTableProps = {
  columns: Column[]
  minWidth?: number
  container?: React.RefObject<HTMLElement>
  /* 表格缓存的字段名 */
  storageField: string
  [key: string]: any
  noNeedDropdown?: boolean
}

/**
 *
 * @param props
 * @field container: 表格外层容器
 * @field minWidth: 表格列最小宽度
 * @field columns: show 控制表头是否显示 默认true
 * @field columns: draggable 控制表头是否可拖拽
 * @field columns: fixed 有固定属性的表头不会出现在自定义表头中
 * @returns
 */
const CusDragTable = (props: CusTableProps) => {
  const {
    columns = [],
    minWidth = 80,
    // container,
    cusBarLeft,
    cusBarRight,
    storageField,
    noNeedDropdown,
    noBtn,
    ...rest
  } = props

  const [initColumns, setInitColumns] = useState<any[]>([])

  useEffect(() => {
    // 初始化 label value show draggable字段
    const storageColumns =
      JSON.parse(localStorage.getItem(storageField) as string) || []

    const init = storageColumns.length
      ? storageColumns.map((column: Column) => {
          const target: Column =
            columns.find((i) => i.dataIndex === column.value) || {}
          const keys = Reflect.ownKeys(target)
          const storageKeys = Reflect.ownKeys(column)

          target.label = target.title
          target.value = target.dataIndex
          target.width = column.width

          if (storageKeys.includes('show')) {
            target.show = column.show
          } else if (!keys.includes('show')) {
            target.show = true
          }
          if (storageKeys.includes('draggable')) {
            target.draggable = column.draggable
          } else if (!keys.includes('draggable')) {
            target.draggable = true
          }
          return target
        })
      : columns.map((item) => {
          const keys = Reflect.ownKeys(item)
          item.label = item.title
          item.value = item.dataIndex
          if (!keys.includes('show')) {
            item.show = true
          }
          if (!keys.includes('draggable')) {
            item.draggable = true
          }
          return item
        })
    setInitColumns(init)
  }, [])

  const tableRef = useRef<any>()
  const moveRef = useRef<Record<string, any>>({
    columns: initColumns
  })

  const [cusColumns, setCusColumns] = useState<any[]>([])
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    // 处理可拖拽的title
    const res = dealColumns(initColumns)
    moveRef.current.columns = cloneDeep(res)
    setCusColumns(cloneDeep(res))
  }, [initColumns])

  const dealColumns = (data: Column[]) => {
    return [...data].map((item: Column, index: number) => {
      if (item && item.draggable) {
        item.title = (
          <div className={styles.tableTitle} key={item.label}>
            {item['label']}
            <div
              key={item.dataIndex}
              className={classNames(
                'dragIcon',
                styles.tableTitleResizeRight,
                index === data.length - 1
                  ? styles.tableTitleResizeRightLast
                  : ''
              )}
              onMouseDown={(event) => mouseDown(event, item)}
            ></div>
          </div>
        )
      }
      return item
    })
  }

  const mouseDown = (event: any, target: Column) => {
    const index = moveRef.current.columns.findIndex(
      (item: any) => item.value === target.value
    )
    // 获取点击列的真实列宽
    const parentNodeWidth = event.target.parentNode.parentNode.clientWidth
    // 获取鼠标点击时的开始位置
    moveRef.current.startX = event.pageX
    // 获取鼠标点击时的列宽
    moveRef.current.startWidth =
      moveRef.current['columns'][index]['width'] || parentNodeWidth
    moveRef.current.index = index

    setTimeout(() => {
      // 开始拖拽
      moveRef.current.startFlag = true
    })
  }

  const mouseUp = () => {
    // 结束拖拽
    moveRef.current.startFlag = false
    const nData = cloneDeep(moveRef.current.columns)

    if (
      moveRef.current.index > -1 &&
      typeof nData[moveRef.current.index] === 'object'
    ) {
      const keys = Reflect.ownKeys(nData[moveRef.current.index])

      if (keys.includes('sorter')) {
        nData[moveRef.current.index]['sorter'] = true
      }
    }

    moveRef.current.columns = cloneDeep(nData)
    setCusColumns(cloneDeep(nData))
  }

  const mouseMove = debounce((event: any) => {
    event.preventDefault()
    if (!moveRef.current.startFlag) return

    const moveX = event.pageX - moveRef.current.startX

    const nData = cloneDeep(moveRef.current.columns)
    // 列宽处理 列开始宽度 + 移动宽度
    // 列最小宽度设置为 minWidth 默认为80
    const dynamicWidth = moveRef.current.startWidth + moveX

    const keys = Reflect.ownKeys(nData[moveRef.current.index])

    if (keys.includes('sorter')) {
      nData[moveRef.current.index]['sorter'] = false
    }

    nData[moveRef.current.index]['width'] =
      dynamicWidth < minWidth ? minWidth : dynamicWidth

    setCusColumns(cloneDeep(nData))
    moveRef.current.columns = cloneDeep(nData)
    localStorage.setItem(storageField, JSON.stringify(nData))
  }, 0)

  useEffect(() => {
    const target = document.body

    if (moveRef.current) {
      target.addEventListener('mouseup', mouseUp)
      target.addEventListener('mousemove', mouseMove)
      target.addEventListener('mouseleave', mouseUp)
    }
    return () => {
      target.removeEventListener('mouseup', mouseUp)
      target.removeEventListener('mousemove', mouseMove)
      target.removeEventListener('mouseleave', mouseUp)
    }
  }, [moveRef.current])

  const onHeadChange = () => {
    setDisplay(true)
  }

  const onVisibleChange = (flag: boolean) => {
    setDisplay(flag)
  }

  const callback = (data: Column[]) => {
    const newData = [...dealColumns(data)]
    moveRef.current.columns = cloneDeep(newData)
    setCusColumns(cloneDeep(newData))
    localStorage.setItem(storageField, JSON.stringify(newData))
  }

  return (
    <div className={styles.cusMoveTableBox}>
      <div className={noBtn ? '' : styles.tableBtnBox}>
        <div className={styles.tableBtnBoxLeft}>
          {cusBarLeft && cusBarLeft()}
        </div>
        <div className={styles.tableBtnBoxRight}>
          {cusBarRight && cusBarRight()}
          {!noNeedDropdown && (
            <Dropdown
              visible={display}
              onVisibleChange={onVisibleChange}
              overlay={() => (
                <DropContent
                  initData={cusColumns}
                  callback={callback}
                ></DropContent>
              )}
              arrow
              trigger={['click']}
            >
              <Button onClick={onHeadChange} icon={<FunnelPlotOutlined />}>
                自定义表头
              </Button>
            </Dropdown>
          )}
        </div>
      </div>

      <Table
        size={'small'}
        ref={tableRef}
        columns={cusColumns.filter((item: any) => item && item.show)}
        {...rest}
      ></Table>
    </div>
  )
}

export default CusDragTable
