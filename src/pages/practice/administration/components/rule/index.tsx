import { Button, message, Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/es/table/interface'
import { SorterResult } from 'antd/lib/table/interface'
import { cloneDeep, debounce, pick } from 'lodash'
import React, { useEffect, useState } from 'react'

import { CusDragTable, SearchBar, Title } from '@/components'
import { practice } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'

import { searchConfigs } from './conifgs'
import Forms from './forms'
import styles from './index.module.less'
import MovPopup from './movPopup'
import Popup from './popup'

// 假数据
const treeData = [
  {
    title: '工厂',
    value: '1',
    key: '1',
    disabled: true,
    children: [
      {
        title: '工厂1',
        value: '2',
        key: '2'
      },
      {
        title: '工厂2',
        value: '3',
        key: '3'
      }
    ]
  },
  {
    title: '原料',
    value: '2-9',
    key: '2-9',
    disabled: true,
    children: [
      {
        title: '大米',
        value: '2-1',
        key: '2-1'
      },
      {
        title: '土豆',
        value: '2-2',
        key: '2-2'
      },
      {
        title: '菠萝',
        value: '2-3',
        key: '2-3'
      }
    ]
  },
  {
    title: '玩具',
    value: '3-9',
    key: '3-9',
    disabled: true,
    children: [
      {
        title: '金铲铲的冠冕',
        value: '3-1',
        key: '3-1'
      },
      {
        title: '残暴之力',
        value: '3-2',
        key: '3-2'
      },
      {
        title: '末日寒冬',
        value: '3-3',
        key: '3-3'
      }
    ]
  },
  {
    title: '蔬菜',
    value: '4',
    key: '4',
    disabled: true
  }
]

function Rule() {
  const [formData, setFormData] = useState<any>({})
  const [configs, setConfigs] = useState<any[]>(searchConfigs)
  const [params, setParams] = useState<Record<string, any>>({
    pageNum: 1,
    pageSize: 10
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的值
  const [isModalVisible, setIsModalVisible] = useState(false) //展示弹窗
  const [type, setType] = useState(false) //编辑或者新增
  const [movIsModalVisible, setMovIsModalVisible] = useState(false) //删除弹窗
  const [edit, setEdit] = useState([]) //编辑数据
  const { efficiencyList } = practice

  const { tableChange, dataSource, total, pageNum, pageSize, loading } =
    useTableChange(params, efficiencyList)

  useEffect(() => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[1]['treeData'] = treeData
    setConfigs(nConfigs)
  }, [treeData])

  const paramsChange = (values: Record<string, any>) => {
    setParams(values)
  }
  // eslint-disable-next-line no-sparse-arrays
  const columns: any = [
    {
      title: '模板名称',
      align: 'center',
      dataIndex: 'templateName',
      width: 200
    },
    {
      title: '工作班组',
      align: 'center',
      dataIndex: '班组id',
      width: 200
    },
    {
      title: '初始效率',
      align: 'center',
      dataIndex: 'startEfficiency',
      width: 200
    },
    {
      title: '最终效率',
      align: 'center',
      dataIndex: 'finallyEfficiency',
      width: 200
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      width: 200
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operate',
      fixed: 'right',
      width: 200,
      render: (text: any, record: any, index: number) => {
        return (
          <div className={styles.flex}>
            <Button type="link" onClick={() => editInfo(false)}>
              查看
            </Button>
            <Button type="link" onClick={() => editInfo(true)}>
              编辑
            </Button>
          </div>
        )
      }
    }
  ]

  //删除
  const deleteInfo = () => {
    if (selectedRowKeys[0] === undefined) {
      message.warning('请至少选择一个')
    } else {
      setMovIsModalVisible(true)
    }
  }
  const movApi = () => {
    console.log('删除逻辑')
    console.log('选中的删除id', selectedRowKeys)
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
    setIsModalVisible(true)
    setType(true)
  }

  const content = { isModalVisible, setIsModalVisible, type }

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
            className={styles.table}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            rowKey={'id'}
            scroll={{ x: 1200 }}
            loading={loading}
            onChange={(
              pagination: TablePaginationConfig,
              filters: Record<string, FilterValue | null>,
              sorter: SorterResult<any> | SorterResult<any>[]
            ) => tableChange(pagination, filters, sorter)}
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
          <Popup content={content} />
        </div>
      </div>
      <MovPopup
        type="mov"
        movIsModalVisible={movIsModalVisible}
        setMovIsModalVisible={setMovIsModalVisible}
        movApi={movApi}
      />
    </div>
  )
}

export default Rule
