import React, { useState, useEffect } from "react"
import { Form, FormControl, FormGroup, Container, Row, Column, Image } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function getStaticPaths() {
  const res = await fetch('https://secretkeeperproject.herokuapp.com/users')
  const users = await res.json()

  const paths = users.map((user) => {
    return { params: { id: user.id.toString() } }
  })
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: paths,
      fallback: 'blocking',
    }
  }



    return { paths, fallback: false }
}

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

  const handleSubmit = () => {
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
      .then((r) => r.json()).then(setUserMessage(''))
  }

    return (
    <div style={{background: "#252827"}}>
    <div class="d-flex justify-content-center">
      <Image className="mx-5 my-5" src="https://i.ibb.co/XFcknLB/spyro.png"></Image>
    </div>
    <div >
    <Form className="mx-5" onSubmit={handleSubmit} >
      <Form.Group className="mx-5" controlId="userMessage">
        <Form.Control as="textarea" placeholder="Tell Me A Secret" rows={10} onChange={handleChange} />
      </Form.Group>
      <Button className="mx-5 my-5" variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    )
}