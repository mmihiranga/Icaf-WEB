import React from "react";
import {Button, Col, Row} from "reactstrap";
import {useHistory} from "react-router-dom";

const ConferenceCard =(props)=>{
    const history = useHistory();
    let id = props.row._id;
    const GoToRegistration =()=>{
        history.push({
            pathname: '/conference/registration/details',
            state:{conference_id:id}
        });
    }
    return(
        <div className="conference-card">
            <h2>{props.row.topic}</h2>
            <p>{props.row.desc}</p>
            <hr/>
            <Row>
                <Col xs="4">
                    <p>Attendee Fee :</p>
                    <div className="attendee-price">
                        <h2>4,500 LKR</h2>
                    </div>
                </Col>
                <Col xs="8">
                    <p>Phase one Registration :</p>
                    <div>
                        <p>* Registrations open: {props.row.startDate} – {props.row.endDate}</p>
                    </div>
                </Col>
            </Row>
            <hr/>
            <div className="btn-reg-conference">
                <Button onClick={GoToRegistration} size="lg" color="link">Attendee Registration Form</Button>
            </div>
        </div>
    );
}

export default ConferenceCard;