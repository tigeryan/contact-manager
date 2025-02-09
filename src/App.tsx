import React, { useState } from 'react'
//import React, {  } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'
//import { PropsFromToggle } from 'react-bootstrap/esm/DropdownToggle';


export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  cellphone: string;
}

function App() {
  const [filterText, setFilterText] = useState<string>("");

  return (
    <>
      <Container>
        <ComponentHeader />
        <ContactSearch filterText={filterText} onFilterTextChange={setFilterText} />
        <ContactHeader />
        <ContactList contacts={CONTACTS} filterText={filterText} />
        <AddRow />
      </Container>
      
    </>
  )
}

function ComponentHeader() {

  return (
    <Row>
      <Col><h1>A Contact Manager</h1></Col>
    </Row>
  );
}

export interface Props {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
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

export interface ContactListProps {
  contacts: Contact[];
  filterText: string;
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
      <Col><ButtonGroup className="me-2" aria-label="Add"><Button variant="success">Add New Contact</Button></ButtonGroup></Col>
    </Row>
  );
}

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


export default App
