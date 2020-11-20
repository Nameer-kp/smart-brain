import React from 'react';

const Navigation =({onRouteChange})=>{
    return(

        <nav style={{display:"flex" , justifyContent:"flex-end"}}>
            {/* here we create a annoymus arrow function to pass as the call back for onRouteChange('signin') */}
            <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>

        </nav>

    )
};
export default Navigation;