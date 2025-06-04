import "../styles/register.sass";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import validator from "validator";

function Register() {
    const { setBothTokens, token } = useAuthContext();
    const navigate = useNavigate();

    const [somethingsWrong, setSomethingWrong] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [mismatchedPasswords, setMismatchedPasswords] = useState(false);

    async function register(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setSomethingWrong(false);
        setInvalidEmail(false);
        setInvalidUsername(false);
        setInvalidPassword(false);
        setMismatchedPasswords(false);
        if (data.password !== data.confirmPassword) {
            setMismatchedPasswords(true);
            setSomethingWrong(true);
        }

        if (!validator.isEmail(data.email)) {
            setInvalidEmail(true);
            setSomethingWrong(true);
        }
        if (!validator.isAlphanumeric(data.username)) {
            setInvalidUsername(true);
            setSomethingWrong(true);
        }
        if (!validator.isStrongPassword(data.password)) {
            setInvalidPassword(true);
            setSomethingWrong(true);
        }
        if (somethingsWrong) {
            console.error("Form validation failed");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                const result = await response.json();
                setBothTokens(result.token);
                console.log("Registration successful:", result);
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }
    return (
        <div className="Register">
            <h1>Inscription</h1>
            <form onSubmit={register}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    className={invalidUsername ? "border-red" : ""}
                    type="text"
                    id="username"
                    name="username"
                    required
                />
                {invalidUsername && (
                    <p className="error">
                        Le nom d'utilisateur doit être alphanumérique.
                    </p>
                )}
                <label htmlFor="email">Email</label>
                <input
                    className={invalidEmail ? "border-red" : ""}
                    type="text"
                    id="email"
                    name="email"
                    required
                />
                {invalidEmail && (
                    <p className="error">Veuillez entrer un email valide.</p>
                )}
                <label htmlFor="password">Mot de passe</label>
                <input
                    className={invalidPassword ? "border-red" : ""}
                    type="password"
                    id="password"
                    name="password"
                    required
                />
                {invalidPassword && (
                    <p className="error">
                        Le mot de passe doit être fort (au moins 8 caractères,
                        une majuscule, une minuscule, un chiffre et un symbole).
                    </p>
                )}
                <label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                </label>
                <input
                    className={mismatchedPasswords ? "border-red" : ""}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                />
                {mismatchedPasswords && (
                    <p className="error">
                        Les mots de passe ne correspondent pas.
                    </p>
                )}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;
