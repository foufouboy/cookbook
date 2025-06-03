import { use, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function Edit() {
    const { isAdmin } = useAuthContext();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {});

    return <></>;
}

export default Edit;
