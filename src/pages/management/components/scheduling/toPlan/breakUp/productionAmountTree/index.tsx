/*
 * @Author: lyj
 * @Date: 2022-07-14 09:31:58
 * @LastEditTime: 2022-07-15 10:55:05
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Tabs, Tree } from 'antd'
import { cloneDeep, indexOf, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const { TabPane } = Tabs
const ProductionAmountTree = (props) => {
  const { selectSplitQuantity, row, allSelected, split } = props

  const [colorDataList, setColorDataList] = useState<any>([]) //颜色
  const [sizeDataList, setSizeDataList] = useState<any>([]) //尺码

  const [selectedItem, setSelectedItem] = useState<any>([]) //当前选中项
  const [currentlyUnavailable, setCurrentlyUnavailable] = useState<any>([]) //所有选中的

  useEffect(() => {
    //拆分类型切换 清空当前选中 、所有选中的
    setSelectedItem([''])
    setCurrentlyUnavailable([])
  }, [split])

  useEffect(() => {
    setCurrentlyUnavailable(allSelected) //拆分类型切换 清空选中
  }, [allSelected])

  // 字段更改
  const fieldChange = (data, type) => {
    const subitems = []
    data.map((item) => {
      item.title = item.colorName !== undefined ? item.colorName : item.sizeName
      item.key = item.colorCode !== undefined ? item.colorCode : item.sizeName
      item.children = item.skuDataList
      if (!isEmpty(item.skuDataList)) {
        item.skuDataList.map((v) => {
          subitems.push(v)
          // v.disabled = true
          v.title = type === '1' ? v.sizeName : v.colorName
          v.key = v.id
        })
      }
    })
    return data
  }
  const addUnavailableStatus = (data, available) => {
    const cloneData = cloneDeep(data)
    //子项选中后状态设置为不可用
    available.forEach((c) => {
      cloneData.map((item) => {
        item.children.map((v) => {
          if (v.id == c) {
            v.disabled = true
          }
        })
      })
    })
    // 子项全部设置为不可用后 父级设置为不可用
    cloneData.map((item) => {
      item.disabled = item.children.every((item: any) => {
        return item.disabled === true
      })
    })
    return cloneData
  }
  const getNotAvailable = (e, v) => {
    //返回 总部可用中非当前选中的
    const sum = []
    if (!isEmpty(e)) {
      if (!isEmpty(v)) {
        v.forEach((item) => {
          if (e?.indexOf(item) === -1) {
            sum.push(item)
          }
        })
      }
      return sum
    } else {
      return v
    }
  }
  useEffect(() => {
    const available = getNotAvailable(row.selectedItem, currentlyUnavailable) //获取当前不可用

    const colorDataList = fieldChange(row.tree.colorData.colorDataList, '1') //处理字段
    const sizeDataList = fieldChange(row.tree.sizeData.sizeDataList, '2') //处理字段

    setColorDataList(addUnavailableStatus(colorDataList, available))
    setSizeDataList(addUnavailableStatus(sizeDataList, available))
  }, [currentlyUnavailable, row])

  const onCheck: any['onCheck'] = (checkedKeys, info) => {
    setSelectedItem(checkedKeys)
  }

  //展示当前的值
  const showValue = (item) => {
    if (item.split === '1') {
      if (!isEmpty(colorDataList)) {
        return colorDataList
      }
    }
    if (item.split === '2') {
      if (!isEmpty(sizeDataList)) {
        return sizeDataList
      }
    }
  }

  //获取所有子项的总合
  const getAllChildren = (data) => {
    let sum = 0
    const AllChildren: any = []
    data.forEach((item) => {
      item.skuDataList.forEach((v) => {
        AllChildren.push(v)
      })
    })

    selectedItem.forEach((item) => {
      const filterData = AllChildren.filter((s) => s.id === item)
      if (!isEmpty(filterData)) {
        sum += Number(filterData[0].productionNum)
      }
    })

    return sum
  }

  //保存
  const preservation = (item) => {
    if (item.split === '1') {
      if (!isEmpty(colorDataList)) {
        // 添加不可用状态
        // row.tree.colorData.colorDataList = addUnavailableStatus(colorDataList) //添加状态
        row.selectedItem = selectedItem //添加选中项
        row.type = false
        //选中的总数
        const sum = getAllChildren(colorDataList)
        selectSplitQuantity(sum, row, selectedItem)
      }
    }
    if (item.split === '2') {
      if (!isEmpty(sizeDataList)) {
        // row.tree.sizeData.sizeDataList = addUnavailableStatus(sizeDataList) //添加状态

        row.selectedItem = selectedItem
        row.type = false

        const sum = getAllChildren(sizeDataList)
        selectSplitQuantity(sum, row, selectedItem)
      }
    }
  }

  return (
    <div className={styles.productionAmountTree}>
      <Tree
        height={200}
        checkedKeys={selectedItem}
        checkable
        onCheck={onCheck}
        treeData={showValue(props)}
      />
      <Button
        className={styles.productionAmountButton}
        type="primary"
        onClick={() => {
          preservation(props)
        }}
      >
        确定
      </Button>
    </div>
  )
}

export default ProductionAmountTree
