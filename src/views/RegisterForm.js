import React from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import API from "../components/api";
import { useAlert } from "react-alert";
import Title from "../components/header/Title";
const bcrypt = require('bcryptjs')

const RegisterForm = () => {
    const history = useHistory();
    const {register, handleSubmit} = useForm();
    const alert = useAlert();
    const handleRegistration = (data) => {
        //encrypted user password for better security
        const user ={
            name : data.name,
            email : data.email,
            password: bcrypt.hashSync(data.password, bcrypt.genSaltSync()),
            phone: data.phone,
            type:"user"
        }
        //send post request to add a new user to the db
        API.post('/user/create', user)
            .then(function (response) {
                console.log(response.data);
                if(response.data.message){
                    alert.info(response.data.message);
                }else{
                    history.push("/login");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    //go to login form
    const loginForm =()=>{
        history.push("/login");
    };
    return (
        <div>
            <Header/>
            <Title title="BECOME A MEMBER"/>
            <div className="register">
                <Form className="reg-log-from" onSubmit={handleSubmit(handleRegistration)}>
                    <h2 className="reg-title">Register</h2>
                    <hr/>
                    <FormGroup className="input">
                        <Label>Name :</Label>
                        <Input size="sm" name="name" {...register("name")} required/>
                    </FormGroup>
                    <FormGroup className="input">
                        <Label>Email :</Label>
                        <Input size="sm" type="email" name="email" {...register("email")} required/>
                    </FormGroup>
                    <FormGroup className="input">
                        <Label>Phone :</Label>
                        <Input size="sm" type="text" name="phone" {...register("phone")} required/>
                    </FormGroup>
                    <FormGroup >
                        <Label>Password :</Label>
                        <Input size="sm" type="password" name="password" {...register("password")} required/>
                    </FormGroup>
                    <Button className="btnLog" color="primary">Register</Button>
                    <Button size="sm" onClick={()=>loginForm()} className="btnReg" color="secondary">Login</Button>
                </Form>
            </div>
            <Footer/>
        </div>
    );
};

export default RegisterForm;