import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../style/Register.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    loading: false,
    err: []
  });

  const [radioValue, setRadioValue] = useState('');

  const radios = [
    { name: 'Employee', value: 'EMPLOYEE' },
    { name: 'Manager', value: 'MANAGER' }
  ];

  const registerFun = (e) => {
    e.preventDefault();

    // ✅ Check role is selected
    if (!register.role) {
      setRegister({ ...register, loading: false, err: ["Please select a role (Employee or Manager)."] });
      return;
    }

    setRegister({ ...register, loading: true, err: [] });

    axios.post("http://localhost:8080/api/users/register", {
      name: register.name,
      email: register.email,
      password: register.password,
      role: register.role,
    })
      .then(() => {
        setRegister({ ...register, loading: false, err: [] });
        navigate("/login");
      })
      .catch(errors => {
        const errorMsg = errors.response?.data?.message || "Registration failed";
        setRegister({ ...register, loading: false, err: [errorMsg] });
      });
  };

  return (
    <div className='register-container'>
      <Form onSubmit={registerFun}>
        <h1>Register</h1>

        {register.err.map((error, index) => (
          <Alert key={index} className='p-2' variant="danger">
            {error}
          </Alert>
        ))}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={register.email}
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={register.password}
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
            required
          />
        </Form.Group>

        <ButtonGroup className="mb-3">
          <Form.Label style={{ margin: '10px' }}>User Type: </Form.Label>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="role"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
                setRegister({ ...register, role: e.currentTarget.value });
              }}
              style={{ margin: '5px', borderRadius: '8px' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <div className="mb-3 text-center">
          Already have an account?{" "}
          <Link style={{ textDecoration: 'none', fontWeight: 'bold', color: '#2c3e50' }} to="/login">
            Login here
          </Link>
        </div>

        <Button
          style={{ backgroundColor: "#2c3e50" }}
          className='btn btn-dark w-100'
          variant="primary"
          type="submit"
          disabled={register.loading}
        >
          {register.loading ? "Creating Account..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};
