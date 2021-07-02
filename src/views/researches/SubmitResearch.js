import React, {useEffect, useState} from "react";
import Title from "../../components/header/Title";
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import API from "../../components/api";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import {useHistory} from "react-router-dom";

const SubmitResearch =()=>{
    const {register, handleSubmit} = useForm();
    const token = JSON.parse(sessionStorage.getItem("token"));
    let fileData = null;
    const history = useHistory();
    const handleData = (event) => {
        const {name, value} = event.target;
        if (name === "proposal") {
            fileData = event.target.files[0];
        }
    }
    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/");
            }
        }else{
            history.replace("/");
        }
    }, []);
    const updateFile = (formData) =>{
        API.post("/research/upload", formData)
            .then();
    }
    const createData = (research) =>{
        API.post("/research/create", research)
            .then();
    }
    const handleResearchData = (data) => {
        const research = {
            title: data.title,
            paymentStatus: "pending",
            approvalStatus: "pending",
            researcher: {
                userId: token.id,
                name: token.name,
                email: token.email
            }
        }
        if(fileData){
            const formData = new FormData();
            formData.append(
                "file",
                fileData,
                fileData.name
            )
            axios.all([updateFile(formData),setTimeout(()=>{createData(research)},2000)])
                .then(axios.spread((data1, data2) => {
                    confirmAlert({
                        title: 'Research paper submitted',
                        message: 'Thank you for your contribution.',
                        buttons: [
                            {
                                label: 'Ok'
                            }
                        ]
                    });
                }));
        }else{

        }
    };

    return(
        <div>
            <Header/>
            <Title title = "CALL FOR PAPERS"/>
            <div className="workshop-proposal">
                <h3>CALL FOR PAPERS</h3>
                <p>The 2021 International Conference on Advancements in Computing (ICAC 2021) will be held in Sri Lanka from 9th to 11th December 2021.
                    The ICAC 2021 is themed “Empowering the society through innovation and invention.”
                    The conference organizers invite contributions from diverse computing areas including Computer Engineering,
                    Computer Science, Information Systems, Information Technology and Software Engineering, but not limited to.
                    ICAC 2021 will include attractive workshops and industry programs aimed at practitioners,
                    with keynotes and panels from both local and international researchers. </p>
            </div>
            <div className="workshop-submit">
                <h2>RESEARCH PAPER SUBMISSION</h2>
                <p>Paper submissions should be submitted as a single PDF file online at the following link:</p>
                <Form className="workshop-from" onSubmit={handleSubmit(handleResearchData)}>
                    <FormGroup>
                        <Label>Title :</Label>
                        <Input type="text" name="title" {...register("title")} required/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="file" name="proposal" enctype="multipart/form-data"  onChange={handleData} required/>
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button color="secondary" size="lg">Submit</Button>
                </Form>
            </div>
            <Footer/>
        </div>
    );
}

export default SubmitResearch;