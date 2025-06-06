import { useEffect, useState } from "react";
import "../styles/home.sass";
import { useNavigate } from "react-router";

function Home() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const naviguate = useNavigate();

    const fecthAllRecipes = async() => {
        try {
            const response = await fetch(`http://localhost:5000/recipes/`)
             if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json()
            setAllRecipes(data);
        } catch (err) {
           setError(err.message) 
        //    naviguate('/Error404')
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fecthAllRecipes();
    }, [])

    return(
        <>
            {isLoading && (
                <div>Les données charges...</div>
            )}
            {allRecipes !== 0 && !isLoading && (
                <div className="conatiner-recipes">
                    {allRecipes.data.map(recipe => (
                        <div key={recipe._id}>
                            <p>{recipe.title}</p>
                            <p>{recipe.description}</p>
                            <p>{recipe.author}</p>
                            <img src={recipe.img} alt="image recette" />
                        </div>
                    ))}
                </div>
            )}
        </>
    );

}

export default Home;
