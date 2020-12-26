import React from 'react';
import {Link,Rout} from 'react-router-dom'

const Navigation =({isSignedIn,signOut})=>{

        const onSignOut = () =>{
            signOut('signout')
        } 
        if (isSignedIn){
            return(
            <nav style={{display:"flex" , justifyContent:"flex-end"}}>
            {/* here we create a annoymus arrow function to pass as the call back for onRouteChange('signin') */}
            <Link onClick={onSignOut} to="/" className='f3 link dim black underline pa3 pointer'>Sign Out</Link>
            </nav>
            )

        
        }
        else {
            return(
                
            <nav style={{display:"flex" , justifyContent:"flex-end"}}>
            <Link to="/"  className='f3 link dim black underline pa3 pointer'>Sign in</Link>
            <Link to="/register"  className='f3 link dim black underline pa3 pointer'>Register</Link>
            </nav>
            )
        }

};
export default Navigation;