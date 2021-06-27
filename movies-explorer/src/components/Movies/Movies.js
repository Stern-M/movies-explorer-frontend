import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
  return(
    <>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}
export default Movies