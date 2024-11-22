import {useAppSelector} from "../../../store/store.ts";
import {IPokemon} from "../../../models/IPokemon.ts";
import PokemonComponent from "./PokemonComponent.tsx";
import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";

const PokemonsComponent = () => {

    const {pokemons} = useAppSelector(state => state.pokemonsSlice);
    const [,setSearchParams]  = useSearchParams();

    const observerRef = useRef<any>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log("Intersecting");
                    setSearchParams({limit: "15", offset: pokemons.length.toString()});
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [pokemons]);

    return (
        <div className={"flex flex-wrap p-6"}>
            {
                pokemons.map((pokemon: IPokemon, index) => {
                    const ref = index === pokemons.length - 4 ? observerRef : null;
                    return (
                        <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4" key={pokemon.id} ref={ref}>
                            <PokemonComponent pokemon={pokemon}/>
                        </div>
                    )
                })
            }
            <div className="w-full h-4"/>
        </div>
    );
};

export default PokemonsComponent;