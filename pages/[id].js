import React, { useState, useEffect } from "react"
import { Form, FormControl, FormGroup, Container, Row, Column, Image } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const res = await fetch('https://secretkeeperproject.herokuapp.com/users')
const users = await res.json()

export async function getStaticPaths() {
    return {
        paths,
        fallback: false,
    }
}

const paths = users.map((user) => {
    return { params: { id: user.id.toString() } }
})

export async function getStaticProps({ params }) {
  return {
    // Passed to the page component as props
    props: params,
  }
}

export default function UserPage(props){
    const [ userMessage, setUserMessage ] = useState('')

  const handleChange = (e) => {
    setUserMessage(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch("https://secretkeeperproject.herokuapp.com/message", {
      method: "POST",
      withCredentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: props.id,
        message: userMessage,
      }),
    })
      .then((r) => r.json()).then((res) => console.log(res))
  }

    return (
    <div  style={{background: "#252827"}}>
    <div class="d-flex justify-content-center">
      <Image src="https://i.ibb.co/XFcknLB/spyro.png"></Image>
    </div>
    <div class="d-flex justify-content-center text-align-center">
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mx-5" controlId="userMessage">
        <Form.Control as="textarea" placeholder="Tell Me A Secret" rows={5} onChange={handleChange} />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    )
}