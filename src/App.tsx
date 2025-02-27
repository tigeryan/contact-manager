import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';
//import { useQuery } from '@tanstack/react-query'
//import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './App.css'
//import axiosClient from "./services/axiosInstance";
//import { PropsFromToggle } from 'react-bootstrap/esm/DropdownToggle';

// Main App Component    ===   
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="max-w-2xl mx-auto">
        <Routes>
          <Route path="/" element={<ContactManager />} />
          <Route path="/contactadd" element={<ContactAdd />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const ContactManager: React.FC = () => {
  const [filterText, setFilterText] = useState<string>("");

  const [theContacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:51645/contacts.cfc?method=listContacts&returnformat=plain');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setContacts(json);
        setLoading(false);
      } catch (e) {
        setError((e as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Container>
        <ComponentHeader />
        <ContactSearch filterText={filterText} onFilterTextChange={setFilterText} />
        <ContactHeader />
        <ContactList contacts={theContacts} filterText={filterText} />
        <AddRow />
      </Container>
    </>
  )
}

const ContactAdd: React.FC = () => {

  return (
    <>
      <Container>
        <ComponentHeader />
        <ContactAddForm />
        <Row>
          <Col><ButtonGroup className="me-2" aria-label="Add"><Button variant="success" as="a" href="/">Back to List</Button></ButtonGroup></Col>
        </Row>        
      </Container>
    </>
  )
}

// end routing 

// begin components

function ContactAddForm() {

  //const [formData, setFormData] = useState<FormData>({ firstname: '', lastname: '' });
  const formRef = useRef<HTMLFormElement>(null);

  /*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };*/

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    console.log('Form data: ', formDataObj.firstname, formDataObj.lastname, formDataObj.email, formDataObj.cellphone);

    // Send the form data to the server


  };

  return (
    <>
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Row><Col><h2>Add New Contact</h2></Col></Row>
    <FloatingLabel controlId="firstname" label="First Name" className="mb-3">
      <Form.Control type="text" name="firstname" placeholder="first name" required />
    </FloatingLabel>
    <FloatingLabel controlId="lastname" label="Last Name" className="mb-3">
      <Form.Control type="text" name="lastname" placeholder="last name" required />
    </FloatingLabel>
    <FloatingLabel label="email" className="mb-3">
      <Form.Control type="email" id="email" name="email" placeholder="name@example.com" required />
    </FloatingLabel>
    <FloatingLabel controlId="cellphone" label="Cell Phone" className="mb-3">
      <Form.Control type="text" name="cellphone" placeholder="555-555-5555" required />
    </FloatingLabel>
    <ButtonGroup className="me-2" aria-label="Add"><Button type="submit" variant="success">Save Contact</Button></ButtonGroup>
    </Form><br />
  </>
  );
}

function ComponentHeader() {
  return (
    <Row>
      <Col><h1>A Contact Manager</h1></Col>
    </Row>
  );
}


function ContactSearch({filterText,onFilterTextChange}:Props) {
  return (
    <form className="searchForm">
      <input type='text' value={filterText} onChange={(event) => onFilterTextChange(event.target.value)} placeholder='Search...' />
    </form>
  );
}

function ContactHeader() {
  return (
    <Row className="rowHeader">
      <Col>First Name</Col>
      <Col>Last Name</Col>
      <Col>Email Address</Col>
      <Col>Cell Phone</Col>
      <Col>Actions</Col>
    </Row>
  );
}


function ContactList({contacts ,filterText}:ContactListProps) {
  const rows: React.ReactNode[] = [];

  contacts.forEach((contact: Contact) => {
    if (contact.firstname.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(<ContactRow contact={contact} key={contact.id} />);
  })
  
  return (
    <>
      {rows}
    </>
  );
}

function ContactRow({contact}:{contact:Contact}) {

  return(
    <Row className="rowContact">
      <Col>{contact.firstname}</Col>
      <Col>{contact.lastname}</Col>
      <Col>{contact.email}</Col>
      <Col>{contact.cellphone}</Col>
      <Col><ButtonGroup aria-label="Action"><Button variant="primary" className="btnActions">Edit</Button><Button variant="danger" className="btnActions">Delete</Button></ButtonGroup></Col>
    </Row>
  );
}

function AddRow() {

  return (
    <Row>
      <Col><ButtonGroup className="me-2" aria-label="Add"><Button variant="success" as="a" href="/contactadd">Add New Contact</Button></ButtonGroup></Col>
    </Row>
  );
}

export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  cellphone: string;
}

export interface Props {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
}

export interface ContactListProps {
  contacts: Contact[];
  filterText: string;
}
/*
const CONTACTS: Contact[] = [
  {
    firstname: "Emma",
    lastname: "Rodriguez",
    email: "emma.r@email.com",
    cellphone: "(555) 123-4567",
    id: 1
  },
  {
    firstname: "Liam",
    lastname: "Chen",
    email: "liam.chen@email.com",
    cellphone: "(555) 234-5678",
    id: 2
  },
  {
    firstname: "Sophia",
    lastname: "Patel",
    email: "sophia.p@email.com",
    cellphone: "(555) 345-6789",
    id: 3
  },
  {
    firstname: "Noah",
    lastname: "Williams",
    email: "noah.w@email.com",
    cellphone: "(555) 456-7890",
    id: 4
  },
  {
    firstname: "Ava",
    lastname: "Johnson",
    email: "ava.j@email.com",
    cellphone: "(555) 567-8901",
    id: 5
  },
  {
    firstname: "Marcus",
    lastname: "Thompson",
    email: "marcus.t@email.com",
    cellphone: "(555) 678-9012",
    id: 6
  },
  {
    firstname: "Isabella",
    lastname: "Garcia",
    email: "isabella.g@email.com",
    cellphone: "(555) 789-0123",
    id: 7
  },
  {
    firstname: "Ethan",
    lastname: "Kim",
    email: "ethan.k@email.com",
    cellphone: "(555) 890-1234",
    id: 8
  },
  {
    firstname: "Olivia",
    lastname: "Smith",
    email: "olivia.s@email.com",
    cellphone: "(555) 901-2345",
    id: 9
  },
  {
    firstname: "Alexander",
    lastname: "Ceci",
    email: "alex.b@email.com",
    cellphone: "(555) 012-3456",
    id: 10
  }
];
*/

export default App
