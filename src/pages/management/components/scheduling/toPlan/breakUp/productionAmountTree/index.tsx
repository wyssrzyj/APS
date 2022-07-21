/*
 * @Author: lyj
 * @Date: 2022-07-14 09:31:58
 * @LastEditTime: 2022-07-21 18:21:35
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Tabs, Tree } from 'antd'
import { cloneDeep, indexOf, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import styles from './index.module.less'

const { TabPane } = Tabs
const ProductionAmountTree = (props) => {
  const { selectSplitQuantity, row, allSelected, split, initial, setInitial } =
    props

  const [colorDataList, setColorDataList] = useState<any>([]) //颜色
  const [sizeDataList, setSizeDataList] = useState<any>([]) //尺码

  const [selectedItem, setSelectedItem] = useState<any>([]) //当前选中项
  const [currentlyUnavailable, setCurrentlyUnavailable] = useState<any>([]) //所有选中的

  useEffect(() => {
    setCurrentlyUnavailable(allSelected)
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
    if (!isEmpty(available)) {
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
    } else {
      return data
    }
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
        return sum
      } else {
        return []
      }
    } else {
      return v
    }
  }

  useEffect(() => {
    setSelectedItem(row.selectedItem)

    try {
      const available = getNotAvailable(row.selectedItem, currentlyUnavailable) //获取当前不可用

      const colorDataList = fieldChange(row.tree.colorData.colorDataList, '1') //处理字段
      const sizeDataList = fieldChange(row.tree.sizeData.sizeDataList, '2') //处理字段

      setColorDataList(addUnavailableStatus(colorDataList, available)) //状态更改成不可用 传递出去
      setSizeDataList(addUnavailableStatus(sizeDataList, available))
    } catch (error) {}
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
  //获取子项
  const getChildren = (subitem, all, data) => {
    const cloneAll = cloneDeep(all)
    subitem.forEach((item) => {
      const susa = cloneAll.indexOf(item)
      if (susa !== -1) {
        cloneAll.splice(susa, 1)
      }
    })
    // cloneAll //所有选中的子项的集合

    const childrenContainer = [] //所有子项的数据
    data.forEach((item) => {
      childrenContainer.push(item.children)
    })
    const list = childrenContainer.flat(Infinity)

    const container = []
    cloneAll.forEach((item) => {
      const susa = list.findIndex((v) => v.id === item)
      if (susa !== -1) {
        container.push(list[susa])
      }
    })
    return container
  }

  //保存
  const preservation = (item) => {
    setInitial({ name: 'afterOperation' })
    if (item.split === '1') {
      if (!isEmpty(colorDataList)) {
        const parentID = []
        colorDataList.forEach((item) => {
          parentID.push(item.key)
        })

        row.selectedItem = selectedItem //添加选中项
        row.skuList = getChildren(parentID, selectedItem, colorDataList) //保存需要的子项
        row.skuType = '1'
        row.type = false
        //选中的总数
        const sum = getAllChildren(colorDataList)
        selectSplitQuantity(sum, row, selectedItem)
      }
    }
    if (item.split === '2') {
      if (!isEmpty(sizeDataList)) {
        const parentID = []
        sizeDataList.forEach((item) => {
          parentID.push(item.key)
        })
        row.skuList = getChildren(parentID, selectedItem, sizeDataList) //保存需要的子项
        row.skuType = '2'
        row.selectedItem = selectedItem
        //保存需要的子项
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
