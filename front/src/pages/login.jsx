import { useState } from "react";
import "../styles/login.sass";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

function Login() {
    const { token, setBothTokens } = useAuthContext();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setBothTokens(data.token);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la connexion");
        }
    };

    return (
        <>
            <div className="container-form">
                <form onSubmit={onSubmit}>
                    <legend>Login</legend>
                    <div className="input-email">
                        <label htmlFor="email">
                            <i class="fa-solid fa-user"></i>
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-password">
                        <label htmlFor="password">
                            <i class="fa-solid fa-lock"></i>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" id="sub" value="Connexion" />
                </form>
                <p>{error}</p>
            </div>
        </>
    );
}

export default Login;
