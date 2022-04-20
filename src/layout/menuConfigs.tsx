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
        key: 'user',
        icon: 'jack-yonghu3',
        url: '/userManage'
      },

      {
        label: '部门管理',
        key: 'department',
        icon: 'jack-viewgallery',
        url: '/departmentManage'
      },
      {
        label: '角色管理',
        key: 'role',
        icon: 'jack-jiaoseguanli1',
        url: '/roleManage'
      }
    ]
  },
  {
    label: '日历管理',
    key: 'management',
    icon: 'jack-rili',
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
      }
    ]
  },
  {
    label: '产能效率管理',
    key: 'capacity',
    icon: 'jack-channengxiaoshuai-01',
    url: '/',
    children: [
      {
        label: '产能效率模板',
        key: 'rule',
        icon: 'jack-guanlimoban1',
        url: '/rule'
      }
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
        label: '派工计划',
        key: 'dispatchPan',
        icon: 'jack-paigong',
        url: '/dispatchPan'
      },
      {
        label: '排程结果',
        key: 'schedulingResults',
        icon: 'jack-xianshijieguo',
        url: '/schedulingResults',
        children: [
          {
            label: '资源甘特图',
            key: 'resourcedMap',
            icon: 'jack-ziyuan1',
            url: '/resourcedMap'
          },
          {
            label: '订单甘特图',
            key: 'orderChart',
            icon: 'jack-chartmixed',
            url: '/orderChart'
          },
          {
            label: '资源负荷图',
            key: 'sjack-xianshijieguo2',
            icon: 'jack-fuhe',
            url: '/schedulingResults'
          }
        ]
      }
    ]
  }
]
