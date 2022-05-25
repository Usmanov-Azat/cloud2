import React, { useState } from 'react'
import './navbar.css'
import Logo from '../../assets/img/navbar-logo3.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { getFiles, searchFiles } from '../../actions/file'
import { showLoader } from '../../reducers/appReducer'
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'
import { Button } from 'antd'

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth)
    const currentDir = useSelector((state) => state.files.currentDir)
    const currentUser = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value != '') {
            setSearchTimeout(
                setTimeout(
                    (value) => {
                        dispatch(searchFiles(value))
                    },
                    500,
                    e.target.value
                )
            )
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div
                className="container"
                onClick={() =>
                    window.location.replace('http://localhost:3000/')
                }
            >
                <img
                    src={Logo}
                    alt=""
                    className="navbar__logo"
                    width={50}
                    height={50}
                />
                <div className="navbar__header">TAT CLOUD</div>
                {isAuth && (
                    <input
                        value={searchName}
                        onChange={(e) => searchChangeHandler(e)}
                        className="navbar__search"
                        type="text"
                        placeholder="Название файла..."
                    />
                )}
                {!isAuth && (
                    <Button type="primary" className="navbar__login">
                        <NavLink to="/login">Авторизация</NavLink>
                    </Button>
                )}
                {!isAuth && (
                    <Button type="dashed" className="navbar__registration">
                        <NavLink to="/registration">Регистрация</NavLink>
                    </Button>
                )}
                {isAuth && (
                    <Button
                        type="primary"
                        className="navbar__login"
                        onClick={() => dispatch(logout())}
                    >
                        <span style={{ color: 'white' }}> Выход</span>
                    </Button>
                )}
                {isAuth && (
                    <NavLink to="/profile">
                        <img className="navbar__avatar" src={avatar} alt="" />
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Navbar
