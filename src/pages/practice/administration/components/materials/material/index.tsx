/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, message, Modal, Tabs } from 'antd'
import Item from 'antd/lib/list/Item'
import { cloneDeep, each, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { materialSetApis } from '@/recoil/apis'
import login from '@/recoil/login'

import styles from './index.module.less'
import TabPanes from './tabPanes/index'

function Material(props: {
  materialModal: any
  setMaterialModal: any
  materialList: any
  update: any
  refreshList: any
}) {
  const { materialModal, setMaterialModal, materialList, update, refreshList } =
    props
  const { getTheSize, materialData, materialSaved, checked } = materialSetApis

  const [selectedData, setSelectedData] = useState<any>([]) //外层 选中的数据
  const [tableList, setTableList] = useState<any>() //table的数据
  const [sizeList, setSizeList] = useState<any>([]) //table的尺码
  const [modifyData, setModifyData] = useState<any>() //修改的值-用于保存
  const [activeKey, setActiveKey] = useState<any>() //当前激活的key
  const [select, setSelect] = useState<any>() //当前选中的值
  const [recheck, setRecheck] = useState<any>() //重进检查
  useEffect(() => {
    if (materialList && !isEmpty(materialList)) {
      setSelectedData(materialList)
      setActiveKey(materialList[0].id)
      tableData(materialList[0])
    }
  }, [materialList])

  // 获取当前值
  useEffect(() => {
    if (!isEmpty(selectedData)) {
      const current = selectedData.filter(
        (item: { id: any }) => item.id === activeKey
      )[0]
      setSelect(current)
    }
  }, [activeKey, selectedData])

  // ***js数组对象转键值对
  const conversion = (data: any[]) => {
    const obj: any = {}
    data.map((e: { sizeCode: string | number; quantity: any }) => {
      obj[e.sizeCode] = e.quantity
    })
    return obj
  }

  //获取table接口数据 -只需要传当前项就可以
  const tableData = async (data: any) => {
    //  未检查
    if (data.checkStatus === 2) {
      const resData = await materialData({
        externalProduceOrderId: data.externalProduceOrderId,
        produceOrderNum: data.externalProduceOrderNum
      })
      console.log('未检查')

      setTableList(resData)
    }
    //  已检查.

    if (data.checkStatus === 1) {
      const resData = await checked({
        externalProduceOrderId: data.externalProduceOrderId,
        produceOrderNum: data.externalProduceOrderNum
      })
      console.log('已检查')
      //黄勇给的参数 我自己插入第一条数据中...
      //  resData.tableContent[0].bottomTime=
      setTableList(resData.tableContent)
    }
    //  重新检查 特殊处理-待定

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
    setSizeList([...goodsSize])
  }

  const { TabPane } = Tabs
  const onCancel = () => {
    setMaterialModal(false)
    setSizeList([])
    refreshList && refreshList()
  }
  const handleCancel = () => {
    setMaterialModal(false)
  }
  // 弹窗确认
  const handleOk = () => {
    setMaterialModal(false)
  }
  //判断是否满足保存条件
  const meetConditions = (data: any[]) => {
    //只要底部有时间就可以提交

    if (!isEmpty(data)) {
      if (data[0].bottomTime !== null) {
        return true
      } else {
        data.map((item) => {
          if (!isEmpty(item.children)) {
            item.save = meet(item.children)
          }
        })
        const allMeet = data.every((item) => item.save === true)
        console.log(allMeet)
        return allMeet
      }
    } else {
      return true
    }
  }
  //重新

  const meetConditionsAgain = (data: any[], type) => {
    //只要底部有时间就可以提交
    if (type === '已检查') {
      return true
    } else {
      if (!isEmpty(data)) {
        if (data[0].bottomTime !== null) {
          console.log(data)
          return true
        } else {
          data.map((item) => {
            if (!isEmpty(item.children)) {
              item.save = meet(item.children)
            }
          })
          const allMeet = data.every((item) => item.save === true)
          console.log(allMeet)
          return allMeet
        }
      } else {
        return false
      }
    }
  }

  //确认
  const confirm = async () => {
    const current = selectedData.filter(
      (item: { id: any }) => item.id === activeKey
    )[0]
    //重新检查保存
    if (current.name === '已检查' || current.name === '重新检查') {
      const type: any = meetConditionsAgain(recheck, current.name) //判断当前是否全部填写
      if (type === true) {
        if (current.name === '已检查') {
          setMaterialModal(false)
          update()
          setSizeList([])
        } else {
          selectedData[1].tableContent = recheck
          const res = await materialSaved(current)
          if (res) {
            refreshList && refreshList()
            setMaterialModal(false)
            update()
            setSizeList([])
            message.success('保存成功')
          }
        }
      } else {
        message.error('物料齐料日期未录入')
      }
      console.log('重新家产')
    } else {
      console.log('正常')
      save('2', activeKey)
    }
  }

  //切换
  const callback = async (key: any) => {
    save('1', key)
  }
  //未检查修改为已检查
  const uncheckedModification = () => {
    const cloneSelectedData = cloneDeep(selectedData)

    cloneSelectedData.map((item) => {
      if (item.id === activeKey) {
        item.checkStatus = 1
      }
    })
    setSelectedData(cloneSelectedData)
  }

  //保存
  const added = async (current: any, next: any, methods: any, key: any) => {
    const type: any = meetConditions(modifyData) //判断当前是否全部填写
    if (type === true) {
      //确认保存
      current.tableContent = modifyData
      // const externalProduceOrderId = materialList.externalProduceOrderId //添加
      const res = await materialSaved(current)
      if (res) {
        //更改数据
        uncheckedModification()
        if (methods === '确认') {
          //先刷新在关闭
          refreshList && refreshList()
          setMaterialModal(false)
          update()
          setSizeList([])
          message.success('保存成功')
        }
        if (methods === '切换') {
          setActiveKey(key)
          tableData(next)
        }
      }
    } else {
      message.error('物料齐料日期未录入')
    }
  }

  const save = async (state: string, key: string) => {
    //   确认
    if (state === '2') {
      // 确认 满足才走接口
      const current = selectedData.filter(
        (item: { id: any }) => item.id === activeKey
      )[0]
      // 下一个
      const next = selectedData.filter(
        (item: { id: any }) => item.id === key
      )[0]
      added(current, next, '确认', key)
    }

    //切换
    if (state === '1') {
      //当前
      const current = selectedData.filter(
        (item: { id: any }) => item.id === activeKey
      )[0]

      // 下一个
      const next = selectedData.filter(
        (item: { id: any }) => item.id === key
      )[0]

      //重新检查
      if (selectedData[0].review) {
        // 值 重新不需要走保存
        if (next.name === '重新检查' || next.name === '已检查') {
          setActiveKey(key)
          tableData(next)
        } else {
          console.log('重新检查')
          added(current, next, '切换', key)
        }
      } else {
        added(current, next, '切换', key)
      }
    }
  }

  const meet = (data: any[]) => {
    return data.every((item: any) => {
      return item.enoughFlag !== 0
    })
  }

  useEffect(() => {
    if (!isEmpty(tableList)) {
      const sum = []
      tableList.map((item) => {
        sum.push(item.children)
      })
    }
  }, [tableList])
  const switchSave = (e: any) => {
    setModifyData(e)
  }

  const setRecheckData = (e: any) => {
    setRecheck(e)
  }

  return (
    <div>
      <Modal
        width={1300}
        closable={false}
        visible={materialModal}
        centered={true}
        footer={null}
        destroyOnClose={true}
        maskClosable={false}
        onCancel={onCancel}
      >
        <Tabs onChange={callback} type="card" activeKey={activeKey}>
          {selectedData &&
            selectedData.map((item: any, index: any) => (
              <TabPane tab={item.name} key={item.id}>
                <TabPanes
                  setRecheckData={setRecheckData}
                  select={select}
                  switchSave={switchSave}
                  index={index}
                  materialList={selectedData}
                  analogData={tableList}
                  sizeList={sizeList}
                  // dataReset={dataReset}
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
