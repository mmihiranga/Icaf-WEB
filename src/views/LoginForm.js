import React from "react";
import {useForm} from "react-hook-form";
import { useHistory } from 'react-router-dom';
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import API from "../components/api";
import { useAlert } from "react-alert";
import Title from "../components/header/Title";
const bcrypt = require('bcryptjs');

const LoginForm = () => {
    const history = useHistory();
    const {register, handleSubmit} = useForm();
    const alert = useAlert();
    const handleRegistration = (data) => {
        let email = data.email;
        API.post("/user/validate",{email:email})
            .then(res=>{
                if(res.data){
                    let hashPass = res.data.password;
                    const isValid = bcrypt.compareSync(data.password, hashPass);
                    if(isValid){
                        const token ={
                            id: res.data._id,
                            name: res.data.name,
                            email:res.data.email,
                            type:res.data.type
                        }
                        sessionStorage.setItem("token",JSON.stringify(token));
                        if(token.type=="admin"){
                            history.push("/admin");
                          
                        }else if (token.type=="editor"){
                            history.push("/editor");
                        }else{
                            history.push("/home");
                        }
                        window.location.reload();

                    }else {
                        alert.error("Invalid Password");
                    }
                }else{
                    alert.error("Invalid Email");
                }
            })
    };

    const goToRegister = ()=>{
        history.push("/register");
    }

    return (
        <div className="register">
            <Header/>
            <Title title="WELCOME TO ICAF"/>
            <Form className="reg-log-from" onSubmit={handleSubmit(handleRegistration)}>
                <h2 className="reg-title">Login</h2>
                <hr/>
                <FormGroup className="input">
                    <Label>Email :</Label>
                    <Input size="sm" type="email" name="email" {...register("email")} required/>
                </FormGroup>
                <FormGroup>
                    <Label>Password :</Label>
                    <Input size="sm" type="password" name="password" {...register("password")} required/>
                </FormGroup>
                <Button className="btnLog" color="primary">Login</Button>
                <Button onClick={goToRegister} size="sm" className="btnReg" color="secondary">Register</Button>
            </Form>
            <Footer/>
        </div>
    );
};

export default LoginForm;