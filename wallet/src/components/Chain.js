import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table } from 'antd';

const Chain = () => {
    const [state, setState] = useState([])
    const [sender, setSender] = useState('')
    // console.log('state', state)

    useEffect(() => {
        axios.get(`http://localhost:5000/chain`)
        .then(res => {
            // console.log(res.data.chain)
            let resSender = res.data.chain.sort((a,b) => b.index-a.index)
            console.log(resSender)
            // .map(item => item.transactions)
            
            // resSender = resSender.slice(1)

                // console.log('sender',resSender)
            setState(resSender);
            setSender(res.data.chain[0].sender)
        })
    }, [])

    const columns = [
        {
          title: 'Sender',
          dataIndex: 'sender',
        },
        {
          title: 'Recipient',
          dataIndex: 'recipient',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
        },
      ];
    
    const data = state.slice(2)
    .map(item => item.transactions[0])
    
    return ( 
        <>
        {/* {console.log(data)} */}
        <p>Transactions</p>
        {/* <div className="container">
        {state.length > 0 &&
            // <p>{state[1][0].amount}</p>
        state.slice(2).map(item => { 
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
        </div> */}
        <Table columns={columns} dataSource={data} bordered />
        </>
     );
}
 
export default Chain;