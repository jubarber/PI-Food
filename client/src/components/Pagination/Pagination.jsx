import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/actions/actions";
import estilos from "./Pagination.module.css";

export default function Pagination() {
  const dispatch = useDispatch();
  const recipeState = useSelector((state) => state.recipes);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const cardsPP = useSelector((state) => state.cardsPP);
  const currentPage = useSelector((state) => state.currentPage);
  const pageNumbers = [];
  const pageFiltered = [];
  // const [currentPage, setCurrentPage] = useState(1)
  // const indexOfLastItem = currentPage * cardsPP;
  // const indexOfFirstItem = indexOfLastItem - cardsPP;
  // const currentItems = recipeState.slice(indexOfFirstItem, indexOfLastItem); //divido las tarjetas qeu se van a mostrar a partir de sus indices

  for (let i = 1; i <= Math.ceil(recipeState?.flat().length / cardsPP); i++) {
    //condiciono el for con la cantidad de recetas que tengo dividido la cantidad de recetas por pagina, entonces obtengo el numero total de paginas que tendre
    pageNumbers.push(i); // pusheo a mi arreglo el numero de paginas que voy a tener
  }

  for (let i = 1; i <= Math.ceil(filteredRecipes?.flat().length / cardsPP); i++) {
    pageFiltered.push(i);
  }

  const handlePrev = () => {
    let prevPage = currentPage - 1;
    if (currentPage > 1) {
      dispatch(changePage(prevPage));
    } else {
      alert("There is no previous page");
    }
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (filteredRecipes) {
      if (currentPage < pageFiltered.length) {
        dispatch(changePage(nextPage));
      } else {
        alert("There is no next page");
      }
    } else {
      if (currentPage < pageNumbers.length) {
        dispatch(changePage(nextPage));
      } else {
        alert("There is no next page");
      }
    }
  };

  const handleFirst = (e) => {
    e.preventDefault();
    dispatch(changePage(pageFiltered[0]));
  };

  const handleLast = (e) => {
    e.preventDefault();
    if (filteredRecipes) {
      dispatch(changePage(pageFiltered.length));
    } else {
      dispatch(changePage(pageNumbers.length));
    }
  };

  return (
    <div className={estilos.contenedorTotal}>
      <div className={estilos.container}>
        <button onClick={handlePrev} className={estilos.btn}>
          Previous
        </button>
        <button className={estilos.btnPage} onClick={handleFirst}>
          {pageFiltered[0]}
        </button>
        <div className={estilos.currentPage}>{currentPage}</div>
        <button className={estilos.btnPage} onClick={handleLast}>
          {pageFiltered.length}
        </button>
        <button onClick={handleNext} className={estilos.btn}>
          Next
        </button>
      </div>
    </div>
  );
}
