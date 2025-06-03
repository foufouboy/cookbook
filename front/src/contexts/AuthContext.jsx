import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false);

    async function checkAdminStatus() {
        if (token) {
            try {
                const response = await fetch("http://localhost:3000/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }

    const setBothTokens = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken !== token) {
            setToken(storedToken);
        }
        checkAdminStatus();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setBothTokens, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
