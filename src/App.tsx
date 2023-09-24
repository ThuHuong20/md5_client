import './main.scss'
import RouteSetup from '@routes/RouteSetup'
import './i18n/config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './stores';
import { userAction } from './stores/slices/user';
import { Modal } from 'antd';
import ChatBox from './pages/components/ChatBox';



function App() {
  const dispatch = useDispatch();
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  /* Check Token */

  useEffect(() => {
    axios.post(import.meta.env.VITE_SV_HOST + "authen/login", {
      token: localStorage.getItem("token")
    })
      .then(res => {
        if (res.status == 200) {
          dispatch(userAction.setData(res.data.data))
        } else {
          localStorage.removeItem("token")
        }
      }).catch(err => {
        // localStorage.removeItem("token")
      })
  }, [])
  useEffect(() => {
    // console.log("userStore", userStore)
  }, [userStore])

  const [openChat, setOpenChat] = useState(false);
  return (
    <>
      {
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
      }
      <RouteSetup />
    </>
  )
}

export default App



