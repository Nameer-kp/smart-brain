import React, { useContext } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { SignInContext } from '../../App';
import { Home } from '../home/Home';



export const ProtectedRoute =({...rest}) =>{
    

    const {isSignedIn}=useContext(SignInContext)
        
    
   
        
        return(
        <Route {...rest} //passing the props to this route
        render ={props=>{ //creating render prop
        //     

            if(isSignedIn){
                return <Home {...rest} {...props}/>
            }

            else {
              return <Redirect to={
                  {
                    pathname:"/",
                    state:{
                        from:props.location
                    }
                }
            }/>
            }
            

        }
    }
        />
    )
}
