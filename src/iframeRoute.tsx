/*
 * @Author: lyj
 * @Date: 2022-06-10 13:16:47
 * @LastEditTime: 2022-06-10 15:46:42
 * @Description:
 * @LastEditors: lyj
 */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
const IframeDate = React.lazy(
  () => import('@/iframe/components/completeGantt/index')
)
const RouteList = () => {
  return (
    <Routes>
      <Route path="iframeDate" element={<IframeDate />} />
    </Routes>
  )
}

export default RouteList
