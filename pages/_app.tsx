import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Nav from '../component/Nav';
import { createContext, useCallback, useState } from 'react';
import useLocalStorage from '@alexmarqs/react-use-local-storage';
import { Items } from '.';

export const graphqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
    }),
    ssrMode: typeof window === 'undefined',
});

export const StoreContext = createContext<any>(null);
const rawLSState = typeof window !== 'undefined' ? window.localStorage.getItem('cart') : null;
const defaultCartState = rawLSState != null ? JSON.parse(rawLSState) : [];

export default function MyApp({ Component, pageProps }: AppProps) {
    const [cart, setCart] = useLocalStorage<any>('cart', []);
    const addCartItem = (newCartItem: any) => {
        if (cart.map((item: any) => item.id).includes(newCartItem.id)) {
            return;
        }
        setCart([...cart, newCartItem])
    }
    const removeCartItem = (id: number) => {
        setCart(cart.filter((item: any) => id !== item.id))
    }

    return (
        <ApolloProvider client={graphqlClient}>
            <StoreContext.Provider value={{ cart, addCartItem, removeCartItem }}>
                <Nav>
                    <Component {...pageProps} />
                </Nav>
            </StoreContext.Provider>
        </ApolloProvider>
    );
}
