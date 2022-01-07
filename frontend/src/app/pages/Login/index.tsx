import { useState } from 'react';
import { NavBarComponent } from '../../components/Navbar';

import { login, isAuthenticated } from '../../Services/Auth/auth';

import './styles.css';

import { Form, Button, Spinner, Toast, Row, Col, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BASE_URL } from '../../utils/request';
import { Navigate } from 'react-router';

export const LoginPage = () => {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  function isLoading() {
    setLoading(true);
  }

  const HandleToast = () => {
    return (
      <>
        <div>
          <Row>
            <Col xs={6}>
              <ToastContainer className="p-3" position="top-center">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                  <Toast.Header>
                    <strong className="me-auto">Recruter login</strong>
                  </Toast.Header>
                  <Toast.Body>{err}</Toast.Body>
                </Toast>
              </ToastContainer>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  function handleLogin() {
    if (userEmail.length > 6 && password.length > 4) {
      const userData = {
        user_email: userEmail,
        user_password: password
      };

      isLoading();

      fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then((data) => {
          setLoading(false);
          const { error, user } = data;
          if (!error) {
            login(user);
            window.location.href = "/";
          } else {
            setErr(error);
            setShow(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setErr("Erro de conexão com o servidor!");
          setShow(true);
        })
    }
  }

  return (
    isAuthenticated()
      ? <>{<Navigate to={{ pathname: "/" }} />}</>
      : <>
        <NavBarComponent />
        <HandleToast />
        <div className="container-login">
          <Form className="container-form">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control spellCheck={false} type="email" placeholder="Seu email" onChange={(e) => setEmail(e.target.value)} required={true} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control spellCheck={false} type="password" placeholder="Sua senha" onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Salvar senha" />
            </Form.Group>
            <Button variant="primary" disabled={loading} onClick={() => handleLogin()} style={{
              width: '100%',
              background: 'grey',
            }}>
              {
                loading
                  ? <>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </>
                  : <>Entrar</>
              }
            </Button>
          </Form>
        </div>
      </>
  );
}