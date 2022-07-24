import { Button, TextField } from "@mui/material"
import { Formik } from "formik"
import React from "react";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import pic from '../images/start.jpg';

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
    mobile: Yup.number().min(1000000000,'Required 10-digit mobile no.').max(9999999999,'Required 10-digit mobile no.').required('Required'),
    age: Yup.number().min(0).max(150).required('Required')
  });

  return (
    <div className="container mb-5">
      <div className="col-md-12 mx-auto" style={{marginLeft:"42px"}}>
      <div className="row">
        <div className="col-1"></div>
        <div className="card col-4 mt-5">
            <img className="x" src={pic} />
        </div>
        <div className="col-6 mt-5">
        <div className="card">
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
                fullWidth type="email"
                label="Email" 
                helperText={errors.email}
                error={errors.email ? true : false}
              />
            <TextField 
                value={values.mobile}
                onChange={handleChange} 
                id="mobile" 
                sx={{ mt: 3 }} 
                fullWidth   type="tel"
                label="Mobile Number" 
                helperText={errors.mobile}
                error={errors.mobile ? true : false}
              />
            <TextField 
                value={values.age} 
                onChange={handleChange} 
                id="age" 
                sx={{ mt: 3 }} 
                fullWidth 
                label="Age" 
                helperText={errors.age}
                error={errors.age ? true : false}
              />
            <TextField
                value={values.password}
                onChange={handleChange}
                id="password"
                sx={{ mt: 3 }}
                fullWidth
                label="Password"
                type="password"
                helperText={errors.password}
                error={errors.password ? true : false}
            />
            <button type="submit" className="btn-lg mt-5 btn-primary" >Submit</button>
          </form>
        )}
      </Formik>
      </div></div>
        </div>
      </div>
      </div></div>
  )
}

export default Signup