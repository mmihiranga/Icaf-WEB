import React, {useEffect} from "react";
import Header from "../../components/header/Header";
import Title from "../../components/header/Title";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Footer from "../../components/footer/Footer";
import {useHistory} from "react-router-dom";
import {useAlert} from "react-alert";
import {useLocation} from "react-router-dom";
import API from "../../components/api";
import {confirmAlert} from "react-confirm-alert";


const PaymentForm =() =>{
    const token =JSON.parse(sessionStorage.getItem("token"));
    const history = useHistory();
    const location = useLocation();
    const alert = useAlert();

    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/login");
            }
        }else{
            history.replace("/login");
        }
    }, []);

    const handleRegistration = (event) => {
        event.preventDefault();
        location.state.paymentStatus ="paid";
        API.post("attendee/create",location.state).then((res)=>{
            confirmAlert({
                title: 'Registration Complete',
                message: 'Thank you for your registration.',
                buttons: [
                    {
                        label: 'Ok'
                    }
                ]
            });
        });
    };
    const goBack=()=>{
        history.push("/conference/registration/details")
    }
    return(
        <div>
            <Header/>
            <Title title="CONFERENCE PAYMENT"/>
            <div className="register">
                <Form className="conference-from" onSubmit={handleRegistration}>
                    <h3 className="header">ICAF Payment Service</h3>
                    <hr/>
                    <div>
                        <label htmlFor="name">Name on Card :</label>
                        <Input type="text" size="sm" id="name" name="name" required/>
                    </div>
                    <div>
                        <label htmlFor="amount">Amount :</label>
                        <Input type="text" size="sm" value="LKR 4500.00" id="amount" name="amount" required disabled/>
                    </div>
                    <div>
                        <label htmlFor="cardNumber">Card Number :</label>
                        <Input type="text" size="sm" id="cardNumber" name="amount" required/>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div>
                                <label>Expire Date :</label>
                                <Input type="date" size="sm" name="amount" required/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div >
                                <label htmlFor="cvc">CVC :</label>
                                <Input type="text" size="sm"id="cvc" name="amount" required/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Button className="btn-pay" color="primary" type="submit">Pay & Register</Button>
                    <Button className="btn-pay" onClick={goBack} color="secondary">Back</Button>
                </Form>
            </div>
            <Footer/>
        </div>
    );
}

export default PaymentForm;