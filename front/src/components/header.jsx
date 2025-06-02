import '../styles/header.css';
import { NavLink } from 'react-router';
function Header() {

  return (
    <>
    <div className='navLink'>
      <NavLink  to='/' > Accueil</NavLink>
      <NavLink  to='/Login' > Connexion</NavLink>
      <NavLink  to='/Register' > Enregistrement</NavLink>
      <NavLink  to='/Logout' > Déconnexion</NavLink>
    </div>
    </>
  )
}

export default Header;
