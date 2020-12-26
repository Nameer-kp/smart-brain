import React, { useState,useEffect } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { Home } from '../home/Home';


export const ProtectedRoute =({isSignedIn,...rest}) =>{
    
        
    
   
        
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
