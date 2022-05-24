import { Menu } from 'antd'
import classNames from 'classnames'
import { get, isArray, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Icon from '@/components/Icon'

import styles from './index.module.less'
import { menus } from './menuConfigs'
const { SubMenu } = Menu
const MenuItem = Menu.Item

const initOpenKeys = (data: any, callback: any) => {
  const target = data.find((menu: any) => {
    let flag = false
    if (isArray(menu.children)) {
      flag = menu.children.some((i: any) => location.pathname.includes(i.url))
    }

    return flag
  })
  if (target) {
    callback && callback([target.key])
  }
}

const MenuBox = () => {
  const navigate = useNavigate()

  const [currentMenu, setCurrentMenu] = useState<Array<string>>([])
  const [openKey, setOpenKey] = useState<Array<string>>(['basicConfiguration'])
  const location = useLocation()

  // TODO 效果待更改
  useEffect(() => {
    if (location.pathname === '/home') {
      setCurrentMenu(['home'])
    }
  }, [location.pathname])

  useEffect(() => {
    initOpenKeys(menus, setOpenKey)
  }, [])

  const getMenuDOM = (data: any) => {
    let hasChildren = false
    if (data.children && data.children.length) {
      hasChildren = true
    }

    if (hasChildren) {
      return (
        <SubMenu
          key={data.key}
          title={data.label}
          icon={<Icon type={data.icon} className={styles.menuIcon} />}
        >
          {data.children.map((i: any) => getMenuDOM(i))}
        </SubMenu>
      )
    }
    return (
      <MenuItem
        key={data.key}
        icon={<Icon type={data.icon} className={styles.menuIcon} />}
      >
        {data.label}
      </MenuItem>
    )
  }

  const findRoute = (list: any[], key: string) => {
    let targetUrl = '/home'
    if (list && list.length && key) {
      for (const item of list) {
        if (item.key === key) {
          targetUrl = item.url
          return targetUrl
        }
        if (item.children && item.children.length) {
          const res: any = findRoute(item.children, key)

          if (res !== targetUrl) {
            return res
          }
        }
      }
    }
    return targetUrl
  }

  const changePage = (event: any) => {
    const { key } = event
    const target = findRoute(menus, key) || '/home'
    navigate(target)
  }

  const getSelectKey = (menus: any) => {
    menus.forEach((item: any) => {
      const url = get(item, 'url', '')
      const children = get(item, 'children', [])
      if (url && new RegExp(url).test(location.pathname)) {
        setCurrentMenu([item.key])
      } else if (!isEmpty(children)) {
        getSelectKey(children)
      }
    })
  }

  const onOpenChange = (keys: any) => {
    setOpenKey(keys)
  }

  useEffect(() => {
    // getSelectKey(menus)
    // setCurrentMenu(menuKeys.get(location.pathname))
    // setOpenKeys(subsMap.get(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    for (let i = 0; i < menus.length; i++) {
      const childMenu = menus[i].children
      if (!childMenu) return
      for (let j = 0; j < childMenu.length; j++) {
        if (
          childMenu[j].url &&
          new RegExp(childMenu[j].url).test(location.pathname)
        ) {
          setOpenKey([menus[i].key])
        }
      }
    }
  }, [])
  useEffect(() => {
    // console.log('测试', currentMenu)
    setCurrentMenu([location.pathname.slice(1)])
  }, [location.pathname])

  return (
    // <div className={classNames(styles.menu, collapsed && styles.miniMenu)}>
    <Menu
      selectedKeys={currentMenu}
      // openKeys={openKey}
      // defaultSelectedKeys={['classification']}
      // defaultOpenKeys={[openKey]}
      mode="inline"
      style={{ flex: 1 }}
      multiple={false}
      onClick={changePage}
      onOpenChange={onOpenChange}
    >
      {menus.map((item) => {
        return getMenuDOM(item)
      })}
    </Menu>
  )
}

export default MenuBox
