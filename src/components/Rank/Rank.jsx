import React from 'react';

const Rank =({entries,name})=>{
    return(

        <div>

            <div className='white f3' style={{marginTop:4}}>
                {`${name} , your current rank is...`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>


        </div>

    );
};

export default Rank;
