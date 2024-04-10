"use client"
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './page.module.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useRouter } from 'next/navigation'

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const onFinish = async (values: any) => {
    setLoading(true);
    try {
    
      router.push('/homepage')
    } catch (error) {
      setLoading(false);
      message.error('Login failed. Please try again.');
    }
  };

  React.useEffect(() => {
    AOS.init();

  }, []);

  return (
    
    <div className="flex justify-center items-center h-screen">
      <div
        data-aos="zoom-in"
        data-aos-duration="2000"
        className="login-form-container w-full max-w-md px-4 py-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <Form name="loginForm" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
