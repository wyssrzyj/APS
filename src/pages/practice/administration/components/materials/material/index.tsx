/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, message, Modal, Tabs } from 'antd'
import { isEmpty } from 'lodash'
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

  //  table尺寸数据处理
  // const Table size processing=()=>{
  //   console.log(123);

  // }

  //获取table数据
  const tableData = async (id: any) => {
    //尺寸
    const resSize = await getTheSize({ externalProduceOrderId: 1 })
    const goodsSize: { title: any; dataIndex: any; key: any; width: number }[] =
      []
    resSize.map((item: any) => {
      goodsSize.push({
        title: item,
        dataIndex: item,
        key: item,
        width: 50
      })
    })
    const resData = await materialData({ externalProduceOrderId: 1 })
    //处理数据
    console.log(resData.tableContent)
    resData.tableContent.map((item) => {
      if (!isEmpty(item.children)) {
        console.log('子项', item.children)
      }
    })

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
        address: 100,
        company: '米',
        stock: 10,
        onTheWay: 20,
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
            company: '米',
            stock: 5,
            onTheWay: 10,
            address: 50
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
            company: '米',
            stock: 3,
            onTheWay: 5,

            address: 30
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
            company: '米',
            stock: 2,
            onTheWay: 5,
            address: 20
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
        address: 100,
        company: '米',
        stock: 10,
        onTheWay: 20,
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
            company: '米',
            stock: 5,
            onTheWay: 10,
            address: 50
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
            company: '米',
            stock: 3,
            onTheWay: 5,

            address: 30
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
            company: '米',
            stock: 2,
            onTheWay: 5,
            address: 20
          }
        ]
      }
    ]
    setSizeList(goodsSize)
    setTableList(analogData)
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
    console.log('修改后的值', e)

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
