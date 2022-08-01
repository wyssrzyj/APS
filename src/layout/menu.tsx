import { Menu } from 'antd'
import classNames from 'classnames'
import { cloneDeep, get, isArray, isEmpty } from 'lodash'
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
  const [openKey, setOpenKey] = useState<any>([])
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

  // const getSelectKey = (menus: any) => {
  //   menus.forEach((item: any) => {
  //     const url = get(item, 'url', '')
  //     const children = get(item, 'children', [])
  //     if (url && new RegExp(url).test(location.pathname)) {
  //       setCurrentMenu([item.key])
  //     } else if (!isEmpty(children)) {
  //       getSelectKey(children)
  //     }
  //   })
  // }
  const onOpenChange = (keys: any) => {
    setOpenKey([keys[keys.length - 1]])
  }

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
  const getParentKey = (name) => {
    menus.forEach((item, index) => {
      if (!isEmpty(item.children)) {
        item.children.forEach((v) => {
          if (v.key === name) {
            setOpenKey([item.key])
          }
        })
      }
    })
  }
  useEffect(() => {
    setCurrentMenu([location.pathname.slice(1)])
    getParentKey(location.pathname.slice(1)) //获取父级
  }, [location.pathname])

  return (
    <Menu
      selectedKeys={currentMenu}
      openKeys={openKey}
      mode="inline"
      // mode="horizontal"
      // theme={'dark'} //黑色
      theme={'light'} //白色
      style={{ flex: 1 }}
      multiple={false}
      onClick={changePage}
      onOpenChange={onOpenChange}
      items={menus} // 4.20.0 用法升级
    >
      {/* {menus.map((item) => {
        return getMenuDOM(item).
      })} */}
    </Menu>
  )
}

export default MenuBox
