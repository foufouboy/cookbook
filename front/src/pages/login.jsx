import { useEffect, useState } from "react";
import "../styles/login.sass";

function Login() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [datas, setDatas] = useState([]);
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();

            if(response.ok){
                setDatas(data)
            }else{
                setError(data.message)
            }

        } catch (err) {
            setError('Erreur lors de la connexion')
        }
    }

    return (
        <>
            <div className="container-form">
                <form onSubmit={onSubmit}>
                    <legend>Login</legend>
                    <div className="input-email">
                        <label htmlFor="email"><i class="fa-solid fa-user"></i></label>
                       <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-password">
                        <label htmlFor="password"><i class="fa-solid fa-lock"></i></label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                   
                    <input type="submit" id="sub" value="Connexion" />
                </form>
                <p>{error}</p>
            </div>
        </>
    );
}

export default Login;
