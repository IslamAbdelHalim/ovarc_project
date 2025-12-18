import Store from "../models/store.model";

export const getStoreService = async () => {
    const stores = await Store.findAll();
    return stores;
}