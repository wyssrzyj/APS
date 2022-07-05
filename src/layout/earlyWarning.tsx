/*
 * @Author: lyj
 * @Date: 2022-06-20 10:26:25
 * @LastEditTime: 2022-07-05 14:35:00
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
import styles from './index.module.less'
const EarlyWarning = () => {
  const { newAlertMessage, closePrompt } = userApis
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [ids, setIds] = useState([])

  const warning = async (id) => {
    const res = await closePrompt({ idList: ids })
    if (res.code === 200) {
      setList([])
      navigate('/productionWarning', {
        replace: true,
        state: { id: id }
      })
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
  const arr = (
    <>
      <div className={styles.pointer}>
        <div className={styles.todoContent}>
          {!isEmpty(list) &&
            list.map((item, index) => (
              <>
                <div
                  onClick={() => warning(item.externalProduceOrderNum)}
                  className={styles.containerList}
                  key={index}
                >
                  {item.abnormalStatus === '1' ? (
                    <div className={styles.circularWarning}></div>
                  ) : (
                    <div className={styles.circularDelay}></div>
                  )}
                  <span className={styles.textColor}>
                    {item.externalProduceOrderNum}
                  </span>
                  生产单已{item.abnormalStatus === '1' ? '预警' : '延期'}
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  )
  return (
    <div>
      <div className={styles.earlyWarning}>
        {list.length > 0 ? (
          <>
            <Popover placement="top" content={arr} trigger="hover">
              <img src={mailbox} className={styles.imgMailbox} alt="" />
              {/* <Icon type="jack-swyx" className={styles.previous} /> */}
              {list.length > 0 ? <div className={styles.remind}></div> : null}
            </Popover>
          </>
        ) : (
          <img src={mailbox} className={styles.imgMailbox} alt="" />
        )}
      </div>
    </div>
  )
}

export default EarlyWarning
