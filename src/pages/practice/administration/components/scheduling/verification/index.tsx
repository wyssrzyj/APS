import { Button, Modal, Space, Tag } from 'antd'
import classNames from 'classnames'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'

import { practice } from '@/recoil/apis'
const { checkSchedule, releaseSchedule } = practice
import styles from './index.module.less'
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
function useVerifyModal(props: Record<string, any>) {
  const { visibleVerify, onCancel, checkIDs } = props
  const [checkList, setCheckList] = useState<Record<string, any>>(list)
  const verifyInfo = async (id: any) => {
    console.log('处理后的数据', id)

    const data = cloneDeep(checkList)
    // ['1504272269944320002']
    const res = await checkSchedule(['1504272269944320002'])
    data.forEach((item: Record<string, any>) => {
      item.list = res[item.value]
    })
    setCheckList(data)
  }
  useEffect(() => {
    console.log('测试,', checkIDs)

    verifyInfo(checkIDs)
  }, [checkIDs])
  const release = async () => {
    await checkSchedule(['1504272269944320002'])
    onCancel()
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
        <section>
          {checkList.map((item: any) => {
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

export default useVerifyModal
