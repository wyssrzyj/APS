/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, message, Modal, Tabs } from 'antd'
import Item from 'antd/lib/list/Item'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { materialSetApis } from '@/recoil/apis'
import login from '@/recoil/login'

import styles from './index.module.less'
import TabPanes from './tabPanes/index'

function Material(props: {
  materialModal: any
  setMaterialModal: any
  materialList: any
}) {
  const { materialModal, setMaterialModal, materialList } = props
  const { getTheSize, materialData, materialSaved, checked } = materialSetApis
  const [list, setList] = useState<any>() //处理后的数据
  const [tableList, setTableList] = useState<any>() //table的数据
  const [sizeList, setSizeList] = useState<any>() //table的尺码
  const [modifyData, setModifyData] = useState<any>() //修改的值-用于保存
  const [activeKey, setActiveKey] = useState<any>() //当前激活的key
  const [select, setSelect] = useState<any>() //当前选中的值

  useEffect(() => {
    if (materialList && !isEmpty(materialList)) {
      setActiveKey(materialList[0].id)
      tableData(materialList[0])
      setSelect(materialList[0])
    }
  }, [materialList])

  // ***js数组对象转键值对
  const conversion = (data: any[]) => {
    const obj: any = {}
    data.map((e: { sizeCode: string | number; quantity: any }) => {
      obj[e.sizeCode] = e.quantity
    })
    return obj
  }

  //获取table数据 -只需要传当前项就可以
  const tableData = async (data: any) => {
    //  未检查
    if (data.checkStatus === 2) {
      const resData = await materialData({
        externalProduceOrderId: data.externalProduceOrderId,
        produceOrderNum: data.externalProduceOrderNum
      })

      setTableList(resData)
    }
    //  已检查.

    if (data.checkStatus === 1) {
      const resData = await checked({
        externalProduceOrderId: data.externalProduceOrderId,
        produceOrderNum: data.externalProduceOrderNum
      })
      setTableList(resData.tableContent)
    }
    //  重新检查
    if (data.checkStatus === 3) {
      //已检查
      if (data.type === 1) {
        const resData = await checked({
          externalProduceOrderId: data.externalProduceOrderId,
          produceOrderNum: data.externalProduceOrderNum
        })

        setTableList(resData.tableContent)
      }
      if (data.type === 2) {
        //重新检查
        const resData = await materialData({
          externalProduceOrderId: data.externalProduceOrderId,
          produceOrderNum: data.externalProduceOrderNum
        })
        setTableList(resData)
      }
    }

    //尺寸
    const resSize = await getTheSize({
      externalProduceOrderId: data.externalProduceOrderId
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
    setList(e)
  }
  //确认
  const confirm = () => {
    save('2', activeKey)
  }

  //切换
  const callback = async (key: any) => {
    save('1', key)
  }

  //保存
  const added = async (current: any, methods: any, key: any) => {
    const type: any = meetConditions(modifyData)
    if (type === true) {
      //确认保存
      current.tableContent = modifyData
      // const externalProduceOrderId = materialList.externalProduceOrderId //添加

      const res = await materialSaved(current)
      if (res) {
        if (methods === '确认') {
          setMaterialModal(false)
        }
        if (methods === '切换') {
          setActiveKey(key)
          tableData(current)

          //给数据
        }
      }
    } else {
      message.error('数据未添加完毕')
    }
  }

  const save = async (state: string, key: string) => {
    //   确认
    if (state === '2') {
      // 确认 满足才走接口
      const current = materialList.filter(
        (item: { externalProduceOrderId: any }) =>
          item.externalProduceOrderId === key
      )[0]
      added(current, '确认', key)
    }
    //切换
    if (state === '1') {
      const current = materialList.filter(
        (item: { id: any }) => item.id === key
      )[0]
      console.log('过滤出来的数据', key)
      console.log('过滤出来的数据', current)

      if (current !== undefined) {
        setSelect(current)
      } else {
        setSelect(materialList[0])
      }

      if (activeKey === '1314520') {
        //重新计划的已减产 不需要判断是否填写
        setActiveKey(key)
        tableData(current)
      } else {
        added(current, '切换', key)
      }
    }
  }
  const switchSave = (e: any) => {
    setModifyData(e)
  }

  //判断是否满足保存条件
  const meetConditions = (data: any[]) => {
    data.map((item) => {
      if (!isEmpty(item.children)) {
        item.save = meet(item.children)
      }
    })
    const allMeet = data.every((item) => item.save === true)

    return allMeet
  }

  const meet = (data: any[]) => {
    return data.every((item: any) => {
      return item.prepareTime !== null || item.enoughFlag !== 0
    })
  }

  return (
    <div>
      <Modal
        width={1300}
        visible={materialModal}
        centered={true}
        footer={null}
        maskClosable={false}
        onCancel={onCancel}
      >
        <Tabs onChange={callback} type="card" activeKey={activeKey}>
          {materialList &&
            materialList.map((item: any, index: any) => (
              <TabPane tab={item.name} key={item.id}>
                <TabPanes
                  select={select}
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
