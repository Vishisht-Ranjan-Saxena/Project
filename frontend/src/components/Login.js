import { Formik } from 'formik';
import React from 'react';
import './login.css';
import pic from '../images/pexels-photo-1078810.jpeg';
import Swal from "sweetalert2";

const Login = () => {

    const userSubmit = async (formdata) => {
        console.log(formdata);

        //1. url
        //2. request method
        //3. data
        //4. Data format

        const res = await fetch('http://localhost:5000/user/authenticate', {
            method: 'POST',
            body : JSON.stringify(formdata),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if(res.status === 200){
            Swal.fire({
                icon : 'success',
                title : 'Login Successful',
                text : 'You are now logged in..'
            })
        }
        else if(res.status === 400){
            Swal.fire({
                icon : 'error',
                title : 'Login Failed',
                text : 'Invalid username or password..'
            })
        }
        else{
            Swal.fire({
                icon : 'error',
                title : 'Login Failed',
                text : 'Something went wrong !!'
            })
        }
    }

    return (
        <div>
            <div className="col-md-10 mx-auto">
                <div class="row mb-5">
                    <div className="col-1"></div> 
                    <div className="col-5">   
                        <div className="card mt-5">
                            <div className="card-body">

                                <Formik initialValues={{email : '', password : ''}} onSubmit={userSubmit}>
                                    {({values, handleChange, handleSubmit}) => (
                                        <form onSubmit={handleSubmit}>
                                            
                                            <h3 className="text-center text-primary" style={{fontFamily:"Roboto,bold"}}>Sign-in Here</h3>
                                            <hr className='bg-primary' style={{height: "2px"}} />

                                            <label className='mt-4'>Email</label>
                                            <input value={values.email} type="email" onChange={handleChange} id="email" className='form-control' />
                                            
                                            <label className='mt-4'>Password</label>
                                            <input value={values.password} onChange={handleChange} id="password" type="password" className='form-control' />
                                        
                                            <div class="form-check d-flex justify-content-start mt-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="form1Example3"
                                                />
                                                <label class="form-check-label" for="form1Example3">
                                                    {" "}
                                                    Remember me{" "}
                                                </label>
                                            </div>

                                            <button className='btn btn-primary mt-2' type="submit">Login Now</button>
                                            
                                            &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                                            
                                            {/* <button className='btn btn-danger mt-2' type="reset">Reset</button> */}

                                            <br />  
                                            <br />

                                            <a class="small text-muted align-left" href="#!">
                                                Forgot password?
                                            </a>

                                            <br />    <br />

                                            <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                                Don't have an account?{" "}
                                                <a href="./signup" style={{ color: "#393f81" }}>
                                                Register here
                                                </a>
                                            </p>

                                            <a href="#!" class="small text-muted">
                                                Terms of use.
                                            </a>
                                            {/* &nbsp;  &nbsp;  &nbsp; */}
                                            <br />
                                            <a href="#!" class="small text-muted text-left">
                                                Privacy policy
                                            </a>

                                        </form>
                                    )}
                                </Formik>

                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                    <div className="card mt-5 mb-5" style={{height: "92.4%"}}>
                            <div className="card-body">

                            <div class="col-lg d-flex align-items-center gradient-custom-2">
              <div class=" ">
                <h4 class="mb-4">This is more than just a chat app</h4> <br />
                <img src={pic} style={{width:"100%"}} />    <br /><br />
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
  )
}

export default Login;