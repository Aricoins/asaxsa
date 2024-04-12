"use client"
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './page.module.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from './redux/actions'; // Importa la acción login correctamente
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import { useSelector } from 'react-redux';	
import { PersistGate } from 'redux-persist/integration/react';
import Image from 'next/image';

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // Agregamos estado para manejar el estado de carga del botón de inicio de sesión

  const navigate = useRouter();
  const dispatch = useDispatch();


  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      await dispatch(login(email, password));
      navigate.push('/homepage');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  useSelector((state) => state);
  useEffect(() => {
    
    AOS.init();
  }, []);

  return (
   <>
   <div className="container"  data-aos="zoom-in" data-aos-duration="2000" style={{ padding: "1%", backgroundColor: "rgba(144, 144, 144, 0.2)", borderRadius: "7%", marginTop: "10%", width: "50%" }}>
      <div data-aos="zoom-in" data-aos-duration="2000" style={{ border: "black solid 1px", borderRadius: "7%", padding: "20px", backgroundColor: "white" }}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <Form name="loginForm" initialValues={{ remember: true }} 
        onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor: "rgb(77, 88, 121)"}}type="primary" htmlType="submit" block loading={loading}>
              ToDo App Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <div style= {{
      backgroundColor: "rgb(0, 0, 0, 0.3)", 
      
      height: "6%",
      width: "13%",
      fontSize: "10px", 
      margin: "auto",
      marginLeft: "60%",
      color: "white",
      fontWeight: "bold",
      textAlign: "center", 
      borderRadius: "7%",
      marginTop: "0.5%",
       }}>
      <Image src="https://www.lilhorselab.com/wp-content/uploads/2023/10/logo.png" alt="login" width={100} height={50} style={{position: "relative", width: "100%"
    }} />
      <p>Prueba técnica: Ariel Rogel </p>
    </div>
</>
);
};

const WrappedPages = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <LoginPage />
      </PersistGate>
      </Provider>
    </div>
  );
}
 export default WrappedPages;
// https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA1YjI0MzU0YzY4YTkzYjQyMjYzMzMiLCJmaXJzdE5hbWUiOiJGcm9udGVuZCIsImxhc3ROYW1lIjoiVGVzdHMiLCJlbWFpbCI6ImZyb250ZW5kLmxpbGhvcnNlQHlvcG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkREdwWEY1ejNjd2VJMzhiTDByNnZ0ZWdnejJzbXpKek5zQndDTDRPQ3ZWZjNHT1EydXhNNWkiLCJpc0Jsb2NrZWQiOmZhbHNlLCJyb2xlIjoicXVvdGVyIiwidmVyaWZpY2F0aW9uIjp7ImVtYWlsIjpmYWxzZX0sImlhdCI6MTcxMjgxMTczMywiZXhwIjoxNzEzNDE2NTMzfQ.hpeL3rSuNrzo7ry8WaiYXRnpTg9CRiqwfLzEFbtfTfw