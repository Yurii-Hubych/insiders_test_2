import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPokemonsPaginated, IPokemonUrl} from "../../models/IPokemonsPaginated.ts";
import {pokemonsService} from "../../services/pokemons.service.ts";
import {AxiosError} from "axios";
import {IPokemon} from "../../models/IPokemon.ts";

type PokemonsSlice = {
    pokemonsPaginated: IPokemonsPaginated;
    pokemons: IPokemon[];
}

const initialState: PokemonsSlice = {
    pokemonsPaginated: {
        results: [],
        count: 0,
        next: "",
        previous: ""
    },
    pokemons: []
}

const loadPaginatedPokemons = createAsyncThunk<IPokemonsPaginated, {limit:string, offset:string}, {rejectValue: string}>(
    "pokemons/loadPaginatedPokemons",
    async ({limit, offset}, ThunkAPI) => {
        try {
            const response = await pokemonsService.getAll(limit, offset);
            return ThunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error = e as AxiosError;
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
)

const loadPokemons = createAsyncThunk<IPokemon[], {pokemonsUrls: IPokemonUrl[]}, {rejectValue: string}>(
    "pokemons/loadPokemons",
    async ({pokemonsUrls}, ThunkAPI) => {
        try {
            const response = await Promise.all(
                pokemonsUrls.map(pokemonUrl => pokemonsService.getPokemonByName(pokemonUrl.name))
            )
            return ThunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error = e as AxiosError;
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
)

export const pokemonsSlice = createSlice({
    name: "pokemons",
    initialState: initialState,
    reducers: {
    },
    extraReducers: builder =>
        builder
            .addCase(loadPaginatedPokemons.fulfilled, (state, action) => {
                state.pokemonsPaginated = action.payload;
            })
            .addCase(loadPokemons.fulfilled, (state, action) => {
                if (state.pokemons.length > 0) {
                    state.pokemons = [...state.pokemons, ...action.payload];
                } else {
                    state.pokemons = action.payload;
                }
                console.log(state.pokemons)
            })
})

export const pokemonsActions = {
    ...pokemonsSlice.actions,
    loadPaginatedPokemons,
    loadPokemons
}