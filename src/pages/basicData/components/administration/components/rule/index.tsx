import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, message, Modal, Space, Upload } from 'antd'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'

import { CusDragTable, CustomModal, SearchBar, Title } from '@/components'
import { efficiencyTemplateApis } from '@/recoil/apis'
import { getToken } from '@/utils/tool'
import useTableChange from '@/utils/useTableChange'

import AddModal from './addModal'
import { searchConfigs, tableColumns } from './conifgs'
import ExportModal from './exportModal'
import styles from './index.module.less'
const { confirm } = Modal
const {
  efficiencyList,
  efficiencyInfo,
  factoryList,
  teamList,
  deleteEfficiencyInfo
} = efficiencyTemplateApis

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
  const [exportModalVisible, setExportModalVisible] = useState(false)
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
    const list: any = factoryId ? await teamList({ factoryId }) : []
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
      values.teamId = null
      changeTeamConfig(values.factoryId)
    }

    console.log(values, 'values')

    setParams({ ...values })
  }

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
      initAddModal('add', {
        capacityEfficiencyList: [{ day: 1, efficiency: 0 }]
      })
    }
  }
  const initAddModal = (type: string, info?: any) => {
    setRowInfo(info)
    setModalType(type)
    setIsModalVisible(true)
  }

  const uploadProps = {
    name: 'file',
    action: '/aps/capacity-efficiency-manage/import-data',
    headers: {
      Authorization: getToken()
    },
    beforeUpload: (file) => {
      const { name } = file
      // 校验是否是excel文件
      const isExcel = /(xls|xlsx)$/i.test(name)
      if (!isExcel) {
        message.error('只能上传xls或xlsx格式的文件')
      }

      return isExcel
    },

    onChange(info) {
      const { status, response } = info.file
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        if (response.success) {
          message.success(`${info.file.name}上传成功`)
          getDataList()
        } else {
          message.error(response.msg || '上传失败，请重试')
        }
      } else if (status === 'error') {
        message.error(`${info.file.name}上传失败，请重试`)
      }
    },
    showUploadList: false
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div
          onClick={() => {
            setExportModalVisible(true)
          }}
        >
          模板下载
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <Upload {...uploadProps}>
          <span>Excel导入</span>
        </Upload>
      </Menu.Item>
    </Menu>
  )

  const TableLeft = () => {
    return (
      <Space>
        <Button type="primary" onClick={() => handleInfo(undefined)}>
          新增
        </Button>
        <Button type="primary" danger onClick={deleteInfo}>
          删除
        </Button>
        <Dropdown overlay={menu} placement="topLeft">
          <Button type="primary">
            导入
            <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    )
  }

  return (
    <div className={styles.qualification}>
      <div>{/* <Title title={'产能效率模板'} /> */}</div>
      <div>
        <div className={styles.forms}>
          <SearchBar
            configs={configs}
            params={params}
            callback={paramsChange}
          ></SearchBar>
        </div>

        <div className={styles.content}>
          <CusDragTable
            storageField={'rule'}
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
      {exportModalVisible && (
        <ExportModal
          onCancel={() => {
            setExportModalVisible(false)
          }}
          isModalVisible={exportModalVisible}
          facList={facList}
        />
      )}
    </div>
  )
}

export default Rule
