import React from 'react';
import {MDBFooter, MDBContainer, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';

export default function App() {
    return (
        <MDBFooter style={{
            backgroundColor: 'rgba(0, 47, 255, 0.1)',
            position: 'relative',
            height: 'auto',
            bottom: '-50px',
            left: '0',
            width: '100%'
        }} className='text-lg-left'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>stay connected</h5>
                        <div className="social-icons">
                            <span className="social"><FacebookIcon fontSize="large"/></span>
                            <span className="social"><TwitterIcon fontSize="large"/></span>
                            <span className="social"><InstagramIcon fontSize="large"/></span>
                            <span className="social"><WhatsAppIcon fontSize="large"/></span>
                            <span className="social"><EmailIcon fontSize="large"/></span>
                        </div>
                    </MDBCol>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <MDBRow>
                            <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                                <h5 className='text-uppercase'>ICAF Conference</h5>
                                <p>
                                    No 25,<br></br>
                                    Galle Road,<br></br>
                                    Sri Lanka<br></br>
                                    (Phone/Fax: +94-115-457-578)<br></br>
                                    email: info@icaf.com<br></br>
                                </p>
                            </MDBCol>
                            <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                                <h5 className='text-uppercase'> Join with us <br/></h5>
                                <ul>
                                    <li><a href="#" className='text-dark'> Register</a></li>
                                    <li><a href="#" className='text-dark'>Conference </a></li>
                                    <li><a href="#" className='text-dark'>Workshops</a></li>
                                    <li><a href="#" className='text-dark'>Research</a></li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='p-3' style={{width:'100%',textAlign:'center', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='#'>
                    icaf.com
                </a>
            </div>
        </MDBFooter>
    );
}