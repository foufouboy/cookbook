import "../styles/recipe.sass";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

function Recipe() {
    const { isAdmin } = useAuthContext();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    async function fetchRecipe() {
        try {
            const response = await fetch(`http://localhost:3000/recipes/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setRecipe(await response.json());
            setLoading(false);
        } catch (error) {
            navigate("/404");
        }
    }

    async function deleteRecipe() {
        try {
            const response = await fetch(
                `http://localhost:3000/recipes/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            navigate("/");
        } catch (error) {
            setError("Erreur lors de la suppression de la recette");
        }
    }

    useEffect(() => {
        if (id) {
            fetchRecipe(id);
        }
        setLoading(false);
    }, [id]);

    return loading ? (
        <h1 className="loading">Loading...</h1>
    ) : (
        <div className="Recipe">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <img src={recipe.image} alt="Photo de la recette" />
            <h3>{recipe.author}</h3>
            <p>{recipe.date}</p>
            {isAdmin && (
                <div className="admin-actions">
                    <button onClick={() => navigate(`/edit/${id}`)}>
                        Modifier
                    </button>
                    <button onClick={deleteRecipe}>Supprimer</button>
                </div>
            )}
        </div>
    );
}

export default Recipe;
