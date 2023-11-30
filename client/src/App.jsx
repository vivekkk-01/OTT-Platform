import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "../src/store/homeSlice";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Error from "./pages/error/Error";

function App() {
  const dispatch = useDispatch();

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((endpoint) =>
      promises.push(fetchDataFromApi(`/genre/${endpoint}/list`))
    );

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      console.log(genres);
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    genresCall();
    (async () => {
      const data = await fetchDataFromApi("/configuration");
      const images = {
        backdrop: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(images));
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "/:mediaType/:id", element: <Details /> },
        { path: "/search/:query", element: <SearchResult /> },
        { path: "/explore/:mediaType", element: <Explore /> },
      ],
    },
    { path: "*", element: <Error /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
