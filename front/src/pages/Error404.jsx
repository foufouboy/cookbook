import "../styles/Error404.sass";
import { Link } from "react-router";
function Error404() {
    return <>
        <div className="container-error">
            <h1>404</h1>
            <h2>Pages introuvables</h2>
            <Link to={'/'}>retour à l'accueil</Link>
        </div>
    </>;
}

export default Error404;
