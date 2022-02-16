import React, { useState } from 'react';
import { InputField } from '../component/fields/InputField';
import { gql, useMutation, useQuery } from '@apollo/client';
import { graphqlClient } from './_app';

const REGISTER = gql`
    mutation Register($firstname: String!,$lastname: String!, $phoneNumber: String!, $email: String!, $password: String!)  {
        register(firstname: $firstname, lastname: $lastname, phoneNumber:$phoneNumber, email: $email, password: $password)
    }
`  

export default () => {
    const [firstname, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [phoneNumber, setphno] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Re_Enter_Password, setrePassword] = useState('');
    const [register, { data, loading, error }] = useMutation(REGISTER);
    return (
                
        <div className="box-center" style={{ width: '300px' }}>
        
        <form onSubmit={() => register({ variables: { firstname,lastname, phoneNumber,email, password } })}>
           <input placeholder="FirstName" className="w-100" type="text" onChange={(ev) => setfirstName(ev.target.value)} />
           <input placeholder="LastName" className="w-100" type="text" onChange={(ev) => setlastName(ev.target.value)} />
           <input placeholder="PhoneNumber" className="w-100" type="text" onChange={(ev) => setphno(ev.target.value)} />
            <input placeholder="Email" className="w-100" type="text" onChange={(ev) => setEmail(ev.target.value)} />
            <input placeholder="Password" className="w-100" type="password" onChange={(ev) => setPassword(ev.target.value)} />
            <input placeholder="Re-enter Password" className="w-100" type="password" onChange={(ev) => setrePassword(ev.target.value)} />
            <button className="w-100" type="submit" onClick={async (e) => {
                    e.preventDefault()
                    try {
                        const yo = await register({ variables: { firstname,lastname, phoneNumber,email, password } })
                        console.log(yo)
                    } catch (error) {
                    }
                }}>Register</button>
                <div>{error && 'Yo done fucked up m8.'}</div>
          
        </form>
    </div>
       

    );
};