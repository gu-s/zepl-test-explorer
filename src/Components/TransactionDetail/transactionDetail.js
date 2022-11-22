import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import helper from '../../Services/helper';


const TransactionDetail = (props) => {

    const subscribeAddress = ()=>{
        // props.onSubscribe(props.addressData.address);
        props.onHide();
    }

    const formatDate = (dateString)=>{
        return dateString ? (new Date(dateString)).toLocaleString() : '';

    }


    return <>
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Transaction Search </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="table-responsive">
                <table className="table">

                    <tbody>
                        <tr>
                            <th scope="row">Transaction Hash</th>
                            <td>{props.transactionData?.hash}</td>
                        </tr>
                        <tr>
                            <th scope="row">Received Time</th>
                            <td>{formatDate(props.transactionData?.received)}</td>
                        </tr>
                    </tbody>
                </table>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={subscribeAddress}>Subscribe</Button>
            </Modal.Footer>

        </Modal>
    </>


};

export default TransactionDetail;