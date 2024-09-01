import Header from "../../сomponents/Header.jsx";
import Footer from "../../сomponents/Footer.jsx";
import toast from "react-hot-toast";
import {useContext, useEffect, useRef, useState} from "react";
import AuthContext from "../../context/AuthContext.jsx";
import {DELETE_REQUEST_OPTIONS_WITH_AUTH, GET_REQUEST_OPTIONS_WITH_AUTH} from "../../common.ts";
import Cookies from "js-cookie";

const LoginPage = () => {
    const { updateAuthorization } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const postRequestOptions = useRef({});
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentRole, setCurrentRole] = useState('');

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
        toast.success("Вы вышли из аккаунта.",{
            position: "top-center"
        });
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
                toast.success("Успешная авторизация!",{
                    position: "top-center"
                })
            } else {
                if (response.status === 400) {
                    toast.error("Неправильный логин или пароль.",{
                        position: "top-center"
                    })
                } else {
                    toast.error("Неизвестная ошибка")
                }
            }
        } catch (error) {
            toast.error("Неизвестная ошибка",{
                position: "top-center"
            })
            console.error('Error logging in', error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div>
            <Header/>
            {isAuthorized ?
                <div className="login-container">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "45%",
                        marginTop: "40px",
                        justifyContent: "space-around"
                    }}>
                        <p className="user-popup-text">Вы вошли как:</p>
                        <p className="user-popup-light-text" style={{marginTop: "8px"}}>{currentEmail}</p>
                        <p className="user-popup-light-text"
                           style={{marginTop: "12px"}}>{getRussianRoleName(currentRole)}</p>
                    </div>
                    <button onClick={handleLogout} style={{marginTop: "24px"}} className="login-popup-button">Выйти</button>
                </div>
                :
                <div className="login-container">
                    <p className="login-header-text">Войти в аккаунт</p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "65px"
                    }}>
                        <input className="login-input" type="email" placeholder="Эл. почта" onChange={handleEmailChange}
                               onKeyDown={handleKeyDown} required/>
                        <input className="login-input" type="password" placeholder="Пароль"
                               onChange={handlePasswordChange}
                               onKeyDown={handleKeyDown} required/>
                    </div>
                    <button onClick={handleSubmit} className="login-button">Войти</button>
                </div>}
            <Footer/>
        </div>
    )
}

export default LoginPage;
