import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/UI/Button/MyButton.jsx';
import MyInput from '../components/UI/input/MyInput.jsx';

function Authorization(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('auth_token', '0');

    const login_request = async (event) => {
        event.preventDefault();

        const credentials = {
            'login': login,
            'password': password
        };

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            
            if (data['status'] != 'error')
            {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('auth_token', data['auth_token'])
                navigate('/worksession');
            }

        } 
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="Authorization">
            <h2>Авторизация</h2>
            <form onSubmit={login_request}>
                <div>
                <MyInput 
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    tdt='input'
                />
                </div>
                <div>
                <MyInput 
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    tdt='input'
                />
                </div>
                <MyButton type="submit" title="Войти">Войти</MyButton>
            </form>
            
        </div>
    );
}

export default Authorization;
