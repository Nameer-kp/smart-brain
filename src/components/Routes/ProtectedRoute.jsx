import React, { useState,useEffect } from 'react';
import {Redirect, Route} from 'react-router-dom';


export const ProtectedRoute =({render,isSignedIn,loadUser,signIn,...rest}) =>{
    
        
    
   
        
        return(
        <Route {...rest} //passing the props to this route
        render ={props=>{ //creating render prop
        //     

            if(isSignedIn){
                return render(props)
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
