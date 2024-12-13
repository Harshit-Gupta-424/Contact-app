import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import contactImage from "../images/contact image.png"

const ContactDetails = ({ showBackButton = true }) => {
    const { id } = useParams(); // Retrieve the ID from the URL
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve all contacts from localStorage
        const savedContacts = JSON.parse(localStorage.getItem("contacts"));

        // Find the contact with the matching ID
        if (savedContacts) {
            const foundContact = savedContacts.find(contact => contact.id === id);

            setContact(foundContact);
        }
    }, [id]); // Depend on 'id' so it re-runs when the ID changes

    if (!contact) {
        return <div>Contact not found!</div>;
    }

    return (
        <div>
            <div className="ui card" style={{ width: "300px", margin: "20px auto", background: "grey" }}>
                <div className="image">
                    <img
                        src={contactImage}
                        alt={contact.name}
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="content">
                    <div className="header">{contact.name}</div>
                    <div className="description">{contact.phoneNo}</div>
                </div>
            </div>
            {showBackButton && (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="ui button blue" onClick={() => navigate("/")} style={{ fontSize: "17px" }}>
                    Back to Contact List
                </button>
            </div>)}
        </div>
    );
};

export default ContactDetails;
