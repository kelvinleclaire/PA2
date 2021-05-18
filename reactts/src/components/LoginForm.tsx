import React, { FC, useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Role from '../util/UserEnum';
import IUser from '../Models/IUser';
import { checkLoginData, useLoginUser } from "../util/BackendCommunication";
import { useSetCurrentUserState } from '../contexts/userContext';
import IHookResult from '../Models/IHookResult';
import useDidMountEffect from '../util/useDidMountEffect';


const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentialsToSubmit, setCredentialsToSubmit] = useState({'username': '', 'password': ''});
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const openWorker = useCallback(() => history.push("/worker"), [history]);
  const openPreWorker = useCallback(() => history.push("/preworker"), [history]);
  const userResult: IHookResult<IUser> = useLoginUser(credentialsToSubmit.username, credentialsToSubmit.password);
  const loadedUser = userResult.result;

  useDidMountEffect(() => {
    finishLogin(loadedUser);
  }, [loadedUser]);

  function HandleSubmit(event: any)
  {
    event.preventDefault();
    window.sessionStorage.removeItem("currentUser");
    setCredentialsToSubmit({'username': username, 'password': password});
  }

  const finishLogin = (user: IUser) => {
    console.log("valid: " + user.loggedIn + " + Role: " + user.role);

    //TODO: use Role enum (also in Backend!)
    if (user.loggedIn)
    {
      window.sessionStorage.setItem("currentUser", JSON.stringify(user));


      switch (user.role)
      {
        case Role.worker:
          openWorker();
          break;
        case Role.preworker:
          openPreWorker();
          break;

        default:
          setErrorMsg("Unknown role");
          break;
      }


    } else
    {
      setErrorMsg("Username or Password invalid");
    }
  }

  function handleUsernameChange(event: any)
  {
    event.preventDefault();
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: any)
  {
    event.preventDefault();
    setPassword(event.target.value);
  }

  return (
    <div className="LoginForm">
      <Form onSubmit={HandleSubmit}>
        <Form.Group controlId="formBasicEmail" id="formInput">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" onChange={handleUsernameChange}/>
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" id="formInput">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out"/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <span>{errorMsg}</span>
      </div>
    </div>
  );
}

export default LoginForm;
