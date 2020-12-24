import React,{useState} from 'react';
import { useFormik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const SignInValidated = ({isSignedIn,loadUser,history}) => {

  const [invalid, setInvalid] = useState(false);

  const onSubmit=(values) => {
        
    fetch('http://localhost:3001/signin',{
        method:'post',
        credentials:'include',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:values.email,
            password:values.password
        })
    }).then(response=>response.json())
    .then(user=>{
        if(user.id){
            console.log("gettingit",user);
            loadUser(user);
            isSignedIn('home');    
            history.push("/home")

        }
        else {
            console.log("wrong crendintials");
            setInvalid(true);
            
            
        }
    }).catch(err=>{
        console.log('error sigin in')
    })

  }

  
       const validate=values => {
            let errors = {};
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!values.email) {
              errors.email = "Cannot be blank";
            } else if (!regex.test(values.email)) {
              errors.email = "Invalid email format";
            }
            if (!values.password) {
              errors.password = "Cannot be blank";
            } else if (values.password.length < 2) {
              errors.password = "Password must be more than 4 characters";
            }
            if (!values.password) {
                errors.password = "Required";
              }

            return errors;
          }

      const formik = useFormik({
        initialValues: {
          password: '',
          email: '',
        },
        validate,
        onSubmit
      })
        
            return (
                <form
                 onSubmit ={formik.handleSubmit}
                  className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    
                <main className="pa4 black-80">
                {invalid?<div style={{display:"inline",alignItems:"center"}}>invalid crendintials</div>:null}
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input 
                                    value={formik.values.email}
                                  onChange={formik.handleChange}
                                  className={`pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-90`}  name="email"  id="email"/>
                                   {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 " htmlFor="password">Password</label>
                                <input 
                                    value={formik.values.password}
                                  onChange={formik.handleChange}
                                  className={`b pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-100 `}
                                  type="password" name="password"  id="password"
                                  
                            />
                                 {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit" 
                            > Sign In </button>
                        </div>
                        <div className="lh-copy mt3">
                            <Link to="/register" className="f6 link dim black db pointer">Register</Link>
                        </div>
                    </div>
                </main>
               
                </form>
            );
     }
          
        
        

    
export default SignInValidated;