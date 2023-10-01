import './main.scss'
import RouteSetup from '@routes/RouteSetup'
import './i18n/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './stores';
import { Receipt, User, userAction } from './stores/slices/user';
import { Modal, message } from 'antd';
import ChatBox from './pages/components/ChatBox';
import { Socket, io } from 'socket.io-client';



function App() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  /* Check Token */

  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token")
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {
          if (data.status) {
            //message.success(data.message)
          } else {
            //  message.error(data.message)
          }
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setData(null))
          //message.error("logged out")
        })
        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setData(user))
        })
        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          dispatch(userAction.setReceipt(receipts))
        })
        socket.on("receiveCart", (cart: Receipt) => {
          dispatch(userAction.setCart(cart))
        })

        dispatch(userAction.setSocket(socket))
      }

    }
  }, [userStore.reload])





  // useEffect(() => {
  //   axios.post(import.meta.env.VITE_SV_HOST + "authen/login", {
  //     token: localStorage.getItem("token")
  //   })
  //     .then(res => {
  //       if (res.status == 200) {
  //         dispatch(userAction.setData(res.data.data))
  //       } else {
  //         localStorage.removeItem("token")
  //       }
  //     }).catch(err => {
  //       // localStorage.removeItem("token")
  //     })
  // }, [])
  // useEffect(() => {
  //   // console.log("userStore", userStore)
  // }, [userStore])

  const [openChat, setOpenChat] = useState(false);
  return (
    <>
      {/* {
        openChat == false
          ? <button onClick={() => {
            Modal.confirm({
              content: "Mở khung chat với tài khoản của bạn?",
              onOk: () => {
                setOpenChat(true)
              }
            })
          }} style={{ position: "fixed", right: "60px", bottom: "20px", }}>
            <img style={{ width: "150px" }} src="../images/chat.webp" alt="" />
          </button>
          : <div style={{ width: "400px", position: "fixed", right: 0, bottom: 0 }}>
            <ChatBox open={openChat} />
          </div>
      } */}
      <RouteSetup />
    </>
  )
}

export default App



