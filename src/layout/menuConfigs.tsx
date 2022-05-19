export const menus = [
  { label: '首页', key: 'home', icon: 'jack-home-fill', url: '/home' },
  {
    label: '系统管理',
    key: 'systemManagement',
    icon: 'jack-set',
    children: [
      {
        label: '系统参数设置',
        key: 'systemSettingsWork',
        icon: 'jack-yonghu3',
        url: '/systemSettingsWork'
      },
      {
        label: '用户管理',
        key: 'userManage',
        icon: 'jack-yonghu3',
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
    icon: 'jack-jichushuju',
    url: '/',
    children: [
      {
        label: '工作模式',
        key: 'work',
        icon: 'jack-kuaisugongzuoliu',
        url: '/work'
      },
      {
        label: '加班管理',
        key: 'overtime',
        icon: 'jack-jiaban',
        url: '/overtime'
      },
      {
        label: '节假日',
        key: 'vacations',
        icon: 'jack-jiejiarishezhi',
        url: '/vacations'
      },
      {
        label: '产能效率模板',
        key: 'rule',
        icon: 'jack-guanlimoban1',
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
    icon: 'jack-qiyeyewu',
    url: '/',
    children: [
      {
        label: '生产单列表',
        key: 'productionList',
        icon: 'jack-shengchanguanli',
        url: '/productionList'
      }
    ]
  },
  {
    label: '生产管理',
    key: 'productionManagement',
    icon: 'jack-shengchan',
    url: '/',
    children: [
      {
        label: '物料齐套检查',
        key: 'materials',
        icon: 'jack-wuliaoguanli',
        url: '/materials'
      },
      {
        label: '生产单排程',
        key: 'scheduling',
        icon: 'jack-jihuapaicheng',
        url: '/scheduling'
      }
    ]
  },
  {
    label: '进度跟踪',
    key: 'productionManagements',
    icon: 'jack-jindutiao',
    url: '/',
    children: [
      {
        label: '生产计划',
        key: 'dispatchPan',
        icon: 'jack-paigong',
        url: '/dispatchPan'
      },
      {
        label: '班组甘特图',
        key: 'resourcedMap',
        icon: 'jack-ziyuan1',
        url: '/resourcedMap'
      },
      {
        label: '生产单甘特图',
        key: 'orderChart',
        icon: 'jack-chartmixed',
        url: '/orderChart'
      },
      {
        label: '班组负荷图',
        key: 'schedulingResults',
        icon: 'jack-fuhe',
        url: '/schedulingResults'
      },
      {
        label: '生产实绩',
        key: 'actualProduction',
        icon: 'jack-shengchanpicishiji',
        url: '/actualProduction'
      }
    ]
  }
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
