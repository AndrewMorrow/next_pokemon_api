import create, { GetState, SetState } from "zustand";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

interface UserSlice {
  user: {
    id: string | null;
    firstName: string;
  };
}

const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
  user: {
    id: null,
    firstName: "Bob",
  },
});

interface CartSlice {
  cart: {
    id: string | null;
    cartItems: [];
  };
}

const createCartSlice: StoreSlice<CartSlice> = (set, get) => ({
  cart: {
    id: null,
    cartItems: [],
  },
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createUserSlice(set, get),
  ...createCartSlice(set, get),
});

const useStore = create(createRootSlice);

export default useStore;
