import "../styles/header.sass";
import { NavLink } from "react-router";
function Header() {
    return (
        <>
            <div className="navLink">
                <div className="logo">
                  <NavLink to="/"> <img src="logo.png" /> </NavLink>
                </div>
                <div className="links">
                  <NavLink to="/"> Accueil</NavLink>
                  <NavLink to="/Login"> Connexion</NavLink>
                  <NavLink to="/Register"> Enregistrement</NavLink>
                  <NavLink to="/Logout"> Déconnexion</NavLink>

                </div>
            </div>
        </>
    );
}

export default Header;
