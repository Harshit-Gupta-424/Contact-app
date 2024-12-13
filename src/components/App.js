import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Header from "./Header";
import "./App.css";
import ContactDetails from "./ContactDetails";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isInitialised, setIsInitialised] = useState(false)
  const [searchContacts, setSearchContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const LOCAL_STORAGE_KEY = "contacts";

  // Function to add a new contact
  const addContactHandler = (contact) => {
    setContacts([...contacts, contact]);
  };

  const updateContactHandler = (newContact) => {
    const newContacts =
      contacts.map((contact) =>
        contact.id === newContact.id ? newContact : contact
      )
    setContacts(newContacts);
  }

  const removeContactById = (id) => {
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContacts)
  }

  const searchContactsHandler = (searchTerm) => {
    setSearchTerm(searchTerm)

    if (searchTerm !== "") {
      const contactSearched = contacts.filter((contact) => {
        const filteredValues = Object.keys(contact)
          .filter((key) => key !== "id") // Exclude the 'id' field
          .map((key) => contact[key]); // Get the corresponding values
        return filteredValues.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })

      setSearchContacts(contactSearched)
    }
    else
      setSearchContacts(contacts)
  }

  // UseEffect to retrieve contacts from localStorage on component mount
  useEffect(() => {
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setContacts(retrievedContacts);
    setIsInitialised(true);
  }, []);

  // UseEffect to store contacts in localStorage whenever contacts change
  useEffect(() => {

    if (isInitialised || contacts.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, isInitialised]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/addContact" element={<AddContact addContactHandler={addContactHandler} />}></Route>
          <Route exact path="/" element={<ContactList contacts={searchTerm.length>0 ? searchContacts : contacts} removeContactById={removeContactById} searchContactsHandler={searchContactsHandler} searchTerm={searchTerm} searchContacts={searchContacts} />}></Route>
          <Route exact path="contact/:id" element={<ContactDetails contacts={contacts} />}></Route>
          <Route exact path="deleteContact/:id" element={<DeleteContact contacts={contacts} removeContactById={removeContactById} />}></Route>
          <Route exact path="editContact/:id" element={<EditContact updateContactHandler={updateContactHandler} contacts={contacts} />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
