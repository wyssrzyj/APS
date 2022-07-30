/*
 * @Author: your name
 * @Date: 2022-03-02 15:41:46
 * @LastEditTime: 2022-07-30 14:02:41
 * @LastEditors: lyj
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jack-aps\src\components\Icon\index.tsx
 */
import { createFromIconfontCN } from '@ant-design/icons'

// const url = 'https://at.alicdn.com/t/font_2462182_aupj9cvqa8j.js'
// const Icon = createFromIconfontCN({ scriptUrl: url })//icon

const Icon = createFromIconfontCN({
  scriptUrl: '/iconFont/iconfont.js'
})

export default Icon
