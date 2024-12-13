import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ContactCard = (props) => {
    const contact = props.contact
    const sno = props.sno;
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.setItem("selectedContact", JSON.stringify(contact)); // Save the contact in local storage
    };

    return (
        <div className="ui container" style={{ "margin-top": "20px" }}>
            <div className="ui grid">
                <div className="five wide column">
                    <h4>Sno.</h4>
                    {sno+1}
                </div>
                <div className="four wide column">
                    <h4>Name</h4>
                    {contact.name}
                </div>
                <div className="four wide column">
                    <h4>Phone Number</h4>
                    {contact.phoneNo}
                </div>
                <div className="one wide column" style={{fontSize: "1.5rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/contact/${contact.id}`} onClick={handleClick}>
                        <i className="eye icon" style={{ cursor: 'pointer' }}></i>
                    </Link>
                </div>
                <div className="one wide column" style={{fontSize: "1.5rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/editContact/${contact.id}`} >
                        <i className="edit icon" style={{ cursor: 'pointer' }}></i>
                    </Link>
                </div>
                <div className="" style={{fontSize: "1.3rem", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:"5px"}}>
                    <i className="trash icon red link" onClick={()=> navigate(`/deleteContact/${contact.id}`)}></i>
                </div>
            </div>
            <div className="ui divider"></div>
        </div>
    )
}

export default ContactCard
