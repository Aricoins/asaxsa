"use client"
import React, { useEffect } from 'react';
import { Button, Typography, Card, Modal } from 'antd';
import Link from 'next/link';
import AOS from 'aos'; // Importa la librería AOS
import 'aos/dist/aos.css'; // Importa el archivo CSS de AOS
import {useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import {store} from '../redux/store';
import TokenValidator from '../components/TokenValidator';
import styles from './homepage.module.css';
import { logout } from '../redux/actions';
import avatardefault from '../../assets/avatardefault.png';
import { RxAvatar } from "react-icons/rx";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const userGlobal = user[0] 
  const tokenGlobal = token[0]
  const globalAvatar = user.avatar || avatardefault; 

  console.log(tokenGlobal, "tokenGlobal")
  const router = useRouter();
  if (!tokenGlobal) {
    alert("This route is exclusive to authenticated users with the quoter role.")
    router.push(' ./')
  } 
else { 
  console.log( userGlobal, "Datos del usuario global en homepage")
}
if (!userGlobal) {
  Modal.error({
    title: 'Access Denied',
    content: 'This route is exclusive to authenticated users with the quoter role.',
    okText: 'OK',
    onOk() {
      router.push('/');
    },
  });
}


  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
         });
  }, []);
  console.log(userGlobal, "usuario antes del return")

  console.log(tokenGlobal, "token antes del return")
  
  // const handleLogout = async () => {
  //   const id =  userGlobal.id;
  //   logout(id);
  //     navigate.push('/');
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   } 
  // };


  return (
   userGlobal ? 
   <div className="container-fluid text-right w-2">
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="card bg-white shadow-md rounded-lg">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <div style={{fontSize: "120px", display: "flex", justifyContent: "center", alignSelf: "center", margin: "auto" }}>
                  <RxAvatar  />  
                                        <div>
                    <h2 className="card-title text-lg font-semibold text-gray-800 m-3 p-3">My Profile:</h2></div>
                  </div>
                  
                <TokenValidator token={tokenGlobal} />
                <p className="text-3xl text-amber-500">Firstname: {userGlobal.firstName}</p>
                <p className="justify-right">Lastname: {userGlobal.lastName}</p>
                <p className="bg-red">Email: {userGlobal.email}</p>
                <p className="text-4xl">Role: {userGlobal.role}</p>
              </div>
              
              </div>
            <button
                    onClick={logout()}
                    className="text-primary"
                  >
                    Logout
                  </button>
            </div>
          </div>
          
          <div className="col-md-6 bg-white bg-opacity-70 p-10 m-20 text-center"> 
  
      <Title data-aos="fade-up">Welcome Todo App </Title>
      <Paragraph data-aos="fade-up">
        <p>At To Do App, we understand the value of organization and task planning. Effective organization reduces stress, boosts productivity, and helps you achieve your goals efficiently.</p>
        <p data-aos="fade-up">Why It Matters</p>
        <p>Being organized allows you focus on what matters most, whether it's personal projects or professional tasks. By planning your tasks effectively, you can stay on track, overcome obstacles, and reach your objectives with confidence.</p>
        <p data-aos="fade-up">How We Can Help</p>
        <p>Our platform offers intuitive tools and resources to streamline your organization and task planning process. From simple task management to customizable workflows, we've got you covered.</p>
        
      </Paragraph>
      <Button data-aos="fade-up" className={styles.botontodos}><Link href="./todos"> Join us today </Link></Button>
      <p> ... and take control of your time. Let's turn your goals into achievements together!</p>
    </div>
    </div>
    </div>
   : <h2>Login</h2> 
  )
    

};

const WrappedProvider = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
export default WrappedProvider;
