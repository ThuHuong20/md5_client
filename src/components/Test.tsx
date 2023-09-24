/* Higer Order Component */
/* memo la 1 HOC  */

import { memo } from 'react'
import { Prop } from '@/pages/products/Product';
const Test = (data: Prop) => {
  const { count, handlePrintCount } = data;
  console.log("renser test");
  return (
    <div>
      hello test {count}
      <div>
        <button onClick={() => {
          handlePrintCount(count)
        }}>TANG test</button>
      </div>
    </div>
  )
}
export default memo(Test)

