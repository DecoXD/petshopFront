import { Link } from "react-router-dom";
import styles from './Navbar.module.css'
import logo from '../../assets/img/Logo.png'
import { Context } from "../../context/useContext";
import { useState, useContext } from "react";
const Navbar = () => {
    
    const {authenticated,logout} = useContext(Context)
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt="" />
                <h2 className="bold">Petshop</h2>
            </div>
            <ul>
                <li>
                    <Link to = '/'>adotar</Link>
                </li>

                {authenticated? 
                (<>
                    <Link to={`/user/profile`}>Perfil</Link>
                    <Link to={`/pets/mypets`}>Meus Pets</Link>
                    <Link to={`/pets/myadoptions`}>Minhas Adoções</Link>
                    <Link to={`/pets/add`}>Adcionar Pet</Link>
                    <li onClick={logout}>Sair</li></>) : ( <> 
                    <li>
                        <Link to = '/login'>entrar</Link>
                    </li>
                    <li>
                        <Link to = '/register'>cadastrar</Link>
                    </li>
                </>)}
               
               
            </ul>
        </nav>
  )
}

export default Navbar