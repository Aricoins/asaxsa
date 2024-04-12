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

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: any) => state.user);
  const userGlobal = user[0] 
  const tokenGlobal = token[0]

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
  return (
 user[0] ? (
  <>
  
<div className='flex flex-row'>

  <Card className="w-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
  <div className="p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Mi perfil:</h2>
    <TokenValidator token={tokenGlobal} />
    <p className="text-primary">Firstname: {userGlobal.firstName}</p>
    <p className="text-primary">Lastname: {userGlobal.lastName}</p>
    <p className="text-primary">Email: {userGlobal.email}</p>
    <p className="text-primary">Role: {userGlobal.role}</p>
  </div>
</Card>    <div style={{ backgroundColor: "white", padding: "10%", margin: "20%", textAlign: "center" }}>
      <Title data-aos="fade-up">Welcome to the Home Page </Title>
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
      <Button data-aos="fade-up"><Link href="./todos"> Add Todos </Link></Button>
    </div>
    </div>
  </>
  
) : <h2>Login</h2> 
    
     
  );
};

const WrappedProvider = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
export default WrappedProvider;
