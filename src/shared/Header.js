import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { removeAuthUser, getAuthUser } from '../helper/Storage';
import { useNavigate } from 'react-router-dom';
import '../style/Header.css';
import { Nav } from 'react-bootstrap';

export const Header = () => {

  const navigate = useNavigate();
  const auth = getAuthUser();

  const Logout = () => {
    removeAuthUser();
    navigate("/login");
  };

  return (
    <Navbar style={{ padding: '10px 40px', backgroundColor: '#2c3e50' }}>
      <Navbar.Brand>
        <Link style={{ color: 'white', fontFamily: 'cursive', fontSize: '20px' }} className="nav-link" to={"/"}>
          Task Management
        </Link>
      </Navbar.Brand>

      <Nav className="me-auto">
        {auth && auth.role === 'MANAGER' && (
          <>
           
            <Link style={{ color: 'white' }} className='nav-link' to={'/Add-Task'}>Add Task</Link>
            <Link style={{ color: 'white' }} className='nav-link' to={'/Show-Tasks'}>All Tasks</Link>
          </>
        )}

        {auth && auth.role === 'EMPLOYEE' && (
        <>
          <Link style={{ color: 'white' }} className='nav-link' to={'/my-tasks'}>My Tasks</Link>
          <Link style={{ color: 'white' }} className='nav-link' to={'/dashboard'}>Dashboard</Link>
        </>

        )}
      </Nav>

      <Nav className="ms-auto">
        {!auth && (
          <>
            <Link style={{ color: 'white' }} className='nav-link' to={'/register'}>Register</Link>
            <Link style={{ color: 'white' }} className='nav-link' to={'/login'}>Login</Link>
          </>
        )}

        {auth && (
          <Link style={{ color: 'white' }} className='nav-link' onClick={Logout}>Logout</Link>
        )}
      </Nav>
    </Navbar>
  );
};
