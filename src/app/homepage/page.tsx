"use client"

import React, { useEffect } from 'react';
import { Button, Typography } from 'antd';
import Link from 'next/link';
import AOS from 'aos'; // Importa la librería AOS
import 'aos/dist/aos.css'; // Importa el archivo CSS de AOS

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  // Inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true // La animación se realiza solo una vez
    });
  }, []);
  return (
    <div style={{ margin: "20%", textAlign: "center" }}>
      <Title data-aos="fade-up">Welcome to the Home Page</Title>
      <Paragraph data-aos="fade-up">
        <h3>Welcome to Our Platform!</h3>
        <p>At To Do App, we understand the value of organization and task planning. Effective organization reduces stress, boosts productivity, and helps you achieve your goals efficiently.</p>
        <p>Why It Matters</p>
        <p>Being organized allows you focus on what matters most, whether it's personal projects or professional tasks. By planning your tasks effectively, you can stay on track, overcome obstacles, and reach your objectives with confidence.</p>
        <p>How We Can Help</p>
        <p>Our platform offers intuitive tools and resources to streamline your organization and task planning process. From simple task management to customizable workflows, we've got you covered.</p>
        <p>Start Today</p>
        <p>Join us today and take control of your time. Let's turn your goals into achievements together!</p>
      </Paragraph>
      <Button data-aos="fade-up"><Link href="../todos"> Add Todos </Link></Button>
    </div>
  );
};

export default Home;

