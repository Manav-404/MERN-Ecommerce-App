import React, { useState } from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import {signUp} from '../auth/helper/index'

const Signup = () =>{

    const [values , setValues] = useState({
        name : "" ,
        email : "",
        password : "",
        error : "",
        sucess : false
    });

    const {name , email , password , error , success} = values;

    const handleChange = name=> event =>{
        setValues({...values , error :false , [name] :event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values , error:false});
        signUp({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values , error:data.error , sucess : false})
            }else{
                setValues({ 
                    name : "" , 
                    email : "",
                    password : "",
                    error : "",
                    success : true
                })
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const signUpForm =()=>{
        return(
            <div className="d-flex justify-content-center">
            <div className="card authCard text-center">
                <div className="card-body">
                     <div className="row">
                         <div className="col-md-6 offset-sm-3 text-left">
                             <form>
                        <div className="form-group">
                            <label className="text-dark">Name</label>
                            <input value={name} className="form-control" type="text" onChange={handleChange("name")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input value={email} className="form-control" type="email" onChange={handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input value = {password} className="form-control" type="password" onChange={handleChange("password")}/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>

                    </form>
            </div>
        </div>
        </div>
        </div>
        </div>

        )
    }

    const successMessage = () =>{
       return( 
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success"
        style={{display:success? "" : "none"}}>
            Account Successfully Created . Please login <Link to="/signin">here</Link>
        </div>
            </div>
            </div>
     
        )
    }

    const errorMessage = () =>{
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger"
            style={{display:error? "" : "none"}}>
                {error}
            </div>
                </div>
                </div>
         )
     }


    return (
        <Base title="Signup" description="Let's get started">
            {successMessage()}
            {errorMessage()}
            <br/><br/>
            {signUpForm()}
        </Base>
    )
}


export default Signup;
