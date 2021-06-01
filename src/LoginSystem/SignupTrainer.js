import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import  { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import API from '../API';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  var user, email, uid;

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== 
      passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      user = firebase.auth().currentUser;
      if (user!=null){
      email = user.email;
      uid = user.uid;
      }
      API.post('trainer', {
        "_id": uid,
        "email": email
      }).then(function(result){
          console.log(result);
      })
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <>
    <br />
    <div className="d-flex justify-content-center">
      <Card className="w-25 p-3">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Typography variant="h6" gutterBottom>
            Create an account as Trainer <Link to="/signup">or as Mentee</Link>
          </Typography>
          <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required/>
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required/>
          </Form.Group>
          <GoogleButton
            label='Sign up with Google'
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider).then(function() {
                user = firebase.auth().currentUser;
                if (user!=null){
                email = user.email;
                uid = user.uid;
                }
                API.post('trainer', {
                    "_id": uid,
                    "email": email
                  }).then(function(result){
                      console.log(result);
                  })
                history.push("/");
              }).catch(function(error) {
                console.log(error);
              });
            }}
          />
          <br/>
          <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">Already have an account? <Link to="/login">Log In</Link></div>
        <div className="w-100 text-center mt-2"><Link to="/">Back to home</Link></div>
        <br />
      </Card>
      </div>
    </>
  )
}
