import React, {forwardRef, useEffect, useRef, useState} from 'react';

const LoginPopup = forwardRef((props, ref) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const postRequestOptions = useRef({});

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

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
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:7184/api/users/login", postRequestOptions.current);

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div ref={ref} className="login-popup-container">
            <p className="login-popup-text">Войти в аккаунт</p>
                <input className="login-popup-input" type="email" placeholder="Эл. почта" id="email-input" value={email}
                       onChange={handleEmailChange} required/>
                <input className="login-popup-input" type="password" placeholder="Пароль" id="password-input"
                       value={password}
                       onChange={handlePasswordChange} required/>
                <button onClick={handleSubmit} className="login-popup-button">Войти</button>
        </div>
    );
});
export default LoginPopup;