import useLocalStorage from "@alexmarqs/react-use-local-storage";
import Link from "next/link";
import { ReactChild, ReactChildren, useContext } from "react";
import { StoreContext } from "../pages/_app";

interface Props {
    children: ReactChild | ReactChildren;
}

export default function ({ children }: Props) {
    const storeContext = useContext(StoreContext);
    if (storeContext == null) return null;
    const { cart, removeCartItem } = storeContext;
  
    return (<div>
        <div className="float-l">
            <Link href="/"><span className="pointer mr-l">Home</span></Link>
            <Link href="registration"><span className="pointer mr-l">Register</span></Link>
            <Link href="login"><span className="pointer">Login</span></Link>
        </div>
        <div className="float-r">
            <h2 style={{marginTop: 0}}>Cart</h2>
            {cart.map((item: any) => (
                <div style={{display: 'flex', justifyContent: 'space-between'}} key={item.id}>
                <div>{item.itemName}</div>
                <button className="d-block" onClick={() => removeCartItem(item.id)}>Remove</button></div>
            ))}
            {cart.length > 0 && <button className="d-block w-100 mt-l">Checkout</button>}
        </div>
        {children}
    </div>);
}