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
  const { getTheSize, materialData } = practice
  const [list, setList] = useState<any>() //处理后的数据
  const [type, setType] = useState<any>() //top值
  const [tableList, setTableList] = useState<any>() //table的数据
  const [sizeList, setSizeList] = useState<any>() //table的尺码
  // const [params, setParams] = useState<any>({}) //table所有数据

  useEffect(() => {
    if (materialList && !isEmpty(materialList)) {
      setType(materialList[0].id)
    }
  }, [materialList])
  useEffect(() => {
    if (type !== undefined) {
      tableData(type)
    }
  }, [type])

  //获取table数据
  const tableData = async (id: any) => {
    //尺寸
    const resSize = await getTheSize({ externalProduceOrderId: 1 })
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
    const resData = await materialData({
      externalProduceOrderId: '1504272269944320002'
    })
    //处理数据---------------

    // ***js数组对象转键值对
    const conversion = (data: any[]) => {
      const obj: any = {}
      data.map((e: { sizeCode: string | number; quantity: any }) => {
        obj[e.sizeCode] = e.quantity
      })
      return obj
    }

    if (!isEmpty(resData.tableContent)) {
      const tableData = resData.tableContent
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
      setTableList(tableData)
    }

    //处理数据结束---------------

    // let res =await ()
    const analogData = [
      {
        id: '197',
        material: '8848',
        materialName: '牛仔服666',
        size: '',
        color: '',
        issuedQuantity: 30,
        S: 100,
        M: 100,
        L: 100,
        blue: 200,
        requireQuantity: 100,
        unit: '米',
        availableStockQtyTotal: 10,
        inTransitStockQtyTotal: 20,
        children: [
          {
            fatherID: '197', //父id
            id: '22',
            S: 30,
            M: 30,
            L: 30,
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,
            size: 'C001',
            color: '红色',
            blue: 50,
            unit: '米',
            availableStockQtyTotal: 5,
            inTransitStockQtyTotal: 10,
            requireQuantity: 50
          },
          {
            fatherID: '197', //父id
            id: '33',
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,

            size: 'C002',
            color: '蓝色',
            S: 30,
            M: 30,
            L: 30,
            blue: 30,
            unit: '米',
            availableStockQtyTotal: 3,
            inTransitStockQtyTotal: 5,

            requireQuantity: 30
          },
          {
            fatherID: '197', //父id
            id: '44',
            S: 40,
            M: 40,
            L: 40,
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,

            size: 'C003',
            color: '绿色',
            blue: 20,
            unit: '米',
            availableStockQtyTotal: 2,
            inTransitStockQtyTotal: 5,
            requireQuantity: 20
          }
        ]
      },
      {
        id: '272',
        material: '001',
        materialName: '牛仔服',
        issuedQuantity: 30,

        size: '',
        color: '',
        S: 100,
        M: 100,
        L: 100,
        blue: 200,
        requireQuantity: 100,
        unit: '米',
        availableStockQtyTotal: 10,
        inTransitStockQtyTotal: 20,
        children: [
          {
            fatherID: '272', //父id
            id: '222',
            S: 30,
            M: 30,
            L: 30,
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,

            size: 'C001',
            color: '红色',
            blue: 50,
            unit: '米',
            availableStockQtyTotal: 5,
            inTransitStockQtyTotal: 10,
            requireQuantity: 50
          },
          {
            fatherID: '272', //父id
            id: '333',
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,

            size: 'C002',
            color: '蓝色',
            S: 30,
            M: 30,
            L: 30,
            blue: 30,
            unit: '米',
            availableStockQtyTotal: 3,
            inTransitStockQtyTotal: 5,

            requireQuantity: 30
          },
          {
            fatherID: '272', //父id
            id: '444',
            S: 40,
            M: 40,
            L: 40,
            material: '001',
            materialName: '牛仔服',
            issuedQuantity: 10,

            size: 'C003',
            color: '绿色',
            blue: 20,
            unit: '米',
            availableStockQtyTotal: 2,
            inTransitStockQtyTotal: 5,
            requireQuantity: 20
          }
        ]
      }
    ]
    setSizeList(goodsSize)
    // setTableList(analogData)
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
  const confirm = () => {
    if (!isEmpty(list)) {
      const hangInTheAir = list.filter((item: any) => item.satisfy !== true) //长度为空才能关闭
      const sum: any = []
      hangInTheAir.map((item: any) => {
        sum.push(item.name)
      })
      message.warning(sum.join('、'))
    }
  }

  const callback = (key: any) => {
    console.log(key)
    setType(key)
    //点击获取table的数据，初始化展示第一条
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
                  index={index}
                  materialList={materialList}
                  analogData={tableList}
                  sizeList={sizeList}
                  dataReset={dataReset}
                />
              </TabPane>
            ))}
        </Tabs>
        ,
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
