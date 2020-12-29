import React,{useContext} from 'react';
import { SignInContext } from '../../App';

const Rank =()=>{
    const {entries,username}=useContext(SignInContext)
    return(

        <div>

            <div className='white f3' style={{marginTop:4}}>
                {`${username} , your current rank is...`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>


        </div>

    );
};

export default Rank;
