import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {

    const {user, logOut} = useContext(AuthContext)

  
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                
                {
                    user?.uid ? <button className='logout' onClick={logOut}>LogOut</button>
                    :
                    <>
                    <Link to="/signup">SignUp</Link>
                    <Link to="/login">Login</Link>
                    </>
                }
                {
                    user?.email && <span className='user'>{user.email}</span>
                }
            </div>
        </nav>
    );
};

export default Header;