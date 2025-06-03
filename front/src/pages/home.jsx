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
            const response = await fetch(`http://localhost:3000/recipes/`)
             if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setAllRecipes(await response.json());
        } catch (err) {

           setError(err.message) 
           naviguate('/Error404')
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
            {!isLoading && (
                <div className="conatiner-recipes">
                    {allRecipes.map(recipe => (
                        <div key={recipe.id}>
                            <p>{recipe.title}</p>
                            <img src={recipe.img} alt="image recette" />
                        </div>
                    ))}
                </div>
            )}
        </>
    );

}

export default Home;
