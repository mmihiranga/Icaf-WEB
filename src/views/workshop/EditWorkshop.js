import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import API from "../../components/api";
import axios from "axios";
import {useHistory} from "react-router-dom";

const EditModal = (props) => {
    const token =JSON.parse(sessionStorage.getItem("token"));
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({
            topic: "",
            description:""
    });
    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/login");
            }
        }else{
            history.replace("/login");
        }
        setData(props.row)
    }, []);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const {register, handleSubmit} = useForm();
    let fileData = null;
    const handleData= (event)=>{
        const {name, value} = event.target;
        setData((preValue) => {
            if (name === "topic") {
                return (
                    {
                        topic: value,
                        description: preValue.description
                    }
                );
            }else if(name === "description"){
                return (
                    {
                        topic: preValue.topic,
                        description: value
                    }
                );
            }
        });
    }
    const handleFile = (event) => {
        const {name, value} = event.target;
        if (name === "proposal") {
            fileData = event.target.files[0];
        }
    }
    const updateFile = (formData) =>{
        API.post("/workshop/upload", formData)
            .then();
    }
    const updateData = (workshop) =>{
        API.put("/workshop/update", workshop)
            .then();
    }
    const submitWorkshop = () => {
        const workshop = {
            _id: props.row._id,
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
            axios.all([updateFile(formData),setTimeout(()=>{
                updateData(workshop)
                window.location.reload();
            },2000)])
                .then(axios.spread((data1, data2) => {
                    if(data1 && data2){

                    }
                }));
        }else{
            alert("Select a file to submit");
        }
    };

    return (
        <div>
            <Button onClick={onOpenModal}>Resubmit</Button>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="workshop-modal">
                    <h3>WORKSHOP PROPOSAL SUBMISSION</h3>
                    <p>Proposal submissions should be submitted as a single PDF file online at the following link:</p>
                    <Form className="workshop-from-modal" onSubmit={handleSubmit(submitWorkshop)}>
                        <FormGroup>
                            <Label>Topic :</Label>
                            <Input type="text" name="topic" value={data.topic} onChange={handleData}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description :</Label>
                            <Input type="textarea" name="description" onChange={handleData} value={data.description}  />
                        </FormGroup>
                        <FormGroup>
                            <Label>Proposal :</Label>
                            <Input type="file" name="proposal" onChange={handleFile} encType="multipart/form-data"/>
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

export default EditModal;