import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SorterResult } from 'antd/lib/table/interface'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'

import { CusDragTable, SearchBar, Title } from '@/components'
import { practice } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import AddModal from './addModal'
import { searchConfigs, tableColumns } from './conifgs'
import styles from './index.module.less'
const { confirm } = Modal
const {
  efficiencyList,
  efficiencyInfo,
  factoryList,
  teamList,
  deleteEfficiencyInfo
} = practice

function Rule() {
  tableColumns[tableColumns.length - 1].render = (
    _text: any,
    record: any,
    index: number
  ) => {
    return (
      <div key={index}>
        <Button type="link" onClick={() => handleInfo(record)}>
          查看
        </Button>
        <Button type="link" onClick={() => handleInfo(record, true)}>
          编辑
        </Button>
      </div>
    )
  }

  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [params, setParams] = useState<Record<string, any>>({
    pageNum: 1,
    pageSize: 10
  })
  const [facList, setFacList] = useState([]) // 选中的值
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) // 选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) // 新增展示弹窗
  const [modalType, setModalType] = useState('add')
  const [rowInfo, setRowInfo] = useState()
  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, efficiencyList)

  useEffect(() => {
    ;(async () => {
      try {
        const res: any = await factoryList()
        const { data = [] } = res
        data.forEach((item: any) => {
          item.label = item.deptName
          item.value = item.id
        })
        setFacList(data)
      } catch (err) {}
    })()
  }, [])

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[1]['options'] = facList
    setConfigs(nConfigs)
  }, [facList])

  const changeTeamConfig = async (factoryId?: string) => {
    const nConfigs: any[] = cloneDeep(configs)
    const list: any = factoryId ? await teamList({ factoryId }) : []
    list.forEach((item: any) => {
      item.label = item.teamName
      item.value = item.id
    })
    nConfigs[2]['options'] = list
    setConfigs(nConfigs)
  }

  const paramsChange = (values: Record<string, any>) => {
    if (params.factoryId && values.factoryId !== params.factoryId) {
      values.teamId = undefined
    }

    setParams(values)
  }

  useEffect(() => {
    changeTeamConfig(params.factoryId)
  }, [params])

  //删除
  const deleteInfo = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      confirm({
        title: '确认删除?',
        icon: <ExclamationCircleOutlined />,
        content: '删除选中信息',
        onOk: async () => {
          const res = await deleteEfficiencyInfo(selectedRowKeys)
          if (res) {
            message.success('删除成功')
            getDataList()
          }
        }
      })
    }
  }

  const onSelectChange = (selectedRowKeys: React.SetStateAction<never[]>) => {
    console.log('selectedRowKeys', selectedRowKeys)
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
  // 新增弹窗
  const onAddCancel = (isUpdate?: boolean) => {
    setIsModalVisible(false)
    isUpdate && getDataList()
  }
  const handleInfo = async (record?: Record<string, any>, isEdit?: boolean) => {
    if (record) {
      try {
        const res = await efficiencyInfo({ id: record.id })
        initAddModal(isEdit ? 'edit' : 'view', res)
      } catch (err) {}
    } else {
      initAddModal('add', {})
    }
  }
  const initAddModal = (type: string, info?: any) => {
    setRowInfo(info)
    setModalType(type)
    setIsModalVisible(true)
  }
  const TableLeft = () => {
    return (
      <>
        <Button
          className={styles.executionMethod}
          type="primary"
          onClick={() => handleInfo(undefined)}
        >
          新增
        </Button>
        <Button type="primary" danger onClick={deleteInfo}>
          删除
        </Button>
      </>
    )
  }

  return (
    <div className={styles.qualification}>
      <div>
        <Title title={'产能效率模板'} />
      </div>
      <div>
        <SearchBar
          configs={configs}
          params={params}
          callback={paramsChange}
        ></SearchBar>
        <div className={styles.content}>
          <CusDragTable
            storageField={'rule'}
            cusBarLeft={TableLeft}
            rowSelection={rowSelection}
            columns={tableColumns}
            dataSource={dataSource}
            rowKey={'id'}
            scroll={{ x: 1000 }}
            loading={loading}
            onChange={tableChange}
            pagination={{
              //分页
              showSizeChanger: true,
              showQuickJumper: true, //是否快速查找
              pageSize: pageSize, //每页条数
              current: pageNum, //	当前页数
              total, //数据总数
              // position: ['bottomCenter'], //居中
              pageSizeOptions: ['10', '20', '50']
            }}
          />
        </div>
      </div>
      {isModalVisible && (
        <AddModal
          onAddCancel={onAddCancel}
          isModalVisible={isModalVisible}
          type={modalType}
          modalInfo={rowInfo}
          facList={facList}
        />
      )}
    </div>
  )
}

export default Rule
