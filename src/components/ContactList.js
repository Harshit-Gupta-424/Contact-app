import React from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'
const ContactList = (props) => {

    const searchContactsHandler = props.searchContactsHandler
    const searchTerm = props.searchTerm;
    const contacts = props.contacts

    const deleteContact = (id) => {
        props.removeContactById(id)
    }
    
    const renderContacts = props.contacts.map((contact) => {
        let sno = props.contacts.findIndex(newContact => newContact.id === contact.id);
        return (
            <ContactCard contact={contact} sno={sno} deletedContacts={deleteContact}></ContactCard>
        )
    })

    const handleSearch = (e) => {
        const term = e.target.value
        searchContactsHandler(term)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h1>Contact List</h1>
                <Link to={"/addContact"}>
                    <button className="ui button blue">Add Contact</button>
                </Link>
            </div>
            <div className="ui icon input" style={{ display: "flex", justifyContent: "center", width: "600px", margin: "auto" }}>
                <input
                    type="text"
                    placeholder="Search Contacts..."
                    style={{ width: "600px" }}
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <i className="search icon" style={{ cursor: "pointer" }}></i>
            </div>

            {contacts.length > 0 ? renderContacts: (
                <div style={{ textAlign: "center", padding: "20px", fontSize: "1.2rem", color: "grey" }}>
                    No contacts available.
                </div>
            )}

        </div>
    )
}

export default ContactList
