import React, {useEffect, useState} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import API from "../../components/api";
import axios from "axios";
import {useHistory} from "react-router-dom";
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';

const EditConference = (props) => {

    const history = useHistory();
    const token =JSON.parse(sessionStorage.getItem("token"));
    const [open, setOpen] = useState(false);
    const [id,setId] = useState('');
    const [topic,setTopic] = useState('');
    const [desc,setDesc] = useState('')
    const [venue,setVenue] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [organizer,setOrganizer] = useState('')
    const [status,setStatus] = useState('')

    useEffect(() => {
        if(token != null){
            if(token.type!=="editor"){
                history.replace("/");
            }
        }else{
            history.replace("/");
        }

        setTopic(props.row.topic)
        setId(props.row._id)
        setVenue(props.row.venue)
        setDesc(props.row.desc)
        setStartDate(props.row.startDate)
        setEndDate(props.row.endDate)
        setOrganizer(props.row.organizer)
        setStatus('pending')

    }, []);

    const onOpenModal = () =>{ 
        setOpen(true) 
        props.setHead(false)
    };
    const onCloseModal = () => {
        setOpen(false)
        props.setHead(true)
    };
    const {register, handleSubmit} = useForm();
  
    const submitConference = () => {

        const conference = {
            _id: props.row._id,
            topic: topic,
            desc: desc,
            status: status,
            venue: venue,
            startDate: startDate,
            endDate: endDate,
            organizer: organizer
           
        }

        console.log(conference)

        API.put("/conference/update", conference)
            .then();
            setOpen(false)

      
    };

    return (
        <div>
            <Button id="btn-3-conf" className="conf-btn conf-btn3" variant="primary" onClick={onOpenModal}>Edit Conference</Button>
            <Modal className="editmodel" style={{zIndex:-1}} open={open} onClose={onCloseModal} center>
                <div className="workshop-modal">
                    <h3>Edit Conference Details</h3>
                    
                    <form  onSubmit={handleSubmit(submitConference)} >
                   
                        <hr/>

                        <label className="form-label">Title</label><br/>
                        <label id="icon" for="name"><TextFieldsRoundedIcon/></label>
                        <input type="text" name="name" id="name" className="ctopic" placeholder="Enter the Title" value={topic} onChange={(e)=>{setTopic(e.target.value)}} required/><br/>

                        <label className="form-label">Description</label><br/>
                        {/* <label id="icon" for="name"><i className="icon-user"></i></label> */}
                        <textarea className="desc" id="" cols="65" placeholder="Enter the Description" rows="7" value={desc} onChange={(e)=>{setDesc(e.target.value)}} ></textarea><br/>
                        {/* <input type="text" name="name" id="name" placeholder="Description" required/><br/> */}

                        <label className="form-label">Venue</label><br/>
                        <label id="icon" for="name"><RoomRoundedIcon/></label>
                        <input type="text" name="name" id="name" className="ctopic" placeholder="Enter the Venue" value={venue} onChange={(e)=>{setVenue(e.target.value)}}  required/><br/>

                        <label className="form-label" >Start Date</label> <label className="form-label date-label" > End Date</label><br/>
                        <label id="icon" for="name"><EventNoteRoundedIcon/></label>
                        <input type="date" name="name" id="date" placeholder="Start Date" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}  required/>

                        
                        <label id="icon" for="name"><EventNoteRoundedIcon/></label>
                        <input type="date" name="name" id="date" placeholder="End Date"  value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}  required/><br/>

                        <label className="form-label">Organizers</label><br/>
                        <label id="icon" for="name"><SupervisorAccountRoundedIcon/></label>
                        <input type="text" name="name" id="name" className="ctopic" placeholder="Organizers" value={organizer} onChange={(e)=>{setOrganizer(e.target.value)}}  required/><br/>

                        <div className="editor-btn">
                        <button type="submit" className="editor-button">Edit</button>
                        </div>
                        </form>
                        </div>
            </Modal>
        </div>
    );
};

export default EditConference;