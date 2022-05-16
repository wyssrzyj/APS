/*
 * @Author: zjr
 * @Date: 2022-05-11 14:52:29
 * @LastEditTime: 2022-05-16 13:19:59
 * @Description:
 * @LastEditors: 卢英杰 9433298+lyjlol@user.noreply.gitee.com
 */
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Switch } from 'antd'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'

import { CusDragTable, CustomModal, SearchBar, Title } from '@/components'
import { commonApis, systemSettingsApis } from '@/recoil/apis'
import useTableChange from '@/utils/useTableChange'
const { confirm } = Modal
const {
  userList,
  deleteUserInfo,
  saveUserInfo,
  validatePassword,
  resetPassword
} = systemSettingsApis
const { factoryList } = commonApis
import {
  modalFormConfig,
  resetModalConfig,
  searchConfig,
  tableColumn
} from './configs'
import styles from './index.module.less'
const UserManage = () => {
  const [facList, setFacList] = useState([])
  const [configs, setConfigs] = useState(searchConfig)
  const [modalConfig, setModalConfig] = useState(modalFormConfig)
  const [rowInfo, setRowInfo] = useState<any>({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSystemModalVisible, setIsSystemModalVisible] = useState(false)
  const [params, setParams] = useState<Record<string, any>>({
    pageNum: 1,
    pageSize: 10
  })

  const {
    tableChange,
    dataSource,
    total,
    pageNum,
    pageSize,
    loading,
    getDataList
  } = useTableChange(params, userList)

  useEffect(() => {
    ;(async () => {
      await getFacList()
    })()
  }, [])

  useEffect(() => {
    changeSearchConfig()
    changeModalConfig()
  }, [facList])

  const getFacList = async () => {
    try {
      const res: any = await factoryList()
      const { data = [] } = res
      data.forEach((item: any) => {
        item.label = item.deptName
        item.value = item.id
      })
      setFacList(data)
    } catch (err) {}
  }

  const changeSearchConfig = () => {
    const nConfigs: any[] = cloneDeep(configs)
    nConfigs[0]['options'] = facList
    setConfigs(nConfigs)
  }

  const changeModalConfig = () => {
    const nModalConfigs: any[] = cloneDeep(modalConfig)
    nModalConfigs[0]['options'] = facList
    setModalConfig(nModalConfigs)
  }

  const paramsChange = (values: Record<string, any>) => {
    setParams({ ...values })
  }

  const changeTableColumn = () => {
    let nColumn = cloneDeep(tableColumn)
    nColumn = nColumn.map((item) => {
      if (item.dataIndex == 'factoryId') {
        item.render = (text: any, record: any, index: number) => {
          return facList.find((item) => item.id === text).deptName
        }
      }
      if (item.dataIndex === 'status') {
        item.render = (text: any, record: any, index: number) => {
          return (
            <div key={index}>
              <Switch
                disabled
                checkedChildren="开启"
                unCheckedChildren="关闭"
                checked={Boolean(text)}
              />
            </div>
          )
        }
      }
      if (item.dataIndex === 'operate') {
        item.render = (_text: any, record: any, index: number) => {
          return (
            <div key={index}>
              <Button type="link" onClick={() => handleDetailInfo(record)}>
                编辑
              </Button>
              <Button
                type="link"
                onClick={() => {
                  setRowInfo(record)
                  handleResetPassWord(record)
                }}
              >
                重置密码
              </Button>
              <Button type="link" onClick={() => deleteInfo(record)}>
                删除
              </Button>
            </div>
          )
        }
      }
      return item
    })
    return nColumn
  }

  const deleteInfo = (rowInfo) => {
    if (!hasUUid()) return
    confirm({
      title: '确认删除?',
      icon: <ExclamationCircleOutlined />,
      content: '删除选中信息',
      onOk: async () => {
        const res = await deleteUserInfo({ id: rowInfo.id })
        if (res) {
          message.success('   ')
          getDataList()
        }
      }
    })
  }

  const handleDetailInfo = async (rowInfo: any) => {
    if (!hasUUid()) return
    const info = cloneDeep(rowInfo)
    info.password = info.password || '123456'
    info.status = Boolean(info.status)
    setRowInfo(info)
    setIsModalVisible(true)
  }

  const handleOk = async (values, rowInfo) => {
    const params = cloneDeep(values)
    params.id = rowInfo.id
    params.status = params.status ? 1 : 0

    const res = await saveUserInfo(params)
    if (res.success) {
      message.success(res.msg)
      setIsModalVisible(false)
      getDataList()
    } else {
      message.warning(res.msg)
    }
  }

  const hasUUid = () => {
    const systemUuid = JSON.parse(localStorage.getItem('systemUuid'))
    if (!systemUuid) {
      setIsSystemModalVisible(true)
    }
    return Boolean(systemUuid)
  }

  const handleSystemPwdOk = async (values) => {
    const res = await validatePassword(values)
    if (res.success) {
      setIsSystemModalVisible(false)
      localStorage.setItem('systemUuid', JSON.stringify(res.data.uuid))
    } else {
      message.warning(res.msg)
    }
  }

  const handleResetPassWord = async (rowInfo) => {
    if (!hasUUid()) return
    confirm({
      title: '确认重置?',
      icon: <ExclamationCircleOutlined />,
      content: '重置选中信息密码',
      onOk: async () => {
        const res = await resetPassword({
          loginAccount: rowInfo.loginAccount,
          newPassword: '123456'
        })
        if (res.success) {
          message.success(res.msg)
          getDataList()
        } else {
          message.warning(res.msg)
        }
      }
    })
  }

  const handleAdd = () => {
    if (!hasUUid()) return
    setRowInfo({ password: '123456', status: true })
    setIsModalVisible(true)
  }
  const TableLeft = () => {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            handleAdd()
          }}
        >
          新增
        </Button>
      </>
    )
  }

  return (
    <div className={styles.outContainer}>
      <Title title={'用户管理'}></Title>
      <SearchBar
        configs={configs}
        params={params}
        callback={paramsChange}
      ></SearchBar>
      {facList && facList.length && (
        <CusDragTable
          storageField={'userManage'}
          cusBarLeft={TableLeft}
          columns={changeTableColumn()}
          dataSource={dataSource}
          rowKey={'id'}
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
        ></CusDragTable>
      )}
      {isModalVisible && (
        <CustomModal
          width={500}
          visible={isModalVisible}
          title={`${rowInfo.id ? '编辑' : '新增'}用户`}
          configs={modalConfig}
          cancel={() => {
            setIsModalVisible(false)
          }}
          callback={handleOk}
          initialValues={rowInfo}
        ></CustomModal>
      )}
      {isSystemModalVisible && (
        <CustomModal
          width={500}
          visible={isSystemModalVisible}
          title="系统密码"
          configs={resetModalConfig}
          cancel={() => {
            setIsSystemModalVisible(false)
          }}
          callback={handleSystemPwdOk}
          initialValues={{}}
        ></CustomModal>
      )}
    </div>
  )
}
export default UserManage
