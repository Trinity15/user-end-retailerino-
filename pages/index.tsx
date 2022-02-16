import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { gql, useQuery } from '@apollo/client';
import { graphqlClient, StoreContext } from './_app';
import { ReactNode, useCallback, useContext } from 'react';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { url } from 'inspector';
import Link from 'next/link';
import useLocalStorage from '@alexmarqs/react-use-local-storage';
import { spawn } from 'child_process';

export const Items = gql`

    query {
      inventoryGroups {
      id
      itemName
      price
      displayAmount
      images {
        image {
          id
          url
        }
      }
    }
  }`;



export async function getServerSideProps(context: any) {
  const { data } = await graphqlClient.query({ query: Items });

  return {

    props: { products: data },
  };

}

const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});


export default function Home() {
  const { data, loading, error } = useQuery(Items)
  const storeContext = useContext(StoreContext);
  if (storeContext == null) return null;
  const { addCartItem } = storeContext;

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <Head>
        <title>User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="box-center" style={{ width: '300px' }}>
        {loading ? (<div style={{paddingTop: '100px', textAlign: 'center'}}>Loading...</div>) :
          (<table className="w-100">
            <thead>
              <tr>
                <td>Products</td>
                <td>Price</td>
                <td>Add</td>
              </tr>
            </thead>
            <tbody>
              {data.inventoryGroups.map((inventoryGroup: any) => (
                <tr key={inventoryGroup.id}>
                  <td>{inventoryGroup.itemName}</td>
                  <td>{euro.format(inventoryGroup.price)}</td>
                  <td><button type="submit" onClick={() => addCartItem(inventoryGroup)}>Add</button> </td>
                </tr>
              ))}
            </tbody>
          </table>)
        }
      </div>
    </div>
  )
};