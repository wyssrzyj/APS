import React from 'react'
import { Route, Routes } from 'react-router-dom'

// 懒加载路由 动态加载路由
const Home = React.lazy(() => import('@/pages/home'))
const Note = React.lazy(() => import('@/pages/note'))

// 登录注册页
const Login = React.lazy(() => import('@/pages/login'))
const Register = React.lazy(() => import('@/pages/register'))
const Reset = React.lazy(() => import('@/pages/login/reset'))
// 部门管理
const DepartmentManage = React.lazy(() => import('@/pages/department'))
// 角色管理
const RoleManage = React.lazy(() => import('@/pages/role'))
const Demo = React.lazy(() => import('@/pages/demo'))
//系统参数设置
const SystemSettingsWork = React.lazy(
  () => import('@/pages/systemSettings/paramsConfig')
)
// 用户管理
const UserManage = React.lazy(() => import('@/pages/systemSettings/userManage'))

//-------基础数据 开始
// 工作
const Work = React.lazy(() => import('@/pages/basicData/components/work'))
//加班
const Overtime = React.lazy(
  () => import('@/pages/basicData/components/overtime')
)
//节假日
const Vacations = React.lazy(
  () => import('@/pages/basicData/components/vacations')
)
//产能效率管理
const Rule = React.lazy(
  () => import('@/pages/basicData/components/administration/components/rule')
)

// ---业务单数据管理 开始
const ProductionList = React.lazy(
  () => import('@/pages/production/components/productionList')
)

// 班组工作日历
const WorkCalendar = React.lazy(
  () => import('@/pages/management/components/workCalendar')
)
//生产管理 物料齐套检查
const Materials = React.lazy(
  () => import('@/pages/management/components/materials')
)
//生产管理 生产单排程
const Scheduling = React.lazy(
  () => import('@/pages/management/components/scheduling')
)

//进度跟踪 生产计划
const DispatchPan = React.lazy(
  () => import('@/pages/progressTracking/dispatchPan')
)
//排程结果 - 资源甘特图
const ResourcedMap = React.lazy(
  () => import('@/pages/progressTracking/resourcemMap')
)
//排程结果 - 订单甘特图
const OrderChart = React.lazy(
  () => import('@/pages/progressTracking/orderChart')
)
//排程结果 - 资源负荷图
const SchedulingResults = React.lazy(
  () => import('@/pages/progressTracking/schedulingResults')
)
//排程结果 - 生产实绩
const ActualProduction = React.lazy(() => import('@/pages/actualProduction'))

const route = [
  { path: 'home/:id', element: <Home /> },
  { path: 'login', element: <Login /> },
  //系统参数设置
  { path: '/systemSettingsWork', element: <SystemSettingsWork /> },
  //用户管理
  { path: '/userManage', element: <UserManage /> },
  // 日历-工作
  { path: '/work', element: <Work /> },
  // 日历-加班
  { path: '/overtime', element: <Overtime /> },
  // 日历-节假日
  { path: '/vacations', element: <Vacations /> },
  //生产单列表
  { path: '/productionList', element: <ProductionList /> },
  //工作班组日历
  { path: '/materials', element: <Materials /> },
  //物料齐套检查
  { path: '/workCalendar', element: <WorkCalendar /> },
  //生产单排程
  { path: '/scheduling', element: <Scheduling /> },
  //规则排程
  { path: '/rule', element: <Rule /> },
  //生产计划查看
  { path: '/dispatchPan', element: <DispatchPan /> },
  //资源甘特图
  { path: '/resourcedMap', element: <ResourcedMap /> },
  //订单甘特图
  { path: '/orderChart', element: <OrderChart /> },
  //资源负荷图
  { path: '/schedulingResults', element: <SchedulingResults /> },
  //生产实绩
  { path: '/actualProduction', element: <ActualProduction /> },
  // 无匹配路由 放置在最后一个路由的位置
  { path: '*', element: <Home /> }
]
const RouteList = () => {
  return (
    <Routes>
      {route.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <Route path={item.path} element={item.element} />
      ))}
      {/* <Route path="home/:id" element={<Home />} /> */}
      {/* <Route path="demo" element={<Demo />} /> */}
      {/* <Route path="note" element={<Note />} /> */}

      {/* <Route path="departmentManage" element={<DepartmentManage />} /> */}
      {/* <Route path="roleManage" element={<RoleManage />} /> */}
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} /> */}

      {/* 系统参数设置 */}
      {/* <Route path="/systemSettingsWork" element={<SystemSettingsWork />} /> */}
      {/* <Route path="/userManage" element={<UserManage />} /> */}

      {/* 日历-工作 */}
      {/* <Route path="/work" element={<Work />} /> */}
      {/* 日历-加班 */}
      {/* <Route path="/overtime" element={<Overtime />} /> */}
      {/* 日历-节假日 */}
      {/* <Route path="/vacations" element={<Vacations />} /> */}
      {/* 业务单数据管理-生产单列表 */}
      {/* <Route path="/productionList" element={<ProductionList />} /> */}
      {/* 生产管理-工作班组日历 */}
      {/* <Route path="/materials" element={<Materials />} /> */}
      {/* 生产管理-物料齐套检查 */}
      {/* <Route path="/workCalendar" element={<WorkCalendar />} /> */}
      {/* 生产管理-生产单排程 */}
      {/* <Route path="/scheduling" element={<Scheduling />} /> */}

      {/* 生产管理-规则排程 */}
      {/* <Route path="/rule" element={<Rule />} /> */}
      {/* 进度跟踪 生产计划查看 */}
      {/* <Route path="/dispatchPan" element={<DispatchPan />} /> */}

      {/* 排程结果 -资源甘特图 */}
      {/* <Route path="/resourcedMap" element={<ResourcedMap />} /> */}
      {/* 排程结果 -订单甘特图 */}
      {/* <Route path="/orderChart" element={<OrderChart />} /> */}
      {/* 排程结果 -资源负荷图 */}
      {/* <Route path="/schedulingResults" element={<SchedulingResults />} /> */}
      {/* 生产实绩 */}
      {/* <Route path="/actualProduction" element={<ActualProduction />} /> */}

      {/* 无匹配路由 放置在最后一个路由的位置 */}
      {/* <Route path="*" element={<Home />} /> */}
    </Routes>
  )
}

export default RouteList
