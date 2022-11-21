import React, { useState, useEffect } from "react"


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
            <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="tell me a secret" onChange={handleChange}/>
        <input type="submit" /></form>
    </div>
    )
}