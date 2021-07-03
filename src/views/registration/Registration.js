import React, {useEffect, useState} from "react";
import Title from "../../components/header/Title";
import ConferenceCard from "../../components/common/ConferenceCard";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {useHistory} from "react-router-dom";
import API from "../../components/api";

const token =JSON.parse(sessionStorage.getItem("token"));

const Registration =()=>{
    const [rows, setRows] = useState([]);
    let count = 0;
    const token = JSON.parse(sessionStorage.getItem("token"));
    const history = useHistory();
    useEffect(() => {
        if(token != null){
            if(token.type!=="user"){
                history.replace("/login");
            }
        }else{
            history.replace("/login");
        }

        API.get(`/conference/`)
            .then(res => {
                setRows(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <div>
            <Header/>
            <Title title="CONFERENCE"/>
            {rows.length > 0 && rows.map(row => {
                if (row.status === "approved") {
                    count++;
                    return (
                        <ConferenceCard key={row._id} row={row}/>
                    );
                }
            })
            }
            {
                count === 0 && (<div className="workshop-not-available">
                    <h2>Conferences are currently unavailable</h2>
                    <br/>
                    <p>There are no any conference currently available for now.</p>
                </div>)
            }
            <Footer/>
        </div>
    );
}

export default Registration;