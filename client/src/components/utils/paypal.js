import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
            //console.log("payment ", JSON.stringify(payment))
            this.props.onSuccess(payment);
        }

        const onCancel = (data) => {
            console.log("data ", JSON.stringify(data))
        }

        const onError = (err) => {
            console.log("err ", JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'INR';
        let total = this.props.toPay || 1;

        const client = {
            sandbox: 'Ae2_AbeyXx6AJqJN8MfdnohSqOQ6Nuo_rAzNZ5g6PgGhScVjygAMEOWcITNFhF8QnU02Bw_XU7jY44zj',
            production: ''
        }

        return (
            <div>
                <PaypalExpressBtn 
                     env={env}
                     client={client}
                     currency={currency}
                     total={total}
                     onError={onError}
                     onSuccess={onSuccess}
                     onCancel={onCancel}
                     style={{
                        size:'large',
                        color:'blue',
                        shape:'rect',
                        label:'checkout'
                    }}
                />
            </div>
        )
    }
}


export default Paypal;