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
    <div className="container"  data-aos="zoom-in"
    data-aos-duration="2000"
     style={{ 
    padding: "1%", backgroundColor: "rgba(144, 144, 144, 0.2)", borderRadius:"7%", marginTop:"10%", width: "50%", }}  >
      <div
        data-aos="zoom-in"
        data-aos-duration="2000"
        style={{ border: "black solid 1px" , 
        borderRadius: "7%",
        padding: "20px",
      backgroundColor: "white"}}
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
