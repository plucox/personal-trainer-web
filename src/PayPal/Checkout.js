import React, { useState } from 'react';
import PayPal from './PayPal';

export default function Checkout() {
    const [checkout, setCheckout] = useState(false);

    return (
        <React.Fragment>
            {checkout ? (
                <PayPal />
            ) : (
            <button 
            onClick={() => {
                setCheckout(true);
            }}>
                Checkout
            </button>
            )}
        </React.Fragment>
    );
}