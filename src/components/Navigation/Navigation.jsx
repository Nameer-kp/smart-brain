import {React,useContext} from 'react';
import {Link,Rout} from 'react-router-dom'
import {SignInContext} from './../../App'

const Navigation =({signOut})=>{

    // for removing the jwt token from the browser
        const {isSignedIn} = useContext(SignInContext)
        const onSignOut =  async () =>{
           const result = await fetch("http://localhost:3001/logout",{
                method:'get',
                credentials:'include'
                
            })
            if(result)
            {signOut('signout')}
        } 
        if (isSignedIn){
            return(
            <nav style={{display:"flex" , justifyContent:"flex-end"}}>
            {/* here we create a annoymus arrow function to pass as the call back for onRouteChange('signin') */}
            <Link onClick={onSignOut} to="/" className='f3 link dim black underline pa3 pointer'>Sign Out</Link>
            </nav>
            )

        
        }
        else if(isSignedIn===null) {
            return <div></div>
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