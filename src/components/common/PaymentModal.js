import React, { useState,useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import API from "../api";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const PaymentModal = (props) => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleData = (event)=>{
        event.preventDefault();
        API.patch("/research/update/payment/"+props.row._id)
            .then();
    }

    return (
        <div>
            <Button className="btn-update" color="primary" onClick={onOpenModal}>Pay</Button>
            <Modal open={open} onClose={onCloseModal} center>
                <Form className="payment-form" onSubmit={handleData}>
                    <h3 className="header">ICAF Payment Service</h3>
                    <hr/>
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">Name on Card :</label>
                        <Input type="text" size="sm" className="form-control" id="name" name="name" required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="amount" className="form-label">Amount :</label>
                        <Input type="text" size="sm" className="form-control" value="LKR 3000.00" id="amount" name="amount" required disabled/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="cardNumber" className="form-label">Card Number :</label>
                        <Input type="text" size="sm" className="form-control" id="cardNumber" name="amount" required/>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="mb-1">
                                <label htmlFor="date" className="form-label">Expire Date :</label>
                                <Input type="date" size="sm" className="form-control" id="date" name="amount" required/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-1">
                                <label htmlFor="cvc" className="form-label">CVC :</label>
                                <Input type="text" size="sm" className="form-control" id="cvc" name="amount" required/>
                            </div>
                        </div>
                    </div>
                    <Button className="btn-pay" color="primary" type="submit">Pay Now</Button>
                </Form>
            </Modal>
        </div>
    );
};
export default PaymentModal;

