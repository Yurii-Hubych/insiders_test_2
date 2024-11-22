import axios from "axios";
import {IPokemonsPaginated} from "../models/IPokemonsPaginated.ts";
import {IPokemon} from "../models/IPokemon.ts";


const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
    timeout: 10000,
    headers: {
    }
});

const pokemonsService = {
    getAll: async (limit:string, offeset:string):Promise<IPokemonsPaginated> => {
        try {
            const response = await axiosInstance.get(`/pokemon?limit=${limit}&offset=${offeset}`);
            return response.data;
        }
        catch (e) {
            console.error(e);
            return {
                count: 0,
                next: "",
                previous: "",
                results: []
            }
        }
    },

    getPokemonByName: async (name: string):Promise<IPokemon> => {
        try {
            const response = await axiosInstance.get(`/pokemon/${name}`);
            return response.data;
        }
        catch (e) {
            console.error(e);
            return {
                id: 0,
                name: "",
                sprites: {
                    front_default: ""
                }
            }
        }
    }
}

export {
    pokemonsService
}