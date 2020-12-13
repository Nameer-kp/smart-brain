import React from 'react'
import  './FaceRecognition.css'

const FaceRecognition =({imageUrl,box}) =>{

    return(
        <div className='ma center box'>

            <div mt2 style={{marginTop:'50px',width:'300px',height:'auto',overflow:'false',position: 'static'}}>
                {console.log("onFaceRecognition")}
                    <div className="image-parent center">
                        <img id='inputimage' src={imageUrl} alt=""/>
                        <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}>

                        </div>
                    </div>
                   
            </div>
            
            

        </div>

    );

};
export default FaceRecognition;