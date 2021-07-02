import React, {useState, useEffect} from 'react';
import {Col, Row,  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import API from "../../components/api";
import { useHistory } from 'react-router-dom';
import {forEach} from "react-bootstrap/ElementChildren";
import EditConference from "./EditConference";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const AdminConference=()=> {

    const history = useHistory();
    const [rows, setRows] = useState('');
    const [status,setStatus] = useState("all");
    const [approve,setApprove] = useState("all");
    const token =JSON.parse(sessionStorage.getItem("token"));


    useEffect(() => {
        if(token != null){
            if(token.type!=="admin"){
                history.replace("/");
            }
        }else{
            history.replace("/");
        }
        API.get(`/conference/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [rows]);

    const AllConference =()=>{
        setStatus("all");
    }
    const ApprovedConference = ()=>{
        setStatus("approved")
    }
    const PendingConference =()=>{
        setStatus("pending")
    }
    const RejectedConference =()=>{
        setStatus("rejected")
    }
    const RecentConference =()=>{
        setStatus("recent")
    }

    let  count=0
// for (let i=0;i<rows.length;i++){
//     console.log(i);
//     topic=rows[i].topic
//     desc=rows[i].desc
// }
//     console.log(topic);


    const approveConf = (rowData)=>{

        for (let i=0;i<rows.length;i++){

       if(rows[i]._id==rowData._id){
           setApprove("approved")
           rowData.status="approved"
           const approveData={
               _id:rowData._id,
               topic: rowData.topic,
               desc: rowData.desc,
               status: rowData.status,
               venue: rowData.venue,
               startDate: rowData.startDate,
               endDate: rowData.endDate,
               organizer: rowData.organizer,
           }
           API.put("/conference/update", approveData).then();
       }
       else if(rows[i].status=="approved" && rows[i]._id!=rowData._id){
           setApprove("recent")
           rowData.status="recent"
           const approveData={
               _id:rows[i]._id,
               topic: rows[i].topic,
               desc: rows[i].desc,
               status: rowData.status,
               venue: rows[i].venue,
               startDate: rows[i].startDate,
               endDate: rows[i].endDate,
               organizer: rows[i].organizer,
           }
           API.put("/conference/update", approveData).then();
       }
}


        //window.location.reload();
    }


    const rejectConf = (rowData)=>{
        setApprove("rejected")
        rowData.status="rejected"
        const approveData={
            _id:rowData._id,
            topic: rowData.topic,
            desc: rowData.desc,
            status: rowData.status,
            venue: rowData.venue,
            startDate: rowData.startDate,
            endDate: rowData.endDate,
            organizer: rowData.organizer,
        }

        API.put("/conference/update", approveData).then();
      //  window.location.reload();
    }

    const deleteConf = (row)=>{
        console.log(row._id)
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this Conference.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        API.delete(`conference/delete/${row._id}`)
                            .then((res) => {

                            }).catch((err) => {
                            console.log(err);
                        })
                       // window.location.reload();
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }



    return (
        <div id="admin-card-back">

            <div>

                <div className="wr-table">
                    <div className="wr-table-header">
                        <Row>
                            <Col className="wr-dashboard-header">
                                <h4>Manage My Conference</h4>
                            </Col>
                            <Col className="wr-submit" >
                                <UncontrolledDropdown id='filterToggle'>
                                    <DropdownToggle caret id='filterDrop'>
                                        Status Filter
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem onClick={AllConference}>All</DropdownItem>
                                        <DropdownItem onClick={PendingConference}>Pending</DropdownItem>
                                        <DropdownItem onClick={ApprovedConference}>Approved</DropdownItem>
                                        <DropdownItem onClick={RejectedConference}>Rejected</DropdownItem>
                                        <DropdownItem onClick={RecentConference}>Recent</DropdownItem>                                 
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                        </Row>
                    </div>
                    <br/>
                </div>

            </div>

            {rows.length > 0 && rows.map((row) => {
                 if (row.status === status || status === "all") {
                    count++
                    return (
                        <div className="CardOutline">
            <Card className="text-center" key={row._id}>
                <Card.Header>Conference {count}</Card.Header>
                <Card.Body>
                    <div className="statusParent">
                        <h6 className="statusChild" style={row.status=="approved" ? {borderRight:"15px solid #0cce26"} : row.status=="rejected" ? {borderRight:"15px solid red"}  :row.status=="recent" ?{borderRight:"15px solid #007d8d"}:{borderRight:"15px solid orange"}} >{row.status}</h6>
                    </div>
                    <Card.Title><h3 className="card-title-h3">Title : {row.topic}</h3></Card.Title>
                    
                    <h5 className="venue">Venue : {row.venue}</h5>
                    <Card.Text className="desc-card">
                        Description : {row.desc}.
                    </Card.Text>
                    <div className='conf-date'>
                    <h6 className='conf-date1'>Start Date : {row.startDate}</h6>
                    <h6 className='conf-date1'>End Date :{row.endDate}</h6>
                    </div>
                    <br/>
                    <div className='conf-org'>
                        <h6 className='conf-organ'>Organizer : {row.organizer}</h6>
                    </div>
                    <div className='conf-card' >

                         <Button className='conf-btn conf-btn4' variant="primary" onClick={() => deleteConf(row)} >Delete Conference</Button>
                        <EditConference row={row}/>

                        <Button className='conf-btn conf-btn2' onClick={() => rejectConf(row)}  variant="primary">Decline</Button>

                        <Button className='conf-btn conf-btn1' onClick={() => approveConf(row)} variant="primary">Approve</Button>


                    </div>
                </Card.Body>
                <Card.Footer className="text-muted" >
                    {/*<text align="left">user ID:904535459</text>*/}
                    2 days ago

                </Card.Footer>

            </Card>
            </div>



                    )
                }
            }

            )
            }


        </div>);
}

export default AdminConference;