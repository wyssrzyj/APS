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
//系统参数设置
const SystemSettingsWork = React.lazy(
  () => import('@/pages/practice/systemSettings/index')
)
//-------基础数据 开始
// 工作
const Work = React.lazy(
  () => import('@/pages/practice/calendar/components/work')
)
//加班
const Overtime = React.lazy(
  () => import('@/pages/practice/calendar/components/overtime')
)
//节假日
const Vacations = React.lazy(
  () => import('@/pages/practice/calendar/components/vacations')
)
//-------基础数据 结束

// ---业务单数据管理 开始
const ProductionList = React.lazy(
  () => import('@/pages/practice/production/components/productionList')
)
// ---业务单数据管理 结束

//----------生产管理开始

//生产管理 生产单排程
const Scheduling = React.lazy(
  () => import('@/pages/practice/administration/components/scheduling')
)
//生产管理 物料齐套检查
const Materials = React.lazy(
  () => import('@/pages/practice/administration/components/materials')
)
//生产管理 规则排程
const Rule = React.lazy(
  () => import('@/pages/practice/administration/components/rule')
)
// ----------------生产管理结束

//进度跟踪 派工计划
const DispatchPan = React.lazy(
  () => import('@/pages/practice/progressTracking/dispatchPan')
)
//排程结果 - 资源甘特图
const ResourcedMap = React.lazy(
  () => import('@/pages/practice/progressTracking/resourcemMap')
)
//排程结果 - 订单甘特图
const OrderChart = React.lazy(
  () => import('@/pages/practice/progressTracking/orderChart')
)
//排程结果 - 资源负荷图
const SchedulingResults = React.lazy(
  () => import('@/pages/practice/progressTracking/schedulingResults')
)

/* ------------------------//测试 */

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
      {/* 系统参数设置 */}
      <Route path="/systemSettingsWork" element={<SystemSettingsWork />} />
      {/* 日历-工作 */}
      <Route path="/work" element={<Work />} />
      {/* 日历-加班 */}
      <Route path="/overtime" element={<Overtime />} />
      {/* 日历-节假日 */}
      <Route path="/vacations" element={<Vacations />} />
      {/* 业务单数据管理-生产单列表 */}
      <Route path="/productionList" element={<ProductionList />} />
      {/* 生产管理-生产单排程 */}
      <Route path="/scheduling" element={<Scheduling />} />
      {/* 生产管理-物料齐套检查 */}
      <Route path="/materials" element={<Materials />} />
      {/* 生产管理-规则排程 */}
      <Route path="/rule" element={<Rule />} />
      {/* 进度跟踪 派工计划查看 */}
      <Route path="/dispatchPan" element={<DispatchPan />} />

      {/* 排程结果 -资源甘特图 */}
      <Route path="/resourcedMap" element={<ResourcedMap />} />
      {/* 排程结果 -订单甘特图 */}
      <Route path="/orderChart" element={<OrderChart />} />
      {/* 排程结果 -资源负荷图 */}
      <Route path="/schedulingResults" element={<SchedulingResults />} />

      {/* 无匹配路由 放置在最后一个路由的位置 */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default RouteList
