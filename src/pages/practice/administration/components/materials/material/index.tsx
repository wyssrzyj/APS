/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, message, Modal, Tabs } from 'antd'
import Item from 'antd/lib/list/Item'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'
import login from '@/recoil/login'

import styles from './index.module.less'
import TabPanes from './tabPanes/index'

function Material(props: {
  materialModal: any
  setMaterialModal: any
  materialList: any
}) {
  const { materialModal, setMaterialModal, materialList } = props
  const { getTheSize, materialData, materialSaved, checked } = practice
  const [list, setList] = useState<any>() //处理后的数据
  const [tableList, setTableList] = useState<any>() //table的数据
  const [sizeList, setSizeList] = useState<any>() //table的尺码
  const [modifyData, setModifyData] = useState<any>() //修改的值-用于保存

  useEffect(() => {
    if (materialList && !isEmpty(materialList)) {
      tableData(materialList[0])
    }

    console.log('数据', materialList)
  }, [materialList])

  // ***js数组对象转键值对
  const conversion = (data: any[]) => {
    const obj: any = {}
    data.map((e: { sizeCode: string | number; quantity: any }) => {
      obj[e.sizeCode] = e.quantity
    })
    return obj
  }
  // *** table 数据处理
  const processData = (data: any) => {
    if (!isEmpty(data)) {
      const tableData = data
      // 父
      tableData.map(
        (item: { produceCheckSizeVOList: any[]; children: any[] }) => {
          item = Object.assign(item, conversion(item.produceCheckSizeVOList))
          //子
          if (!isEmpty(item.children)) {
            item.children.map((v: { produceCheckSizeVOList: any[] }) => {
              v = Object.assign(v, conversion(v.produceCheckSizeVOList))
            })
          }
        }
      )
      return tableData
    }
  }

  //获取table数据
  const tableData = async (data: any) => {
    console.log(data.checkStatus)

    //  未检查
    if (data.checkStatus === 2) {
      console.log('未检查')
      const resData = await materialData({
        externalProduceOrderId: '1503965241543753729'
      })
      setTableList(resData.splice(15))
    }
    //  已检查
    if (data.checkStatus === 1) {
      console.log('已检查')
      const resData = await checked({
        externalProduceOrderId: '1503965241543753729'
      })
      setTableList(resData.splice(15))
    }
    //table数据
    // if (!isEmpty(resData.tableContent)) {
    //   const processingComplete = processData(resData.tableContent)
    //   resData.list = processingComplete
    // }
    // setTableList(resData.list)

    //尺寸
    const resSize = await getTheSize({
      externalProduceOrderId: '1503965241543753729'
    })
    const goodsSize: {
      title: any
      dataIndex: any
      key: any
      align: string
      width: number
    }[] = []
    resSize.map((item: any) => {
      goodsSize.push({
        title: item.toUpperCase(),
        dataIndex: item.toUpperCase(),
        key: item.toUpperCase(),
        align: 'center',
        width: 50
      })
    })
    setSizeList(goodsSize)
  }

  const { TabPane } = Tabs
  const onCancel = () => {
    setMaterialModal(false)
  }
  const handleCancel = () => {
    setMaterialModal(false)
  }
  // 弹窗确认
  const handleOk = () => {
    setMaterialModal(false)
  }

  const dataReset = (e: any) => {
    console.log('保存的时候判读是否全部打钩', e)

    setList(e)
  }
  //确认
  const confirm = () => {
    meetConditions(modifyData)

    if (!isEmpty(list)) {
      const hangInTheAir = list.filter((item: any) => item.satisfy !== true) //长度为空才能关闭
      const sum: any = []
      hangInTheAir.map((item: any) => {
        sum.push(item.name)
      })
      message.warning(sum.join('、'))
    }
  }
  //切换保存
  const callback = (key: any) => {
    meetConditions(modifyData)
    //点击获取table的数据，初始化展示第一条
  }
  const switchSave = (e: any) => {
    console.log('数据已被修改~~~~~~~~', modifyData)
    setModifyData(e)
  }
  //判断是否满足保存条件
  const meetConditions = async (data: any[]) => {
    data.map((item) => {
      if (!isEmpty(item.children)) {
        item.save = meet(item.children)
      }
    })
    const allMeet = data.every((item) => item.save === true)
    //满足保存 不满足 提示
    if (allMeet === true) {
      console.log('可以走保存')
      const res = await materialSaved(data)
      console.log('保存是否成功', res)
    } else {
      console.log('没有填写完毕')
    }
  }
  const meet = (data: any[]) => {
    return data.every((item: any) => {
      return item.prepareTime !== null || item.enoughFlag !== false
    })
  }

  return (
    <div>
      <Modal
        width={1300}
        visible={materialModal}
        centered={true}
        footer={null}
        onCancel={onCancel}
      >
        <Tabs onChange={callback} type="card">
          {materialList &&
            materialList.map((item: any, index: any) => (
              <TabPane tab={item.name} key={item.id}>
                <TabPanes
                  switchSave={switchSave}
                  index={index}
                  materialList={materialList}
                  analogData={tableList}
                  sizeList={sizeList}
                  dataReset={dataReset}
                />
              </TabPane>
            ))}
        </Tabs>

        <div className={styles.bottom}>
          <Button type="primary" onClick={confirm}>
            确认
          </Button>
          <Button type="primary" ghost onClick={onCancel}>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Material
