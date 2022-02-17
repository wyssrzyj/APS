export const menus = [
  { label: '首页', key: 'home', icon: 'jack-home-fill', url: '/home' },
  {
    label: '系统管理',
    key: 'systemManagement',
    icon: 'jack-set',
    children: [
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
  }
]
