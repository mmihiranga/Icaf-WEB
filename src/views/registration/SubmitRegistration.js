import React, {useEffect} from "react";
import Header from "../../components/header/Header";
import Title from "../../components/header/Title";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Footer from "../../components/footer/Footer";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";

const SubmitForm =() =>{
    const history = useHistory();
    const location = useLocation();
    const {register, handleSubmit} = useForm();
    const token =JSON.parse(sessionStorage.getItem("token"));
    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/login");
            }
        }else{
            history.replace("/login");
        }
    }, []);
    const handleRegistration = (data) => {
        const attendee = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            paymentStatus: "pending",
            conference: location.state.conference_id
        }
        history.push({
            pathname: '/conference/registration/payments',
            state:attendee
        });
    };

    const goBack=()=>{
        history.push("/conference/registration")
    }
    return(
        <div>
            <Header/>
            <Title title="CONFERENCE REGISTRATION"/>
            <div className="register">
                <Form className="conference-from" onSubmit={handleSubmit(handleRegistration)}>
                    <h2 className="reg-title">Registration</h2>
                    <hr/>
                    <FormGroup className="input">
                        <Label>Name :</Label>
                        <Input name="name" {...register("name")} required/>
                    </FormGroup>
                    <FormGroup className="input">
                        <Label>Email :</Label>
                        <Input type="email" name="email" {...register("email")} required/>
                    </FormGroup>
                    <FormGroup className="input">
                        <Label>Phone :</Label>
                        <Input type="text" name="phone" {...register("phone")} required/>
                    </FormGroup>
                    <FormGroup >
                        <Label>Address :</Label>
                        <Input type="textarea" rows="4" name="address" {...register("address")} required/>
                    </FormGroup>
                    <Button className="btnLog" color="primary">Next</Button>
                    <Button className="btnReg" onClick={goBack} color="secondary">Back</Button>
                </Form>
            </div>
            <Footer/>
        </div>
    );
}

export default SubmitForm;