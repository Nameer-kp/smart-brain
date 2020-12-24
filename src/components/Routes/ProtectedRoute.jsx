import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

export const ProtectedRoute =({render,isSignedIn,loadUser,signIn,...rest}) =>{
    if(!isSignedIn){
        fetch('/home',{
            method:'get',
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            
        }).then(response=>response.json())
        .then(user=>{
            if(user.id){
                console.log("gettingit",user);
                loadUser(user);
                signIn('home');
                }
            
        }).catch(err=>{
            console.log('error sigin in')
        })
    }
   
        
        return(
        <Route {...rest} //passing the props to this route
        render ={props=>{ //creating render prop
        //     

            if(isSignedIn){
                return render(props)
            }

            // else {
            //   return <Redirect to={
            //       {
            //         pathname:"/",
            //         state:{
            //             from:props.location
            //         }
            //     }
            // }/>
            // }
            

        }
    }
        />
    )
}
