import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditContact = (props) => {
    const updateContactHandler = props.updateContactHandler;
    let contacts = props.contacts;
    const [contactDetails, setContactDetails] = useState({ name: "", phoneNo: "" });
    const navigate = useNavigate();
    const { id } = useParams();

    
    useEffect(() => {
        // Find the contact to be edited using the ID from the URL
        const foundContact = contacts.find((contact) => contact.id === id);
        if (foundContact) {
            setContactDetails(foundContact); // Populate the form with contact details
        }
    }, [id, contacts]); // Re-run this effect if `id` or `contacts` change
  

    const submitContact = (e) => {
        e.preventDefault();

        if (contactDetails.name === "" || contactDetails.phoneNo === "") {
            alert("All the fields are mandatory!!!");
            return;
        }

        const newContact = {
            ...contactDetails,
            id: id
        }

        updateContactHandler(newContact); 
        setContactDetails({id: "", name: "", phoneNo: "" }); 
        navigate("/")
    };

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={submitContact}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={contactDetails.name}
                        onChange={(e) =>
                            setContactDetails({ ...contactDetails, name: e.target.value })
                        }
                    />
                </div>
                <div className="field">
                    <label htmlFor="phoneNo">Phone no</label>
                    <input
                        type="tel"
                        id="phoneNo"
                        placeholder="Enter your phone no"
                        value={contactDetails.phoneNo}
                        onChange={(e) =>
                            setContactDetails({ ...contactDetails, phoneNo: e.target.value })
                        }
                    />
                </div>
                <button className="ui button blue" type="submit">
                    Update
                </button>
                <Link to={"/"}>
                    <button className="ui button green" style={{marginLeft: "10px"}}>Back to Contact List</button>
                </Link>
            </form>
        </div>
    );
};

export default EditContact;
