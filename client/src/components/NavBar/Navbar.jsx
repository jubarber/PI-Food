import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import estilos from './Navbar.module.css';
import { Filter } from '../Filter/Filter.jsx';
import { Sort } from '../Sort/Sort.jsx';

export default function Nav(){
  return(
    <nav className={estilos.cuerpoNav}>
      <div className={estilos.linkContainer}>
      <Link to='/home' className={estilos.link} onClick={() => window.location.reload()}>
        <span>Back</span>
      </Link>
      <Link to='/form' className={estilos.link}>
        <span>Create your recipe</span>
      </Link>
      </div>
      <div className={estilos.filter}>
        <Filter/>
      </div>
      <div className={estilos.sort}>
        <Sort/>
      </div>
      <div className={estilos.search}>
        <SearchBar/>
      </div>
    </nav>
  )
}