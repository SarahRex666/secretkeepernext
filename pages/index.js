import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';


export default function Home() {
  const [ userMessage, setUserMessage ] = useState('')

  console.log(userMessage)

  const handleChange = (e) => {
    setUserMessage(e.target.value)
  }

    const handleSubmit = (event) => {
    event.preventDefault()
    fetch("https://secretkeeperproject.herokuapp.com/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 3,
        message: userMessage,
      }),
    })
      .then((r) => r.json()).then((res) => console.log(res))
  }
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="tell me a secret" onChange={handleChange}/>
      <input type="Submit" />
      </form>
    </div>
  )
}
