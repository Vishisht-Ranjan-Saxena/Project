
import { Formik } from 'formik';
import React from 'react';
import './login.css';

const Login = () => {

    const userSubmit = (formdata) => {
        console.log(formdata);

        //1. url
        //2. request method
        //3. data
        //4. Data format

        fetch('http://localhost:5000/user/authenticate', {
            method: 'POST',
            body : JSON.stringify(formdata),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    }

    return (
        <div>
            <div className="col-md-4 mx-auto bg-light">
                <div className="card mt-5">
                    <div className="card-body">

                        <Formik initialValues={{email : '', password : ''}} onSubmit={userSubmit}>
                            {({values, handleChange, handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    
                                    <h3 className="text-center">Sign-in Here</h3>
                                    <hr />

                                    <label className='mt-4'>Email</label>
                                    <input value={values.email} onChange={handleChange} id="email" className='form-control' />
                                    
                                    <label className='mt-4'>Password</label>
                                    <input value={values.password} onChange={handleChange} id="password" type="password" className='form-control' />
                                
                                    <button className='btn btn-secondary mt-5'>Login Now</button>

                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login;