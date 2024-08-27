import { forwardRef, useEffect, useRef, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import 'react-loading-skeleton/dist/skeleton.css';
import AuthContext from '../context/AuthContext';
import LoginSkeleton from "./skeletons/LoginSkeleton";
import {DELETE_REQUEST_OPTIONS_WITH_AUTH, GET_REQUEST_OPTIONS_WITH_AUTH} from "../common";

const LoginPopup = forwardRef((props, ref) => {
    const { updateAuthorization } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const postRequestOptions = useRef({});
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentRole, setCurrentRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const getRussianRoleName = (role) => {
        switch (role.toLowerCase()) {
            case "admin": return "Администратор";
            case "user": return "Пользователь";
            case "staff": return "Сотрудник ВУЗа";
            case "groupleader": return "Староста группы";
            default: return "";
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogout = async () => {
        await fetch('https://localhost:7184/api/users/logout', DELETE_REQUEST_OPTIONS_WITH_AUTH);
        setIsAuthorized(false);
        setCurrentEmail('');
        updateAuthorization(false, "");
    };

    const checkAuthorization = async () => {
        const value = Cookies.get("auth");
        if (value === "true") {
            const response = await fetch('https://localhost:7184/api/users/me', GET_REQUEST_OPTIONS_WITH_AUTH);
            if (response.ok) {
                const data = await response.json();
                setCurrentEmail(data.email);
                setCurrentRole(data.role);
                setIsAuthorized(true);
                updateAuthorization(true, "edit");
            } else {
                setIsAuthorized(false);
                setCurrentEmail('');
                setCurrentRole('');
                updateAuthorization(false, "");
            }
        } else {
            setIsAuthorized(false);
            setCurrentEmail('');
            setCurrentRole('');
            updateAuthorization(false, "");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuthorization();
    }, [checkAuthorization]);

    useEffect(() => {
        postRequestOptions.current = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        };
    }, [email, password]);

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        try {
            const response = await fetch("https://localhost:7184/api/users/login", postRequestOptions.current);
            setPassword("");

            if (response.ok) {
                setIsAuthorized(true);
                await checkAuthorization();
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    if (isLoading) {
        return (
            <div ref={ref} className="login-popup-container">
                <LoginSkeleton/>
            </div>
        );
    }

    return (
        <div ref={ref} className="login-popup-container">
            {isAuthorized ?
                <div style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    height: "246px",
                    padding: "20px 0 10px 0"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "45%", justifyContent: "space-around" }}>
                        <p className="user-popup-text">Вы вошли как:</p>
                        <p className="user-popup-light-text">{currentEmail}</p>
                        <p className="user-popup-light-text" style={{ marginTop: "8px" }}>{getRussianRoleName(currentRole)}</p>
                    </div>
                    <button onClick={handleLogout} className="login-popup-button">Выйти</button>
                </div>
                :
                <div style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    height: "246px"
                }}>
                    <p className="login-popup-text">Войти в аккаунт</p>
                    <input className="login-popup-input" type="email" placeholder="Эл. почта" id="email-input"
                           value={email}
                           onChange={handleEmailChange}
                           onKeyDown={handleKeyDown} required />
                    <input className="login-popup-input" type="password" placeholder="Пароль" id="password-input"
                           value={password}
                           onChange={handlePasswordChange}
                           onKeyDown={handleKeyDown} required />
                    <button onClick={handleSubmit} className="login-popup-button">Войти</button>
                </div>}
        </div>
    );
});
export default LoginPopup;
