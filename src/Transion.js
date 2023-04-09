import { useState, unstable_useTransition as  useTransition, Suspense} from "react";
import {wrapPromise} from './utils'

function fetchTime(){
  return wrapPromise(
    new Promise((resolve)=>{
      setTimeout(() => {
        resolve({time: new Date().toLocaleString()})
      }, 1000);
    })
  )
}

function Clock({ resource }) {
  const { time } = resource.read();
  return <h3>{time}</h3>
}

function Button({ onClick, children }) {
  // useTransition
  // 1、允许组件在切换到下一个界面之前等待内容加载
  // 2、允许组件将速度较慢的数据更新推迟到随后渲染
  // startTransition：告诉 react 推迟展示 state
  // isPending：通知 transition 是否完成
  const [startTransition, isPending] = useTransition(2000)

  const btnOnclick = () => {
    startTransition(() => {
      onClick()
    })
  }

  return (
    <>
      <button disabled={isPending} onClick={btnOnclick}>
        {children}
      </button>
      <span>{isPending && 'isPending'}</span>
    </>
  )
}


const Transion = ()=>{
  const [time, setTime] = useState(fetchTime());
  const load = () => {
    setTime(fetchTime())
  }

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Button onClick={load}>加载</Button>
      <Clock resource={time}></Clock>
    </Suspense>
  )
}


export default Transion;
