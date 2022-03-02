import React from 'react'
import { Route, Routes } from 'react-router-dom'

// 懒加载路由 动态加载路由
const Home = React.lazy(() => import('@/pages/home'))
const Note = React.lazy(() => import('@/pages/note'))

// 登录注册页
const LoginAndRegister = React.lazy(() => import('@/pages/login'))
const LoginContent = React.lazy(() => import('@/pages/login/content'))
const Register = React.lazy(() => import('@/pages/register'))
const Reset = React.lazy(() => import('@/pages/login/reset'))
// 用户管理
const UserManage = React.lazy(() => import('@/pages/user'))
// 部门管理
const DepartmentManage = React.lazy(() => import('@/pages/department'))
// 角色管理
const RoleManage = React.lazy(() => import('@/pages/role'))
const Demo = React.lazy(() => import('@/pages/demo'))

const RouteList = () => {
  return (
    <Routes>
      <Route path="home/:id" element={<Home />} />
      <Route path="demo" element={<Demo />} />
      <Route path="note" element={<Note />} />
      <Route path="userManage" element={<UserManage />} />
      <Route path="departmentManage" element={<DepartmentManage />} />
      <Route path="roleManage" element={<RoleManage />} />
      <Route path="user" element={<LoginAndRegister />}>
        <Route path="login" element={<LoginContent />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
      </Route>
      {/* 无匹配路由 放置在最后一个路由的位置 */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default RouteList
