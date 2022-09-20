/*
 * @Author: lyj
 * @Date: 2022-06-20 10:26:25
 * @LastEditTime: 2022-08-04 14:05:44
 * @Description:
 * @LastEditors: lyj
 */
import { Button, Popover } from 'antd'
import { divide, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@/components' //路径
import { userApis } from '@/recoil/apis'

import mailbox from '../imgs/smallBell.png'
import mailboxs from '../imgs/smallBells.png'
import styles from './index.module.less'
const EarlyWarning = (props) => {
  const { backgroundColor } = props

  const { newAlertMessage, closePrompt } = userApis
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [ids, setIds] = useState([])

  const warning = async (v) => {
    const id = v.externalProduceOrderNum
    const res = await closePrompt({ idList: ids })
    if (res.code === 200) {
      setList([])
      if (v.waringType !== '1') {
        navigate('/materialAlert', {
          replace: true,
          state: { id: id }
        })
      } else {
        navigate('/productionWarning', {
          replace: true,
          state: { id: id }
        })
      }
    }
  }
  useEffect(() => {
    newNews()
  }, [])
  const newNews = async () => {
    const res = await newAlertMessage()
    if (!isEmpty(res.data)) {
      const ids = []
      res.data.forEach((item) => {
        ids.push(item.id)
      })
      setIds(ids)

      setList(res.data)
    }
  }
  const arr = (item) => {
    return (
      <>
        <span> 客户款号：{item.productClientNum}</span>
      </>
    )
  }
  const container = (
    <>
      <div className={styles.pointer}>
        <div className={styles.todoContent}>
          {!isEmpty(list) ? (
            list.map((item, index) => (
              <div
                onClick={() => warning(item)}
                className={styles.containerList}
                key={index}
              >
                {item.waringType !== '1' ? (
                  <div className={styles.material}></div>
                ) : item.abnormalStatus === '1' ? (
                  <div className={styles.circularWarning}></div>
                ) : (
                  <div className={styles.circularDelay}></div>
                )}
                <Popover placement="top" content={arr(item)} trigger="hover">
                  <span className={styles.textColor}>
                    {item.externalProduceOrderNum}
                  </span>
                </Popover>

                {item.waringType !== '1'
                  ? '进入物料预警'
                  : item.abnormalStatus === '1'
                  ? '进入预警期'
                  : '已延期'}
              </div>
            ))
          ) : (
            <div className={styles.nonePresent}>暂无信息</div>
          )}
        </div>
      </div>
    </>
  )
  return (
    <div className={styles.earlyWarning}>
      <div>
        {list.length > 0 ? (
          <>
            <Popover placement="top" content={container} trigger="hover">
              <img
                src={backgroundColor === '#fff' ? mailboxs : mailbox}
                className={styles.imgMailbox}
                alt=""
              />
              {/* <Icon type="jack-swyx" className={styles.previous} /> */}
              {list.length < 10 ? (
                <div className={styles.individual}>{list.length}</div>
              ) : list.length < 100 ? (
                <div className={styles.ten}>{list.length}</div>
              ) : (
                <div className={styles.hundred}>99+</div>
              )}
            </Popover>
          </>
        ) : (
          <Popover placement="top" content={container} trigger="hover">
            <img
              src={backgroundColor === '#fff' ? mailboxs : mailbox}
              className={styles.imgMailbox}
              alt=""
            />
          </Popover>
        )}
      </div>
    </div>
  )
}

export default EarlyWarning
