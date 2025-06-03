import "../styles/register.sass";

function Register() {
    async function register(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log("Registration successful:", result);
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }
    return (
        <div className="Register">
            <h1>Inscription</h1>
            <form onSubmit={register}></form>
        </div>
    );
}

export default Register;
