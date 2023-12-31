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
import { guestCartActions } from './stores/slices/guestCart.slice';



function App() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })

  useEffect(() => {
    dispatch(guestCartActions.setCart(JSON.parse(localStorage.getItem("cart") || "[]")))
  }, [])
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
            // message.success(data.message)
          } else {
            localStorage.removeItem("token")
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

        socket.on("cash-status", (status: boolean) => {
          if (status) {
            Modal.success({
              title: "Payment has been successful",
              content: "Thank you for your purchase",
              onOk: () => {
                console.log("đã vào!")
                window.location.href = "/recipt"
              }
            })
          }
        })

        socket.on("payQr", (url: string | null) => {
          dispatch(userAction.setCartPayQr(url))
          if (!url) {
            Modal.confirm({
              title: "Payment failed",
              content: "Do you want to pay again?",
              onOk: () => {
                socket.emit("payZalo", {
                  receiptId: userStore.cart?.id,
                  userId: userStore.data?.id
                })
              }
            })
          }
        })

        dispatch(userAction.setSocket(socket))
      }

    }
  }, [userStore.reload])


  const [openChat, setOpenChat] = useState(false);
  return (
    <>
      {
        openChat == false
          ? <button onClick={() => {
            setOpenChat(true)
          }} style={{ position: "fixed", right: "60px", bottom: "20px", }}>
            <img style={{ width: "150px" }} src="../images/chat.webp" alt="" />
          </button>
          : <div style={{ width: "400px", position: "fixed", right: 0, bottom: 0 }}>
            <ChatBox open={openChat} setOpenChat={setOpenChat} />
          </div>
      }
      <RouteSetup />
    </>
  )
}

export default App



