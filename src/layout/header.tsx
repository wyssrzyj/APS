/*
 * @Author: zjr
 * @Date: 2022-04-07 11:22:20
 * @LastEditTime: 2022-08-02 17:04:23
 * @Description:
 * @LastEditors: lyj
 */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UndoOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Avatar, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { CustomModal } from '@/components'
import Icon from '@/components/Icon'
import { layout } from '@/recoil'
import { loginApis, systemSettingsApis } from '@/recoil/apis'
import { clearLocalStorage } from '@/utils/tool'

import img from '../imgs/top.png'
import CurrentLocation from './currentLocation'
import EarlyWarning from './earlyWarning'
import styles from './index.module.less'
import InformationConfiguration from './informationConfiguration'
import { editPwdModalConfig } from './menuConfigs'
import TopSearch from './topSearch'
const KeyIcon = () => <Icon type="jack-yuechi" className={styles.icon} />
const UserIcon = () => <Icon type="jack-user" className={styles.icon} />
const ExitIcon = () => <Icon type="jack-tuichu" className={styles.icon} />
const { editUserInfo } = systemSettingsApis
const Header = (props) => {
  const { setCollapsed, collapsed } = props
  const { logout } = loginApis
  const navigate = useNavigate()
  const themeColor = useRecoilValue(layout.layoutColor)

  const [isEditPwdVisible, setIsEditPwdVisible] = useState(false)

  const exitToLogin = async () => {
    const res = await logout()
    res && navigate('/login')
  }

  const infos = [
    // { label: '个人中心', icon: UserIcon, key: 'user' },
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
      message.success(res.msg || '修改密码成功，请重新登录')
      setIsEditPwdVisible(false)
      clearLocalStorage()
      navigate('/login')
    } else {
      message.warning(res.msg || '操作失败，请稍后重试')
    }
  }

  return (
    <div className={styles.header} style={{ background: themeColor }}>
      {collapsed ? (
        <div className={styles.logoTitle}>杰克</div>
      ) : (
        <div className={styles.logo}>
          <img className={styles.logImg} src={img} alt="APS" />
        </div>
      )}

      <div className={styles.collapsed}>
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => {
              setCollapsed(false)
            }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => {
              setCollapsed(true)
            }}
          />
        )}
      </div>
      {/* 刷新当前页面 */}
      <span>
        <UndoOutlined
          onClick={() => {
            location.reload()
          }}
          className={styles.refresh}
        />
      </span>
      {/* //只有左侧有这个功能 */}
      <CurrentLocation />

      <div className={styles.headerR}>
        <TopSearch />
        {/* 预警信息 */}
        <EarlyWarning />
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <Avatar
              size={24}
              style={{ backgroundColor: '#1890ff', marginRight: '8px' }}
              icon={<UserOutlined />}
            />
            <span style={{ color: '#f6f6f6' }}>
              {JSON.parse(localStorage.getItem('currentUser')) &&
                JSON.parse(localStorage.getItem('currentUser')).user.username}
            </span>
          </div>
          <div className={styles.infoModal}>
            {infos.map((item, idx) => {
              if (idx === infos.length - 1) {
                return (
                  <div key={item.key}>
                    <div className={styles.divider} />
                    <div className={styles.modalItem} onClick={item.onClick}>
                      <span style={{ color: '#f6f6f6' }}> {item.icon()}</span>
                      <span style={{ color: '#f6f6f6' }}> {item.label}</span>
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
                  <span style={{ color: '#f6f6f6' }}> {item.icon()}</span>
                  <span style={{ color: '#f6f6f6' }}> {item.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 抽屉 */}
        <InformationConfiguration />
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
