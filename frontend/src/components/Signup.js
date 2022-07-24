import { Button, TextField } from "@mui/material"
import { Formik } from "formik"
import React from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  // 1. Submit function
  // 2. Formik implement in JSX
  // 3. initial Values

  const navigate = useNavigate();

  const userSubmit = async (formdata) => {
    console.log(formdata);

    // 1. address
    // 2. request method
    // 3. data
    // 4. data format

    const response = await fetch('http://localhost:5000/user/add', {
      method: 'POST',
      body : JSON.stringify(formdata), //converting javascript object to json
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    if(response.status === 200){
      console.log('success');
      Swal.fire({
        icon : "success",
        title : "Well Done👍",
        text : "You have done a wonderfull Job!!"
      });
      navigate('/login');

    }else{
      console.log('error occured');
    }
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <div className="container">
      <div className="col-md-10 mx-auto">
      <div className="card mt-5">
                            <div className="card-body">
      <h1>Signup Here</h1>
      <hr />

      <Formik
        initialValues={{
          name: "",
          age: "",
          password: "",
          mobile: "",
          email: "",
        }}
        onSubmit={userSubmit} validationSchema={SignupSchema}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <TextField 
                value={values.name} 
                onChange={handleChange} 
                id="name" 
                sx={{ mt: 5 }} 
                fullWidth 
                label="Full Name"
                helperText={errors.name}
                error={errors.name ? true : false}
                />
            <TextField 
                value={values.email} 
                onChange={handleChange} 
                id="email" sx={{ mt: 5 }} 
                fullWidth 
                label="Email" />
            <TextField 
                value={values.mobile}
                onChange={handleChange} 
                id="mobile" 
                sx={{ mt: 3 }} 
                fullWidth 
                label="Mobile Number" />
            <TextField 
                value={values.age} 
                onChange={handleChange} 
                id="age" 
                sx={{ mt: 3 }} 
                fullWidth 
                label="Age" />
            <TextField
                value={values.password}
                onChange={handleChange}
                id="password"
                sx={{ mt: 3 }}
                fullWidth
                label="Password"
                type="password"
            />
            <button type="submit" className="btn-lg mt-5 btn-primary" >Submit</button>
          </form>
        )}
      </Formik>
      </div></div>
      </div></div>
  )
}

export default Signup