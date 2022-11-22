import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import helper from '../../Services/helper';


const AddressDetail = (props) => {

    // const getUnspentBtc = (transactions = [])=>{
    //     return transactions.reduce((acc,curr)=>(acc + curr.value),0);
    // }

    const subscribeAddress = ()=>{
        props.onSubscribe(props.addressData.address);
        props.onHide();
    }


    return <>
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Address Search </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">

                    <tbody>
                        <tr>
                            <th scope="row">Number of Confirmed Transaction </th>
                            <td>{props.addressData?.n_tx}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Btc received</th>
                            <td>{helper.converterTo(props.addressData?.total_received)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Btc spent</th>
                            <td>{helper.converterTo(props.addressData?.total_sent)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total Btc unspent</th>
                            <td>{helper.converterTo(props.addressData?.final_balance)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Current address Balance</th>
                            <td>{helper.converterTo(props.addressData?.balance)}</td>
                        </tr>

                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={subscribeAddress}>Subscribe</Button>
            </Modal.Footer>

        </Modal>
    </>


};

export default AddressDetail;