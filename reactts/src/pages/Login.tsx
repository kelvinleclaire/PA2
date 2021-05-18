import React from 'react';
import '../assets/css/App.css';
import LoginForm from '../components/LoginForm';
import LoginRegister from '../components/LoginRegister';
import Content2Columns from "../components/layouts/Content2Columns";

function Login()
{
  return (
    <Content2Columns currentContent={<LoginForm/>} sideContent={LoginRegister}/>
  );
}

export default Login;
