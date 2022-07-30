import Icon from '@/components/Icon'

export const menus = [
  {
    label: '首页',
    key: 'home',
    icon: <Icon type={'jack-home-fill'} />,
    url: '/home'
  },
  {
    label: '系统管理',
    key: 'systemManagement',
    icon: <Icon type={'jack-set'} />,
    children: [
      {
        label: '系统参数设置',
        key: 'systemSettingsWork',
        icon: <Icon type={'jack-xitongcanshupeizhi'} />,
        url: '/systemSettingsWork'
      },
      {
        label: '用户管理',
        key: 'userManage',
        icon: <Icon type={'jack-yonghu3'} />,
        url: '/userManage'
      }

      // {
      //   label: '部门管理',
      //   key: 'department',
      //   icon: 'jack-viewgallery',
      //   url: '/departmentManage'
      // },
      // {
      //   label: '角色管理',
      //   key: 'role',
      //   icon: 'jack-jiaoseguanli1',
      //   url: '/roleManage'
      // }
    ]
  },
  {
    label: '基础数据',
    key: 'basicData',
    icon: <Icon type={'jack-jichushuju'} />,
    url: '/',
    children: [
      {
        label: '工作模式',
        key: 'work',
        icon: <Icon type={'jack-kuaisugongzuoliu'} />,
        url: '/work'
      },
      {
        label: '加班管理',
        key: 'overtime',
        icon: <Icon type={'jack-jiaban'} />,
        url: '/overtime'
      },
      {
        label: '节假日',
        key: 'vacations',
        icon: <Icon type={'jack-jiejiarishezhi'} />,
        url: '/vacations'
      },
      {
        label: '产能效率模板',
        key: 'rule',
        icon: <Icon type={'jack-guanlimoban1'} />,
        url: '/rule'
      }
      // {
      //   label: '日历管理',
      //   key: 'management',
      //   icon: 'jack-rili',
      //   url: '/',
      //   children: [

      //   ]
      // },
      // {
      //   label: '产能效率管理',
      //   key: 'capacity',
      //   icon: 'jack-channengxiaoshuai-01',
      //   url: '/',
      //   children: [
      //     {
      //       label: '产能效率模板',
      //       key: 'rule',
      //       icon: 'jack-guanlimoban1',
      //       url: '/rule'
      //     }
      //   ]
      // }
    ]
  },

  {
    label: '业务单数据管理',
    key: 'production ',
    icon: <Icon type={'jack-qiyeyewu'} />,
    url: '/',
    children: [
      {
        label: '生产单列表',
        key: 'productionList',
        icon: <Icon type={'jack-shengchanguanli'} />,
        url: '/productionList'
      }
    ]
  },
  {
    label: '生产管理',
    key: 'productionManagement',
    icon: <Icon type={'jack-shengchan'} />,
    url: '/',
    children: [
      {
        label: '班组工作日历',
        key: 'workCalendar',
        icon: <Icon type={'jack-rili'} />,
        url: '/workCalendar'
      },
      {
        label: '物料齐套检查',
        key: 'materials',
        icon: <Icon type={'jack-wuliaoguanli'} />,
        url: '/materials'
      },
      {
        label: '生产单排程',
        key: 'scheduling',
        icon: <Icon type={'jack-jihuapaicheng'} />,
        url: '/scheduling'
      }
    ]
  },
  {
    label: '进度跟踪',
    key: 'productionManagements',
    icon: <Icon type={'jack-jindutiao'} />,
    url: '/',
    children: [
      // {
      //   label: '日排程管理',
      //   key: 'dailySchedule',
      //   icon: 'jack-paigong',
      //   url: '/dailySchedule'
      // },
      {
        label: '生产计划',
        key: 'dispatchPan',
        icon: <Icon type={'jack-paigong'} />,
        url: '/dispatchPan'
      },
      {
        label: '班组甘特图',
        key: 'resourcedMap',
        icon: <Icon type={'jack-ziyuan1'} />,
        url: '/resourcedMap'
      },
      {
        label: '生产单甘特图',
        key: 'orderChart',
        icon: <Icon type={'jack-chartmixed'} />,
        url: '/orderChart'
      },
      {
        label: '班组负荷图',
        key: 'schedulingResults',
        icon: <Icon type={'jack-fuhe'} />,
        url: '/schedulingResults'
      },
      {
        label: '生产实绩',
        key: 'actualProduction',
        icon: <Icon type={'jack-shengchanpicishiji'} />,
        url: '/actualProduction'
      }
    ]
  }
  // {
  //   label: '生产预警管理',
  //   key: 'productionWarning',
  //   icon: 'jack-jindutiao',
  //   url: '/productionWarning'
  // }
]

type viewFormConfig = {
  label: string
  name: string
  field: string
  value: any
  type: string
  treeData: any
  required: boolean
  treeCheckable: boolean
  placeholder: string
  disabled: boolean
  allowClear: boolean
  options: any
  span: number
}

export const editPwdModalConfig: Array<Partial<viewFormConfig>> = [
  {
    label: '原密码',
    name: 'oldPassword',
    field: 'oldPassword',
    value: '',
    type: 'passwordInput',
    required: true,
    placeholder: '请输入原密码'
  },
  {
    label: '新密码',
    name: 'newPassword',
    field: 'newPassword',
    value: '',
    type: 'passwordInput',
    required: true,
    placeholder: '请输入新密码'
  },
  {
    label: '确认新密码',
    name: 'confirmPassword',
    field: 'confirmPassword',
    value: '',
    type: 'passwordInput',
    required: true,
    placeholder: '请输入新密码'
  }
]
