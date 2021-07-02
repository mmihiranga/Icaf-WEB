import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import API from "../api";
import axios from "axios";

const EditResearchModal = (props) => {
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState("");
    useEffect(() => {
        setTitle(props.row.title)
    }, []);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const {register, handleSubmit} = useForm();
    const token =JSON.parse(sessionStorage.getItem("token"));
    let fileData = null;

    const handleData= (event)=>{
        const {name, value} = event.target;
        setTitle(value);
    }
    const handleFile = (event) => {
        const {name, value} = event.target;
        if (name === "proposal") {
            fileData = event.target.files[0];
        }
    }
    const updateFile = (formData) =>{
        API.post("/research/upload", formData)
            .then();
    }
    const updateData = (research) =>{
        API.put("/research/update", research)
            .then();
    }
    const submitResearch = () => {
        const research = {
            _id: props.row._id,
            title: title,
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
            axios.all([updateFile(formData),setTimeout(()=>{
                updateData(research)
                window.location.reload();
            },2000)])
                .then(axios.spread((data1, data2) => {

                }));
        }
    };

    return (
        <div>
            <Button onClick={onOpenModal}>Edit</Button>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="workshop-modal">
                    <h3>RESEARCH PAPER SUBMISSION</h3>
                    <p>Proposal submissions should be submitted as a single PDF file online at the following link:</p>
                    <Form className="workshop-from-modal" onSubmit={handleSubmit(submitResearch)}>
                        <FormGroup>
                            <Label>Topic :</Label>
                            <Input type="text" name="title" value={title} onChange={handleData}  required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Proposal :</Label>
                            <Input type="file" name="proposal" onChange={handleFile} encType="multipart/form-data" required/>
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                            </FormText>
                        </FormGroup>
                        <Button color="secondary" size="lg">Resubmit</Button>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default EditResearchModal;