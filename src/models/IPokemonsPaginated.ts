export type IPokemonUrl = {
    name: string;
    url: string;
}

export interface IPokemonsPaginated {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemonUrl[];
}