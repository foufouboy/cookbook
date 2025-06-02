import "../styles/recipe.sass";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function Recipe() {
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
        } catch (error) {
            navigate("/404");
        } finally {
            setLoading(false);
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
            <h1>{recipe.name}</h1>
        </div>
    );
}

export default Recipe;
