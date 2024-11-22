import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import PokemonsPage from "../pages/PokemonsPage.tsx";

const routes: RouteObject[] = [
    {
        path: "/", element: <MainLayout/>, children: [
            {path: "/", element: <Navigate to="/pokemons"/>},
            {path: "/pokemons", element: <PokemonsPage/>}
        ]
    }
];

export const router = createBrowserRouter(routes)