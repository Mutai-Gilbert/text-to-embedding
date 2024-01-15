import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const Input = () => {
    const [text, setText] = useState("");

    return (
        <>
        <div className="mb-3 container d-flex align-items-center justify-content-center mt-5" style={{ maxWidth: "22rem"}}>
        <InputGroup className="mb-3">
        <Form.Control
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
        Button
        </Button>
        </InputGroup>
        </div>
        </>
    )
};

export default Input;
