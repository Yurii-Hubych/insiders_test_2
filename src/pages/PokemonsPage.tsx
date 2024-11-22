import PokemonsComponent from "../components/PokemonsComponents/PokemonsComponent/PokemonsComponent.tsx";
import {useAppDispatch} from "../store/store.ts";
import {useEffect, useState} from "react";
import {pokemonsActions} from "../store/slices/pokemonsSlice.ts";
import {useSearchParams} from "react-router-dom";

const PokemonsPage = () => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const [paramsInitialized, setParamsInitialized] = useState(false);

    useEffect(() => {
        const fetchPokemons = async ()   => {
            const limit = paramsInitialized ? searchParams.get("limit") || "15" : "15";
            const offset = paramsInitialized ? searchParams.get("offset") || "0" : "0";
            const {payload} = await dispatch(pokemonsActions.loadPaginatedPokemons({limit, offset}));
            if (payload && !(typeof payload === "string")) {
                const pokemonsUrls = payload.results;
                dispatch(pokemonsActions.loadPokemons({pokemonsUrls}))
            }
            setParamsInitialized(true);
        }

        fetchPokemons();
    }, [searchParams]);

    return (
        <div>
            <PokemonsComponent/>
        </div>
    );
};

export default PokemonsPage;