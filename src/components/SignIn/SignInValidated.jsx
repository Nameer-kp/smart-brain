import React,{useState} from 'react';
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const SignInValidated = ({onRouteChange,loadUser}) => {

  const [invalid, setInvalid] = useState(false);

      
      return  <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
        
                fetch('http://localhost:3001/signin',{
                    method:'post',
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
                        onRouteChange('home');
                    }
                    else {
                        console.log("wrong crendintials");
                        setInvalid(true);
                        
                        
                    }
                }).catch(err=>{
                    console.log('error sigin in')
                })
            }
            
          }
          validate={values => {
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
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
      
            return (
                <form
                 onSubmit ={handleSubmit}
                  className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    
                <main className="pa4 black-80">
                {invalid?<div style={{display:"inline",alignItems:"center"}}>invalid crendintials</div>:false}
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input 
                                    value={values.email}
                                  onChange={handleChange}
                                  className={`pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-90 ${errors.email && touched.email} error`}  name="email"  id="email"/>
                                  {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                    )}
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 " htmlFor="password">Password</label>
                                <input 
                                    value={values.password}
                                  onChange={handleChange}
                                  className={`b pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-100 ${errors.password && touched.password} error`}
                                  type="password" name="password"  id="password"
                                  
                            />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                    )}
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            > Sign In </button>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
               
                </form>
            );
          }}
          
        </Formik>
};

    
export default SignInValidated;