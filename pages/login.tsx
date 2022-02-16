import React, { useEffect, useMemo, useState } from 'react';
import { Field, Formik } from "formik";
import { InputField } from '../component/fields/InputField';
import { gql, useMutation, useQuery } from '@apollo/client';
import { graphqlClient } from './_app';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!)  {
        login(email: $email, password: $password)
    }
`

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { data, loading, error }] = useMutation(LOGIN);

    // const login = async () => {
    //     const { data } = await graphqlClient.query({ query: gql(loginString) });
    //     console.log(data)
    // }


    return (
        <div className="box-center" style={{ width: '300px' }}>
            <form onSubmit={() => login({ variables: { email, password } })}>
                <input placeholder="Email" className="w-100" type="text" onChange={(ev) => setEmail(ev.target.value)} />
                <input placeholder="Password" className="w-100" type="password" onChange={(ev) => setPassword(ev.target.value)} />
                <button className="w-100" type="submit" onClick={async (e) => {
                    e.preventDefault()
                    try {
                        const yo = await login({ variables: { email, password } })
                        console.log(yo)
                    } catch (error) {
                    }
                }}>Sign in</button>
                <div>{error && 'Yo done fucked up m8.'}</div>
            </form>
        </div>
    );
};