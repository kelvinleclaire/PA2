import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/App.css';
import Header from "../components/layouts/Header";
import Content from "../components/layouts/Content";
import Sidebar from "../components/layouts/Sidebar";
import Login from './Login';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { propTypes } from 'react-bootstrap/esm/Image';
import { CurrentUserProvider } from '../contexts/userContext';

type AppProps = {
  currentContent: () => JSX.Element;
}

const App: FC<AppProps> = (appProps: AppProps): JSX.Element => {
  return (
    <Row noGutters className="align-items-stretch w-100">{/* Make all the columns stretch to top and bottom*/}
      <Col xs="1" className="SidebarWrapper bg-dark">
        <Sidebar/>
      </Col>
      <Col className="d-flex flex-column">{/* Set column-mode to have elements stacked up, not side-by-side*/}
        <Header/>
        {/* TODO: make content interchangeable, see Content.tsx */}
        <Content currentContent={appProps.currentContent}/>
      </Col>
    </Row>
  );
}

export default App;
