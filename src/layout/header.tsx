/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-05-13 16:42:27
 * @Description:
 * @LastEditors: zjr
 */
import { message } from 'antd'
import { userInfo } from 'os'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CustomModal } from '@/components'
import Icon from '@/components/Icon'
import { loginApis, systemSettingsApis } from '@/recoil/apis'

import styles from './index.module.less'
import { editPwdModalConfig } from './menuConfigs'
const KeyIcon = () => <Icon type="jack-yuechi" className={styles.icon} />
const UserIcon = () => <Icon type="jack-user" className={styles.icon} />
const ExitIcon = () => <Icon type="jack-tuichu" className={styles.icon} />
const { editUserInfo } = systemSettingsApis
const Header = () => {
  const { logout } = loginApis
  const navigate = useNavigate()
  const [isEditPwdVisible, setIsEditPwdVisible] = useState(false)

  const exitToLogin = async () => {
    const res = await logout()
    res && navigate('/login')
  }

  const infos = [
    { label: '个人中心', icon: UserIcon, key: 'user' },
    { label: '修改密码', icon: KeyIcon, key: 'change' },
    { label: '退出登录', icon: ExitIcon, key: 'exit', onClick: exitToLogin }
  ]

  const handleOnclick = (item) => {
    if (item.key === 'change') setIsEditPwdVisible(true)
  }

  const handleOk = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.warning('密码不一致，重新输入')
      return
    }
    const res = await editUserInfo({
      ...values,
      loginAccount: JSON.parse(localStorage.getItem('currentUser')).user
        .loginAccount
    })
    if (res.success) {
      message.success(res.msg)
      setIsEditPwdVisible(false)
      localStorage.removeItem('currentUser')
      navigate('/login')
    } else {
      message.warning(res.msg)
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          className={styles.logImg}
          src="http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png"
          alt="优产云平台"
        />
      </div>
      <div className={styles.headerR}>
        <div className={styles.userInfo}>
          <div className={styles.user}>用户</div>
          <div className={styles.infoModal}>
            {infos.map((item, idx) => {
              if (idx === infos.length - 1) {
                return (
                  <div key={item.key}>
                    <div className={styles.divider} />
                    <div className={styles.modalItem} onClick={item.onClick}>
                      {item.icon()}
                      {item.label}
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={item.key}
                  className={styles.modalItem}
                  onClick={() => {
                    handleOnclick(item)
                  }}
                >
                  {item.icon()}
                  {item.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {isEditPwdVisible && (
        <CustomModal
          width={500}
          visible={isEditPwdVisible}
          title="修改密码"
          configs={editPwdModalConfig}
          cancel={() => {
            setIsEditPwdVisible(false)
          }}
          callback={handleOk}
          initialValues={{}}
        ></CustomModal>
      )}
    </div>
  )
}

export default Header
