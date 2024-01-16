import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Input = () => {
    const [text, setText] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();

        const payload = { input: text }

        const headers = {
            Authorization: `Bearer ${import.meta.env.REACT_APP_KEY}`,
            "Content-Type": "application/json",
        }
        axios.post("http://127.0.0.1:54321/functions/v1/textembed", payload, { headers,})};

    return (
        <>
        <div className="mb-3 container d-flex align-items-center justify-content-center mt-5" style={{ maxWidth: "22rem"}}>
        <Form onSubmit={submitHandler}>

            <InputGroup className="mb-3" onChange={(e) => setText(e.target.value)} defaultValue={text} >
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
            
                <Button type="submit" variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            
        </Form>
        </div>
        </>
    )
};

export default Input;
