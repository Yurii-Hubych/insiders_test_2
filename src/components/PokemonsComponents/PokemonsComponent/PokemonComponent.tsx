import {IPokemon} from "../../../models/IPokemon.ts";
import {FC} from "react";

type IProps = {
    pokemon: IPokemon;
}

const PokemonComponent: FC<IProps> = ({pokemon}) => {
    return (
        <div className="w-full p-4 border border-gray-300 rounded shadow-md flex flex-col items-center gap-2">
            <h2 className="text-center text-lg font-semibold ">{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-40 h-40 object-contain"/>
        </div>
    );
};

export default PokemonComponent;