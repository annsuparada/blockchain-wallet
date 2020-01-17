import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Chain = () => {
    const [state, setState] = useState([])
    const [sender, setSender] = useState('')
    // console.log('state', state)

    useEffect(() => {
        axios.get(`http://localhost:5000/chain`)
        .then(res => {
            // console.log(res)
            let resSender = res.data.chain.map(item => item.transactions)
            
            resSender = resSender.slice(1)

                // console.log('sender',resSender)
            setState(resSender);
            setSender(res.data.chain[0].sender)
        })
    }, [])

    
    return ( 
        <>
        <p>Transactions</p>
        {state.length > 0 &&
            // <p>{state[1][0].amount}</p>
        state.map(item => { 
            // console.log('item',item)
            return (
                <div>
                    <p>Amount: {item[0].amount}</p>
                    <p>Sender: {item[0].sender}</p>
                    <p>Recipient: {item[0].recipient}</p>
                </div>
            )
        }
        )
        }
        </>
     );
}
 
export default Chain;