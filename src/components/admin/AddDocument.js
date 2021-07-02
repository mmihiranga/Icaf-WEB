import React, {useState} from "react";
import Header from "../header/Header";
import {Alert, Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import Footer from "../footer/Footer";
import API from "../api";
import axios from "axios";
import Select from "react-select";
import {useHistory} from "react-router-dom";
import Title from "../../components/header/Title";
import {confirmAlert} from "react-confirm-alert";


const AddDocument = () => {
    const {register, handleSubmit} = useForm();
    let {option, setOption} = useState();

   
    const history = useHistory();

      

    const token = JSON.parse(sessionStorage.getItem("token"));

    let fileData = null;


    const handleData = (event) => {
        const {name, value} = event.target;
        if (name === "proposal") {
            fileData = event.target.files[0];
        }
    }

    const handleOption = (event) => {
        option=event.target.value;
         console.log(option)
        
    }

    const updateFile = (formData) =>{
        API.post("/download/upload", formData)
            .then();
    }
    const createData = (download) =>{
        API.post("/download/create", download)
            .then();
    }
    const handleDocumentData = (data) => {
        const download = {
            type: option,
            description: data.description
          
        }
        if(fileData){
            const formData = new FormData();
            formData.append(
                "file",
                fileData,
                fileData.name
            )
            axios.all([updateFile(formData),setTimeout(()=>{createData(download)},2000)])
                .then(axios.spread((data1, data2) => {
                //    alert("Successfuly Added")

                   confirmAlert({
                    title: 'Successfuly Added',
                   
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                                history.push("/editor")
                            }
                        },
                        
                    ]
                });
                }));
              
        }
    };


    

    return (
        <div>
         <Header/>
         <Title title="Template Document Submission"/>
            <div className="workshop-proposal">
                
              
            </div>
            <div className="workshop-submit">
                <p>Templates  should be Uploaded as a single PDF file online at the following link:</p>
                <Form className="workshop-from" onSubmit={handleSubmit(handleDocumentData)}>
                    <FormGroup>
                        <Label>Type :</Label><br/>

                        <select   defaultValue="Workshop Templates" onChange={handleOption}>
                        <option value="Workshop Templates">Workshop Templates</option>
                        <option value="Research Paper">Research Paper</option>
                        <option value="Other Templates">Other Templates</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description :</Label>
                        <Input type="textarea" name="description" {...register("description")} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Proposal :</Label>
                        <Input type="file" name="proposal" encType="multipart/form-data" onChange={handleData} />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <Button color="secondary" size="lg">Upload</Button>
                </Form>
            </div>
            <Footer/>
        </div>
    );
}

export default AddDocument;