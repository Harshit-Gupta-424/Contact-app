import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const AddContact = (props) => {
    const { addContactHandler} = props;
    const [contactDetails, setContactDetails] = useState({ name: "", phoneNo: "" });
    const navigate = useNavigate();
    const uniqueId = uuidv4();

    const submitContact = (e) => {
        e.preventDefault();

        if (contactDetails.name === "" || contactDetails.phoneNo === "") {
            alert("All the fields are mandatory!!!");
            return;
        }

        const newContact = {
            ...contactDetails,
            id: uniqueId
        }

        
        
        addContactHandler(newContact); 
        setContactDetails({id: "", name: "", phoneNo: "" }); 
        navigate("/")
    };

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
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
                    Submit
                </button>
                <Link to={"/"}>
                    <button className="ui button green" style={{marginLeft: "10px"}}>View Contact List</button>
                </Link>
            </form>
        </div>
    );
};

export default AddContact;
