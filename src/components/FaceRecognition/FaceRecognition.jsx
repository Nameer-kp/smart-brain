import React from 'react'
import  './FaceRecognition.css'

const FaceRecognition =({imageUrl,box}) =>{

    return(
        <div className='center ma'>

            <div absolute mt2 style={{marginTop:'50px',width:'500px',height:'auto'}}>
                {console.log("onFaceRecognition")}

                   <img id='inputimage' src={imageUrl} alt=""/>
                    <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}>

                    </div>
            </div>
            
            

        </div>

    );

};
export default FaceRecognition;