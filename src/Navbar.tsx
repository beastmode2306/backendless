import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div style={{textAlign: "left", margin: "10px", fontSize: "26px"}}>
            <Link to="/" style={{marginRight: "10px"}}>
                Главная
            </Link>
            <Link to="/reg" style={{marginRight: "10px"}}>
                Регистрация
            </Link>
            <Link to="/log" style={{marginRight: "10px"}}>
                Вход
            </Link>
            <Link to="/profile" style={{marginRight: "10px"}}>
                Профиль
            </Link>
            <Link to="/friends" style={{marginRight: "10px"}}>
                Друзья
            </Link>
        </div>
    );
};

export default Navbar;