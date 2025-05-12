import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../style/Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../helper/Storage';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: '',
    loading: false,
    err: []
  });

  const loginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });

    axios.post("http://localhost:8080/api/users/login", {
      email: login.email,
      password: login.password,
    })
      .then(resp => {
        const decoded = jwtDecode(resp.data.accessToken);

        const user = {
          id: resp.data.id,                  // ✅ نضيف الـ ID
          email: resp.data.email,
          token: resp.data.accessToken,
          role: decoded.role
        };

        setAuthUser(user);
        setLogin({ ...login, loading: false, err: [] });

        if (user.role === "MANAGER") {
          navigate("/Show-Tasks");
        } else {
          navigate("/my-tasks");
        }
      })
      .catch(errors => {
        const errorMsg = errors.response?.data?.message || "Login failed";
        setLogin({ ...login, loading: false, err: [errorMsg] });
      });
  };

  return (
    <div className='login-container'>
      <Form onSubmit={loginFun}>
        <h1>Login</h1>

        {login.err.map((error, index) => (
          <Alert key={index} className='p-2' variant="danger">
            {error}
          </Alert>
        ))}

        <Form.Group className="mb-3">
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        <Button
          style={{ backgroundColor: "#2c3e50" }}
          className='btn btn-dark w-100'
          type="submit"
          disabled={login.loading}
        >
          {login.loading ? "Logging in..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};
