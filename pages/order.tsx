import React, { useState } from 'react';
import { InputField } from '../component/fields/InputField';
import { gql, useMutation, useQuery } from '@apollo/client';
import { graphqlClient } from './_app';

const Address = gql`
    mutation createAddress ($street: String!,$city: String!, $zip: String!, $country: String!)  {
        address(street: $street, city: $city, zip:$zip, country: $country)
    }
`

export default () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        email: '',
        password: '',
        matchPassword: '',
    });
    const [address, setAddress] = useState({
        street: '',
        zip: '',
        city: '',
        country: '',
    });
    return (

        <div className="box-center" style={{ width: '300px' }}>
            <form>
                <input placeholder="FirstName" className="w-100" type="text" onChange={(ev) => setUser((oUser) => ({...oUser, firstname: ev.target.value }))} />
                <input placeholder="LastName" className="w-100" type="text" onChange={(ev) => setUser((oUser) => ({...oUser, lastname: ev.target.value }))}  />
                <input placeholder="PhoneNumber" className="w-100" type="text" onChange={(ev) => setUser((oUser) => ({...oUser, phonenumber: ev.target.value }))}  />
                <input placeholder="Email" className="w-100" type="text" onChange={(ev) => setUser((oUser) => ({...oUser, email: ev.target.value }))}  />
                <input placeholder="Password" className="w-100" type="password" onChange={(ev) => setUser((oUser) => ({...oUser, password: ev.target.value }))}  />
                <input placeholder="Re-enter Password" className="w-100" type="password" onChange={(ev) => setUser((oUser) => ({...oUser, matchPassword: ev.target.value }))}  />
                <input placeholder="Street" className="w-100" type="text" onChange={(ev) => setAddress((oAddress) => ({...oAddress, street: ev.target.value }))} />
                <input placeholder="Zip" className="w-100" type="text" onChange={(ev) => setAddress((oAddress) => ({...oAddress, zip: ev.target.value }))} />
                <input placeholder="City" className="w-100" type="text" onChange={(ev) => setAddress((oAddress) => ({...oAddress, city: ev.target.value }))} />
                <input placeholder="Country" className="w-100" type="text" onChange={(ev) => setAddress((oAddress) => ({...oAddress, country: ev.target.value }))} />
                <button className="w-100" type="submit" onClick={async (e) => {
                    e.preventDefault()
                    console.log(user)
                    console.log(address)
                    try {
                        
                    } catch (error) {
                    }
                }}>Register</button>
                {/* <div>{error && 'Yo done fucked up m8.'}</div> */}
            </form>
        </div>

    )
}
