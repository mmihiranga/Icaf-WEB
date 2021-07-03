import React, {useState, useEffect} from 'react';
import {Col, Row, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Title from "../../components/header/Title";
import API from "../../components/api";
import { useHistory } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import WorkshopTable from "../../components/common/WorkshopTable"

const MyWorkshops = () => {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [status,setStatus] = useState("all");
    const token =JSON.parse(sessionStorage.getItem("token"));
    const userId = token.id;

    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/");
            }
        }else{
            history.replace("/login");
        }
        API.get(`/workshop/${userId}`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const AllWorkshops =()=>{
        setStatus("all");
    }
    const ApprovedWorkshops = ()=>{
        setStatus("approved")
    }
    const PendingWorkshops =()=>{
        setStatus("pending")
    }
    const RejectedWorkshops =()=>{
        setStatus("rejected")
    }
    return (
        <div>
            <Header/>
            <Title title="MY WORKSHOPS"/>
            <div className="wr-table">
                <div className="wr-table-header">
                    <Row>
                        <Col className="wr-dashboard-header">
                            <h4>Manage My Workshops</h4>
                        </Col>
                        <Col className="wr-submit">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Status Filter
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={AllWorkshops}>All</DropdownItem>
                                    <DropdownItem onClick={PendingWorkshops}>Pending</DropdownItem>
                                    <DropdownItem onClick={ApprovedWorkshops}>Approved</DropdownItem>
                                    <DropdownItem onClick={RejectedWorkshops}>Rejected</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </div>
                <br/>
                <WorkshopTable rows={rows} status={status}/>
            </div>
            <Footer/>
        </div>
    );
}

export default MyWorkshops;
//<Button color="secondary">Resubmit</Button>