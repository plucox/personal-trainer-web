import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import  { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/auth";



export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      localStorage.setItem("email", emailRef.current.value)
      localStorage.setItem("logged", true)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <>
    <br />
<<<<<<< HEAD
    <div className="d-flex justify-content-center">
      <Card className="w-25 p-3">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required/>
          </Form.Group>
          <Button disabled={loading} className="w-100" type="submit">Log In</Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">Need an account? <Link to="/signup">Sign Up</Link></div>
        <div className="w-100 text-center mt-2"><Link to="/">Back to home</Link></div>
        <br />
      </Card>
=======
    
      <div className="d-flex justify-content-center">
        <Card className="w-25 p-3">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} >
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Log In</Button>
            </Form>
          </Card.Body>
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign in with Google
          </button>
          <div className="w-100 text-center mt-2">Need an account? <Link to="/signup">Sign Up</Link></div>
          <div className="w-100 text-center mt-2"><Link to="/">Back to home</Link></div>
          <br />
        </Card>
>>>>>>> 065594607824e3bb767f34f2ba2a9e3c608d1ad8
      </div>
    </>
  )
}
