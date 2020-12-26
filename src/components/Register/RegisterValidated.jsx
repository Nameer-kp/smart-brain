import React,{useState} from 'react';
import { useFormik } from "formik";


const Register = ({loadUser,isSignedIn,history,signIn}) => {
  

    const [isTaken,setTaken] = useState(false);
    // redirecting user if he already have the valid jwt token
    if(isSignedIn){
      history.push("/home")
    }
    

    const validate = values => {
        const errors = {};
        if (!values.name) {
          errors.mame = 'Required';
        } else if (values.name.length > 15) {
          errors.mame = 'Must be 15 characters or less';
        }
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = "Cannot be blank";
          } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
          }
      
        return errors;
      };

    
   
    const onSubmitRegister=(values)=>{
        
        fetch('http://localhost:3001/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:values.email,
                password:values.password,
                name:values.name
            })
        }).then(response=>response.json())
        .then(user=>{
            if(user.id){
                loadUser(user)
                signIn('home');
                history.push("/home")

            }
            else {
                console.log("already taken");
                setTaken(true);
            }
        })
    
    }
    const formik = useFormik({
        initialValues: {
          name: '',
          password: '',
          email: '',
        },
        validate,
        onSubmit: onSubmitRegister
      });
      if (!isSignedIn===null){ //shows loading while jwt checking
        return <h1>Loading</h1>
      }
      else{
    
    return(
        
        <form onSubmit={formik.handleSubmit} className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            {isTaken?<div style={{display:"inline",alignItems:"center"}}>Email already Taken</div>:false}
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="user-name">UserName</label>
                            <input onChange={formik.handleChange} 
                            className="pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  id="name"
                            value={formik.values.name}/>
                                   {formik.errors.name ? <div>{formik.errors.name}</div> : null}

                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={formik.handleChange} 
                            className="pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email"
                            value={formik.values.email}/>
                                   {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 " htmlFor="password">Password</label>
                            <input onChange={formik.handleChange} 
                            className="b pa2 input-reset ba b--black  bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                  

                        </div> {formik.errors.password ? <p style={{width:'12rem'}} className='center'>{formik.errors.password}</p> : null}
                    </fieldset>
                    <div className="">
                        <button
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"> Register </button>
                    </div>
                </div>
            </main>
        </form>
        
    )
      }
    }
export default Register;