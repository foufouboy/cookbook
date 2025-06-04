import "../styles/register.sass";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

function Register() {
    const { setBothTokens, token } = useAuthContext();
    const navigate = useNavigate();
    async function register(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
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
                <input type="text" id="username" name="username" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;
