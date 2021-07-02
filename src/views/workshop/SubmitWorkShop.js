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

const SubmitWorkshop = () => {
    const {register, handleSubmit} = useForm();
    const history = useHistory();
    const token = JSON.parse(sessionStorage.getItem("token"));
    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/");
            }
        }else{
            history.replace("/");
        }
    }, []);
    let fileData = null;
    const handleData = (event) => {
        const {name, value} = event.target;
        if (name === "proposal") {
            fileData = event.target.files[0];
        }
    }
    const updateFile = (formData) =>{
        API.post("/workshop/upload", formData)
            .then();
    }
    const createData = (workshop) =>{
        API.post("/workshop/create", workshop)
            .then();
    }
    const handleWorkshopData = (data) => {
        const workshop = {
            topic: data.topic,
            description: data.description,
            approvalStatus: "pending",
            submitter: {
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
            axios.all([updateFile(formData),setTimeout(()=>{createData(workshop)},2000)])
                .then(axios.spread((data1, data2) => {
                    confirmAlert({
                        title: 'Workshop proposal submitted',
                        message: 'Thank you for your contribution.',
                        buttons: [
                            {
                                label: 'Ok'
                            }
                        ]
                    });
                }));
        }
    };

    return (
        <div>
            <Header/>
            <Title title="CALL FOR WORKSHOPS"/>
            <div className="workshop-proposal">
                <h3>CALL FOR WORKSHOP PROPOSALS</h3>
                <p>In addition to exciting technical symposia, tutorials, IEEE ICAC 2021 will feature a series of 3
                    hours of workshop.
                    We invite the submission of workshop proposals.
                    The aim of the conference workshops is to emphasize emerging topics not specifically covered in the
                    conference.
                    Workshops should highlight current topics related to technical and business issues in communications
                    and networking,
                    and should include a mix of regular papers, invited presentations,
                    and panels that encourage the participation of attendees in active discussion.</p>
            </div>
            <div className="workshop-submit">
                <h2>WORKSHOP PROPOSAL SUBMISSION</h2>
                <p>Proposal submissions should be submitted as a single PDF file online at the following link:</p>
                <Form className="workshop-from" onSubmit={handleSubmit(handleWorkshopData)}>
                    <FormGroup>
                        <Label>Topic :</Label>
                        <Input type="text" name="topic" {...register("topic")} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description :</Label>
                        <Input type="textarea" name="description" {...register("description")} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Proposal :</Label>
                        <Input type="file" name="proposal" encType="multipart/form-data" onChange={handleData} required/>
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

export default SubmitWorkshop;