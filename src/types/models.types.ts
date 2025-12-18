export type AutherAttributes = {
    id: number;
    name: string;
}

export type BookAttributes = {
    id: number;
    name: string;
    author_id: number;
    pages: number;
}

export type StoreAttributes = {
    id: number;
    name: string;
    address: string;
}

export type Store_BookAttributes = {
    store_id: number;
    book_id: number;
    price: number;
    copies: number;
    sold_out?: boolean;
}