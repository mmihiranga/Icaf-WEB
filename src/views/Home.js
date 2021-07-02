import React, { useEffect, useState } from 'react'
import API from "../components/api";
import AdminConference from "../components/admin/AdminConference";
import { Contdown } from "../components/common/Contdown";
import Button from "react-bootstrap/Button";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Elon from '../img/elon.jpg'
import Jeff from '../img/jeff.jpg'
import Mark from '../img/mark.jpg'



const Home = ({ days, Minutes, Seconds, Hours }) => {



    const [rows, setRows] = useState('');
    const [title, setTitle] = useState("");
    const [venue, setVenue] = useState("");
    const [desc, setDescription] = useState("");
    const [Sdate, setStartDate] = useState("");
    const [Edate, setEndDate] = useState("");
    const [org, setOrg] = useState("");


    const token = JSON.parse(sessionStorage.getItem("token"));


    useEffect(() => {
        API.get(`/conference/`)
            .then(res => {
                setRows(res.data)
                getApproveConf(rows)
            })
            .catch(err => {
                console.log(err)
            });
    }, [rows]);





    const getApproveConf = (rows) => {

        for (let i = 0; i < rows.length; i++) {

            if (rows[i].status == "approved") {


                setTitle(rows[i].topic)
                setDescription(rows[i].desc)
                setVenue(rows[i].venue)
                setStartDate(rows[i].startDate)
                setEndDate(rows[i].endDate)
                setOrg(rows[i].organizer)

            }
        }
    }










    return (
        <div>
            <Header />
            <section className="home">



                <div className="conf-main">
                    <div className="conf-MainTitle"> Annual <text style={{ color: "blue" }}><br />Conference</text> SLIIT {(new Date().getFullYear())}
                        <br />
                        <Button className="conf-info">More Info</Button>
                    </div>


                </div>


            </section>

            <div className="conf-main2">

                <div className="conf-main3">


                    <div className="conf-title"> {title} </div>

                    <div className="conf-venue"> {venue} </div>

                    <div className="conf-desc">{desc}</div>



                    <div className="conf-Pdate">
                        <div className="conf-Sdate">{Sdate} </div>
                        <div style={{ fontSize: "20px", margin: "20px" }}>-</div>
                        <div className="conf-Edate">{Edate}</div>
                    </div>

                    <div className="conf-Org">Organized By - {org}</div>

                </div>


            </div>
            <div>
                <Contdown />
            </div>



            <div style={{ height: '1040px' }}>
                {/* just to make scrolling effect possible */}
                <div className="content">
                    
                <h2 className="contTitle">ICAF Conference</h2> 
                    ICAF is a conference management system and its is becoming most powerful event manager for handling the international conferences. Several web based conference management systems have been developed in the paradigm of open source, which are used by most of the universities and colleges. All the conference management systems were built on web-servers. The organizing process consists of very time consuming and full of paper work for event handling such as Call for papers, submission of papers by authors, review process, registration process of author and general participants. So an easy to use framework of conference management system is needed to cater the need of the non-technical people. The developed model is easy to handle and automates the process of the events one after the other without intervention of the editor, reviewer and author for developing ready to publish research papers for any organization.
                    </div>
                    <div className="keynote-back">
                    <h2 className="keyTitle">Key Note Speakers</h2>
                    <div className="keyImg">
                        <div className="keyPicE">
                            <img className="keyP elon" src={Elon} alt="" />

                        </div>
                        <div className="keyPicJ">


                            <img className="keyP jack" src={Jeff} alt="" />
                        </div>
                        <div className="keyPicM">
                            <img className="keyP markZ" src={Mark} alt="" />

                        </div>
                    </div>
                </div>
            </div>
            <div>
            <h2 className="contactTitle">Contact Us</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467112166!2d79.9707558152513!3d6.914682820409242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1625155676486!5m2!1sen!2slk"
                    style={{
                        width: "100%",
                        height: "450px",
                        frameBorder: "0",
                        style: "border:0;",
                        allowFullScreen: "",
                        tabIndex: "0"
                    }}

                />
            </div>
            {/* <div>
                <AdminConference/>
            </div> */}
            <Footer />
        </div>

    )
}

export default Home;