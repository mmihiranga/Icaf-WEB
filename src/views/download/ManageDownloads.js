import React, {useState, useEffect} from 'react';
import {Col, Row,  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Title from "../../components/header/Title";
import Button from "react-bootstrap/Button";
import API from "../../components/api";
import { useHistory } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DownloadTable from "../../components/admin/DownloadTable"
import AddDocument from '../../components/admin/AddDocument';


const ManageDownloads = () => {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [status,setStatus] = useState("all");
    const [addDoc,setaddDocsPage] = useState(false);
    const token =JSON.parse(sessionStorage.getItem("token"));
    const userId = token.id;

    useEffect(() => {
        API.get(`/download/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [rows]);

    const AllWorkshops =()=>{
        setStatus("all");
    }
    const WorkshopTemplates = ()=>{
        setStatus("Workshop Templates")
    }
    const ResearchPaper =()=>{
        setStatus("Research Paper")
    }
    const OtherTemplates =()=>{
        setStatus("Other Templates")
    }

    const  addDocs= ()=>{
        // history.push("/admin/download/adddocuments");
        setaddDocsPage(true)
    }
    const  backDocs= ()=>{
        // history.push("/admin/download/adddocuments");
        setaddDocsPage(false)
    }
    return (
        <div>
            <div className="wr-table">
                <div className="wr-table-header">
                    <Row>
                        <Col className="wr-dashboard-header">
                            <h4>Manage Templates</h4>
                        </Col>
                        <Col className="wr-submit">
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Documents Filter
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={AllWorkshops}>All</DropdownItem>
                                    <DropdownItem onClick={WorkshopTemplates}>Workshop Templates</DropdownItem>
                                    <DropdownItem onClick={ResearchPaper}>Research Paper</DropdownItem>
                                    <DropdownItem onClick={OtherTemplates}>Other Templates</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div>
                {
                      addDoc ?   <Button className='addconf-btn' variant="primary" onClick={() => backDocs()} >Back</Button> : <Button className='addconf-btn1' variant="primary" onClick={() => addDocs()} >Add Templates</Button>
              }
              
              

              </div>
              
               
            </div>
              {
                      addDoc ?   history.push("/admin/download/adddocuments") : <DownloadTable rows={rows} status={status}/>  
              }
              <br/><br/><br/><br/>
        </div>
    );
}

export default ManageDownloads;
