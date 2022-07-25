import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Tag } from 'antd'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { CusDragTable, SearchBar } from '@/components'
import { workOvertimeApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { searchConfigs, tableColumns } from './conifgs'
import Forms from './forms'
import styles from './index.module.less'
import Popup from './popup'

function Overtime() {
  const { confirm } = Modal
  const {
    overtimedisplay,
    workOvertimeMov,
    overtimeDetails,
    factoryList,
    teamList
  } = workOvertimeApis
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: 10
  })
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState<any>() //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [edit, setEdit] = useState({}) //编辑数据
  const [factoryData, setFactoryData] = useState<any>([]) //工厂
  const [facList, setFacList] = useState([]) // 选中的值

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, overtimedisplay)

  tableColumns[tableColumns.length - 1].render = (_value: any, row: any) => {
    return (
      <div className={styles.flex}>
        <div
          className={styles.operation_item}
          onClick={() => editUser(false, row)}
        >
          查看
        </div>
        <div className={styles.operation} onClick={() => editUser(true, row)}>
          编辑
        </div>
      </div>
    )
  }

  tableColumns[1].render = (value: string, row: any) => {
    const chars = value !== null ? value.split(',') : []
    return (
      <div>
        {chars.map(
          (
            item:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined,
            index: any | null | undefined
          ) => (
            // eslint-disable-next-line react/jsx-key
            <Tag key={index}>{item}</Tag>
          )
        )}
      </div>
    )
  }
  tableColumns[2].render = (value: string, row: any) => {
    // const chars = value.split(',')
    const chars = value !== null ? value.split(',') : []

    return (
      <div>
        {chars.map(
          (
            item:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined,
            index: any | null | undefined
          ) => (
            // eslint-disable-next-line react/jsx-key
            <Tag key={index}>{item}</Tag>
          )
        )}
      </div>
    )
  }
  tableColumns[3].render = (value: string, row: any) => {
    const chars = value.split(',')
    return (
      <div className={styles.flex}>
        {chars.map(
          (
            item:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined,
            index: any | null | undefined
          ) => (
            <Tag key={index}>{item}</Tag>
          )
        )}
      </div>
    )
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res: any = await factoryList()
    const arr: any = res.data
    if (res.code === 200) {
      arr.map((item: any) => {
        item.label = item.deptName
        item.value = item.id
      })
      setFacList(arr)
      setFactoryData(arr)
    }
  }

  const newlyAdded = async () => {
    getDataList && getDataList()
  }

  //头部form的数据
  const FormData = (e: any) => {
    if (e.factoryId !== undefined) {
      setParams({ pageNum: 1, pageSize, ...e })
    } else {
      setParams({ pageNum, pageSize, ...e })
    }
  }

  const editUser = async (type: boolean, value: any) => {
    const arr = await overtimeDetails({ id: value.id })
    setEdit(arr)
    if (type === true) {
      setType(2)
      setIsModalVisible(true)
    } else {
      setType(3)
      setIsModalVisible(true)
    }
  }
  //删除.
  const start = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      showDeleteConfirm()
    }
  }
  const movApi = async () => {
    await workOvertimeMov({ idList: selectedRowKeys })
    setSelectedRowKeys([])
    newlyAdded()
  }
  const onSelectChange = (selectedRowKeys: React.SetStateAction<never[]>) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const rowSelection:
    | {
        selectedRowKeys: never[]
        onChange: (selectedRowKeys: React.SetStateAction<never[]>) => void
      }
    | any = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const executionMethod = () => {
    setType(1)
    setIsModalVisible(true)
  }

  const showDeleteConfirm = () => {
    confirm({
      title: '确认删除选中项?',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除',
      okType: 'danger',
      centered: true,
      onOk() {
        movApi()
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const content = {
    isModalVisible,
    setIsModalVisible,
    type,
    edit,
    factoryData,
    setEdit
  }
  const TableLeft = () => {
    return (
      <>
        <Button
          className={styles.executionMethod}
          type="primary"
          onClick={executionMethod}
        >
          新增
        </Button>
        <Button type="primary" danger onClick={start}>
          删除
        </Button>
      </>
    )
  }
  //---替换----开始-
  const searchFactoryChange = () => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    setConfigs(nConfigs)
  }
  useEffect(() => {
    searchFactoryChange()
  }, [facList])

  const changeTeamConfig = async (factoryId?: string) => {
    const nConfigs: any[] = cloneDeep(configs)
    const list: any = factoryId ? await teamList({ factoryId }) : [] //班组数据
    list.forEach((item: any) => {
      item.label = item.teamName
      item.value = item.id
    })
    nConfigs[1]['options'] = list

    setConfigs(nConfigs)
  }

  const paramsChange = (values: Record<string, any>) => {
    const oldParams = cloneDeep(params)
    if (oldParams.factoryId !== values.factoryId) {
      values.teamId = undefined
      changeTeamConfig(values.factoryId)
    }
    setParams({ ...values })
  }
  //---替换----结束-..
  return (
    <div className={styles.qualification}>
      <div>
        <div className={styles.content}>
          <SearchBar
            configs={configs}
            params={params}
            callback={paramsChange}
          ></SearchBar>

          <CusDragTable
            storageField={'overtime'}
            cusBarLeft={TableLeft}
            rowSelection={rowSelection}
            columns={tableColumns}
            dataSource={dataSource}
            rowKey={'id'}
            // scroll={{ x: 2000, y: '60vh' }}
            loading={loading}
            onChange={tableChange}
            bordered={true} //边框线
            pagination={{
              //分页
              showSizeChanger: true,
              // showQuickJumper: true, //是否快速查找
              pageSize: pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              // position: ['bottomCenter'], //居中
              pageSizeOptions: ['10', '20', '50']
            }}
          />

          <Popup content={content} newlyAdded={newlyAdded} />
        </div>
      </div>
    </div>
  )
}

export default Overtime
