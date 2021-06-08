import React, { useEffect, useRef, useState } from 'react';
import SuccessPayment from './SuccessPayment';
import API from '../API';

export default function PayPal(props) {

    const [payd, setPayd] = useState(false);
    const paypal = useRef()

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Cool looking table",
                    amount: {
                      currency_code: "PLN",
                      value: props.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
              API.post('mentee/advertisment?id='+props.uid, {
                "active": true,
                "price": props.price,
                "description": props.description,
                "dietGoals": props.target
              }).then(function(result){
                  console.log(result);
              })

              setPayd(true);
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
      }, []);

    return (
        <div>
          <br/><br/><br/><br/>
            <div ref={paypal}></div>
            {payd? <SuccessPayment/> : ""}
        </div>
    );
}