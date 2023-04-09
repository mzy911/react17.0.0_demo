import React from 'react';
import App from './App';
import ReactDOM from 'react-dom'

// react17 调用
// 同步模式
// ReactDOM.render(<App />,  document.getElementById('root'))
// 异步模式
const root = document.getElementById('root')
ReactDOM.unstable_createRoot(root).render(<App />)



// react18 调用
// import ReactDOM from 'react-dom/client';
// root.render(
//   // 此方法打开 render 两次
//   // <React.StrictMode>  
//     <App />
//   // </React.StrictMode>
// );