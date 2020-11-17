import React from 'react'

const FaceRecognition =({imageUrl}) =>{

    return(
        <div className='center ma'>

            <div absolute mt2>
                {console.log("onFaceRecognition")}

                   <img src={imageUrl} alt="" width='500px' height='auto' style={{marginTop:'50px'}}/>

            </div>
            

        </div>

    );

};
export default FaceRecognition;