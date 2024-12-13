import React from 'react'
import ContactDetails from './ContactDetails'
import { useParams, useNavigate } from "react-router-dom";

const DeleteContact = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const deleteContactById = (e) => {

        props.removeContactById(id)
        navigate("/")
    }

    return (
        <div >
            <div
                className="ui container"
                style={{
                    padding: "20px",
                    maxWidth: "400px",
                    margin: "20px auto",
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                }}
            >
                <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Confirm Deletion</h2>

                <p style={{ marginBottom: "30px", color: "#555" }}>
                    Are you sure you want to delete this contact? This action cannot be undone.
                </p>

                <div>
                    <button
                        className="ui button red"
                        style={{
                            padding: "10px 20px",
                            fontSize: "1rem",
                            borderRadius: "5px",
                            marginRight: "10px",
                            flex: 1,
                        }}
                        onClick={deleteContactById}
                    >
                        Delete
                    </button>
                    <button
                        className="ui button grey"
                        style={{
                            padding: "10px 20px",
                            fontSize: "1rem",
                            borderRadius: "5px",
                            marginLeft: "10px",
                            flex: 1,
                        }}
                        onClick={()=> navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <ContactDetails showBackButton={false} />
        </div>
    )
}

export default DeleteContact
