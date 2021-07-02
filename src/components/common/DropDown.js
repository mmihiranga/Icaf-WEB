import React from "react";
import {DropdownItem, DropdownMenu} from "reactstrap";
import { useHistory } from 'react-router-dom';
const token = JSON.parse(sessionStorage.getItem("token"));
let userType = "";

if(token){
    userType= token.type;
}

const DropDown = ()=>{
    const history = useHistory();

    const logOut=()=>{
        sessionStorage.removeItem("token");
        history.push("/login");
        window.location.reload();
    }
    const goToWorkshops = ()=>{
        history.push(`/profile/workshop/${token.id}`);
    }
    const goToResearches = ()=>{
        history.push(`/profile/research/${token.id}`);
    }
    const logIn = () =>{
        history.push("/login")
    }
    const register = () =>{
        history.push("/register")
    }
    const goToManageResearches = () =>{
        history.push(`/researches/manage/${token.id}`)
    }
    const goToManageWorkshops =()=>{
        history.push(`/workshops/manage/${token.id}`);
    }
    const goToManageConference =()=>{
        history.push(`/editor`);
    }

   
    if(userType==="user"){
        return(
            <div>
                <DropdownItem onClick={goToWorkshops}>Workshops</DropdownItem>
                <DropdownItem onClick={goToResearches}>Researches</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logOut}>LogOut</DropdownItem>
            </div>
        );

       
            history.push("/home");
      
    }else if(userType==="reviewer"){
        return(
            <div>
                <DropdownItem onClick={goToManageWorkshops}>Manage Workshops</DropdownItem>
                <DropdownItem onClick={goToManageResearches}>Manage Researches</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logOut}>LogOut</DropdownItem>
            </div>
        );
    }else if(userType==="editor"){
        return(
            <div>
                <DropdownItem onClick={goToManageConference}>Manage Conference</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logOut}>LogOut</DropdownItem>
            </div>
        );
    }else{

    return (
        <div>
             <DropdownItem onClick={register}>Register</DropdownItem>
            <DropdownItem onClick={logIn}>LogIn</DropdownItem>
        </div>
    );
}
}
export default DropDown;