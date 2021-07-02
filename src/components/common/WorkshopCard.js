import React from "react";
import {Button, Col, Row} from "reactstrap";

const WorkshopCard = (props) => {
    return (
        <div className="conference-card">
            <h2>{props.row.topic}</h2>
            <p>{props.row.description}</p>
            <hr/>
            <p>Details :</p>
            <div>
                <p>* Submitted date:{new Date(props.row.submitDate).toUTCString()}</p>
                <p>* Submitted by: {props.row.submitter.name}</p>
            </div>
            <hr/>
        </div>
    );
}

export default WorkshopCard;