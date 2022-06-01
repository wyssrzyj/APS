import { Button, message, Modal, Result, Space, Tag } from 'antd'
import classNames from 'classnames'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import { schedulingApis } from '@/recoil/apis'

import styles from './index.module.less'
const { checkSchedule, releaseSchedule } = schedulingApis
const list = [
  { key: '延期生产单:', value: 'delayOrderProductList', list: [] },
  {
    key: '物料在工段开始时间到达:',
    value: 'materialDalaySectionList',
    list: []
  },
  {
    key: '生产单后工段在前工段前开始:',
    value: 'sectionSequenceMistakeList',
    list: []
  },
  { key: '工作时间重叠班组:', value: 'workTimeOverlapTeamList', list: [] }
]
function VerifyModal(props: Record<string, any>) {
  const { visibleVerify, onCancel, checkIDs, update, setCheckIDs } = props
  const [checkList, setCheckList] = useState<Record<string, any>>(list)

  const [checkPass, setCheckPass] = useState('')
  const verifyInfo = async (id: string) => {
    const data = cloneDeep(checkList)
    // ['15042722699443200022']
    const res = await checkSchedule(id)
    if (res && !Object.keys(res).some((i) => res[i].length > 0)) {
      setCheckPass('success')
    } else {
      data.forEach((item: Record<string, any>) => {
        item.list = res[item.value]
      })
      setCheckPass('fail')
      setCheckList(data)
    }
  }

  useEffect(() => {
    verifyInfo(checkIDs)
  }, [checkIDs])
  const release = async () => {
    await releaseSchedule(checkIDs)
    onCancel()
    update && update()
    setCheckIDs([])
    message.success(`保存成功`)
  }
  return (
    <div>
      <Modal
        visible={visibleVerify}
        centered={true}
        footer={null}
        onCancel={onCancel}
        maskClosable={false}
        width={700}
      >
        <section className={styles.checkContainer}>
          {checkPass === 'success' && (
            <Result status="success" title="校验通过" />
          )}
          {checkPass === 'fail' &&
            checkList.map((item: any) => {
              return (
                <div
                  key={item.value}
                  className={classNames(styles.mb10, styles.listContainer)}
                >
                  <div>
                    <Tag
                      color={
                        [
                          'delayOrderProductList',
                          'workTimeOverlapTeamList'
                        ].includes(item.value)
                          ? 'red'
                          : 'orange'
                      }
                    >
                      {item.key}
                    </Tag>
                  </div>
                  <div>
                    {item.list.map((i: string, index: number) => {
                      return (
                        <div
                          key={index}
                          className={
                            index === item.list.length - 1 ? '' : styles.mb10
                          }
                        >
                          {i}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </section>
        <footer>
          <Space>
            <Button type="primary" onClick={onCancel}>
              返回
            </Button>
            <Button type="primary" onClick={release}>
              发布
            </Button>
          </Space>
        </footer>
      </Modal>
    </div>
  )
}

export default VerifyModal
