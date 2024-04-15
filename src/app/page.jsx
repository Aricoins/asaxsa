"use client"
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './page.module.css'; 
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from './redux/actions';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


import Image from 'next/image';
import Loading from './components/Loading';

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // State for loading button

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

  useEffect(() => {
    AOS.init();
  }, []);

  // Custom validation function for password
  const validatePassword = (_, value) => {
    // Check if password contains only numbers
    if (!/^[0-9]+$/.test(value)) {
      return Promise.reject(new Error('Password must contain only numbers'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <div className="container" data-aos="zoom-in" data-aos-duration="2000" style={{ padding: '1%', backgroundColor: 'rgba(144, 144, 144, 0.2)', borderRadius: '7%', marginTop: '10%', width: '50%' }}>
        <div data-aos="zoom-in" data-aos-duration="2000" style={{ border: 'black solid 1px', borderRadius: '7%', padding: '20px', backgroundColor: 'white' }}>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <Form name="loginForm" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }, { validator: validatePassword }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button style={{ backgroundColor: 'rgb(77, 88, 121)' }} type="primary" htmlType="submit" block loading={loading}>
                ToDo App Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.3)', height: '6%', width: '13%', fontSize: '10px', margin: 'auto', marginLeft: '60%', color: 'white', fontWeight: 'bold', textAlign: 'center', borderRadius: '7%', marginTop: '0.5%' }}>
        <Image src="https://www.lilhorselab.com/wp-content/uploads/2023/10/logo.png" alt="login" width={100} height={50} style={{ position: 'relative', width: '100%' }} />
        <p style={{ backgroundColor: 'black', fontSize: '6px' }}>Technical Test: Ariel Rogel </p>
      </div>
    </>
  );
};

const WrappedPages = () => {
  return (
    <div>
      <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}> 

        <LoginPage />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default WrappedPages;
