import React, {useState, useEffect} from 'react';
import {Col, Row, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Title from "../../components/header/Title";
import API from "../../components/api";
import { useHistory } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ResearchTable from "../../components/common/ResearchTable";

const ManageResearches = () => {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [status,setStatus] = useState("all");
    const token =JSON.parse(sessionStorage.getItem("token"));
    const userId = token.id;

    useEffect(() => {
        if(token != null){
            if(token.type!=="reviewer"){
                if(token.type!=="admin"){
                    history.replace("/");
                }
            }
        }else{
            history.replace("/login");
        }
        API.get(`/research/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [rows]);

    const AllResearches =()=>{
        setStatus("all");
    }
    const ApprovedResearches = ()=>{
        setStatus("approved")
    }
    const PendingResearches =()=>{
        setStatus("pending")
    }
    const RejectedResearches =()=>{
        setStatus("rejected")
    }

    return (
        <div>
            <Header/>
            <Title title="MANAGE RESEARCHES"/>
            <div className="wr-table">
                <div className="wr-table-header">
                    <Row>
                        <Col className="wr-dashboard-header">
                            <h4>Manage Researches</h4>
                        </Col>
                        <Col className="wr-submit">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Status Filter
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={AllResearches}>All</DropdownItem>
                                    <DropdownItem onClick={PendingResearches}>Pending</DropdownItem>
                                    <DropdownItem onClick={ApprovedResearches}>Approved</DropdownItem>
                                    <DropdownItem onClick={RejectedResearches}>Rejected</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </div>
                <br/>
                <ResearchTable rows={rows} status={status}/>
            </div>
            <Footer/>
        </div>
    );
}

export default ManageResearches;