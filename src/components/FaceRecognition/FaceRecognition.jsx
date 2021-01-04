import React, { useContext } from 'react'
import { SignInContext } from '../../App';
import  './FaceRecognition.css'

const FaceRecognition =() =>{
    const {imageUrl,box,isFace}=useContext(SignInContext)

    return(
        <div className='ma center box'>

            <div mt2 style={{marginTop:'50px',width:'300px',height:'auto',overflow:'false',position: 'static'}}>
                {console.log("onFaceRecognition")}
                    <div className="image-parent center">
                        <img id='inputimage' src={imageUrl} alt=""/>
                        <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}>

                        </div>
                        {!isFace&&(imageUrl==='')?<h1>No Face Detected</h1>:null}
                    </div>
                   
            </div>
            
            

        </div>

    );

};
export default FaceRecognition;