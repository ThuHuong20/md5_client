import './login.scss'
import { FormEvent, memo, useEffect, useState } from 'react'
import api from "../../services/api";
import Loading from '../components/Loading'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal, message } from 'antd';
import { useTranslation } from 'react-i18next'
import ForgotPassword from './ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '@/stores';
import { userAction } from '@/stores/slices/user';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '@/firebase';
import { User } from 'firebase/auth';

interface UserGoogle extends User {
  accessToken: string
}

const Login = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })

  async function login(event: FormEvent) {
    event.preventDefault();

    let User = {
      userNameOrEmail: (event.target as any).userName.value,
      password: (event.target as any).password.value
    }


    await api.userApi.login(User)
      .then(res => {
        console.log("res", res)
        if (res.status == 200) {
          message.success("Login successfully")
          localStorage.setItem("token", res.data.token);
          dispatch(userAction.reload())
        }
        if (res.status == 213) {
          message.warning(res.data.message)
        }

      })
  }

  useEffect(() => {
    if (userStore.data) {
      navigate('/')
    }
  }, [userStore.data])

  async function handleLoginWithGoogle() {
    try {
      await googleLogin()
        .then(async (res) => {
          let data = {
            accessToken: (res.user as UserGoogle).accessToken,
            email: res.user.email,
            userName: res.user.email,
            password: res.user.uid
          }
          await api.userApi.googleLogin(data)
            .then(res => {
              if (res.status == 200) {
                localStorage.setItem("token", res.data.token);
                dispatch(userAction.reload())
              }
            })
            .catch(err => {
              alert("Google Login Failed")
            })
        })
        .catch(err => {
          window.alert("Login Google Failed")
        })

    } catch (err) {
      window.alert("Login Google Thất bại, thử lại!")
    }
  }

  return (

    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card bgr" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="../images/logoin.jpg"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={(e) => {
                    login(e)
                  }}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      {/* <img style={{ width: "80px" }} src="https://icon-library.com/images/cake-icon/cake-icon-9.jpg" alt="" /> */}
                      <span className="h1 fw-bold mb-0">
                        <img style={{ width: "120px" }} src="../images/logo.png" alt="" />
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1, marginTop: "7px" }}
                      >
                        Log in with your account or
                      </h5>
                      <div onClick={() => {
                        handleLoginWithGoogle()
                      }}>
                        <img style={{ width: "30px", height: "30px" }} src="https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg" alt="" />
                      </div>

                    </div>

                    <div className="form-outline mb-4">
                      <input
                        name='userName'
                        id="form2Example17"
                        className="form-control form-control-lg"
                        placeholder="UserName or Email"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        placeholder={t('password')}
                      />

                    </div>
                    <div className="pt-1 mb-4">
                      {
                        load && <Loading />
                      }
                      <button style={{ color: "white", backgroundColor: "black", display: "flex", justifyContent: "center" }}
                        className={`${load && 'active'} btn_submit btn btn-sucsess btn-lg btn-block`}
                        type="submit"
                      >
                        <p> {t('login')}</p>
                        <div className='btn_loading'>
                          <Spin indicator={antIcon} />
                        </div>
                      </button>

                    </div>
                    <p className="small text-muted">
                      {/* {t('forgotPassword')} */}
                      <ForgotPassword />
                    </p>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      {t('doneacount')}
                      <a href="/register" style={{ color: "#393f81" }}>
                        {t('here')}
                      </a>
                    </p>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default memo(Login)

