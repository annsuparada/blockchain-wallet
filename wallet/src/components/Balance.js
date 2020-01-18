import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form, Button, Input, Icon } from 'antd';

const Balance = () => {
    const [state, setState] = useState({
        "amount": null,
        "sender": "",
        "recipient": ""
    })
    const [defaultBalance, setDefaultBalance] = useState({ "amount": 100 })
    const [balance, setBalance] = useState(null)
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/transactions/new`, state)
            .then(res => {
                console.log('data',res.data)
                let firstAmount = res.data.amount[0].amount
                let amount = res.data.amount
                    .map(item => item.amount)
                    .slice(1)
                    .reduce((prev, next) => parseInt(prev) + parseInt(next))
                // console.log('firstAmount',firstAmount)
                // console.log('amount',amount)

                setBalance(firstAmount - amount)
            })

    }

    useEffect(() => {
        axios.get(`http://localhost:5000/balance`)
            .then(res => {
                // console.log('>>>>', res.data)
                // console.log('data',res.data)
                let firstAmount = res.data.amount[0].amount
                let allAmounts = res.data.amount.map(item => item.amount)
                if (allAmounts.length == 1) {
                    setBalance(firstAmount)
                } else {
                    allAmounts = allAmounts
                        .slice(1)
                        .reduce((prev, next) => parseInt(prev) + parseInt(next))
                    setBalance(firstAmount - allAmounts)
                }
                console.log(allAmounts)
                // console.log('firstAmount',firstAmount)
                // console.log('amount',amount)


            })
    }, [])


    return (
        <>
            <div className="balance-box">
                <h1>Balance: $ {balance}</h1>
            </div>
            <p>
                <Form layout="inline" onSubmit={handleSubmit}>
                    <Form.Item label="Amount">
                        <Input
                            placeholder="Amount"
                            name="amount"
                            value={state.amount}
                            onChange={handleChange}

                        />
                    </Form.Item>
                    <Form.Item label="Sender">
                        <Input
                            placeholder="Sender"
                            name="sender"
                            value={state.sender}
                            onChange={handleChange}

                        />
                    </Form.Item>
                    <Form.Item label="Recipient">
                        <Input
                            placeholder="Recipient"
                            name="recipient"
                            value={state.recipient}
                            onChange={handleChange}

                        />
                    </Form.Item>
                    <Form.Item>
                        {/* <Button type="primary submit">Send</Button> */}
                    </Form.Item>
                    <button type="submit">Send</button>
                </Form>
            </p>
        </>
    );
}

export default Balance;