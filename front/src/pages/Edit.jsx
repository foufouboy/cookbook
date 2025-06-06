import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

function Edit() {
    const { isAdmin } = useAuthContext();
    const naviguate = useNavigate()
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {if(isAdmin){
        return
    }else{
     naviguate('/')
    }});

    return <>{isAdmin && (
        <p>Bonjour admin</p>
    )
    }</>;
}

export default Edit;
