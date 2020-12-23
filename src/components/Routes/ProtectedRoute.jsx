import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

export const ProtectedRoute =({render,isSignedIn,loadUser,signIn,...rest}) =>{
    if(!isSignedIn){
        fetch('http://localhost:3001/home',{
            method:'get',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                //send the stored token to the server
            })
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
