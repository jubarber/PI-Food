import { Cards } from "../Cards/Cards";
import NavBar from "../NavBar/Navbar.jsx";
import Pagination from "../Pagination/Pagination";

export const Home = () => {
  return (
    <div>
      <NavBar/>
      <Pagination/>
      <Cards/>
    </div>
  );
};