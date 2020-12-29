import React, { useContext } from 'react';
import { SignInContext } from '../../App';
import './ImageLinkForm.css'

const ImageLinkForm = ()=>{
    const {onButtonSubmit,onInputChange}=useContext(SignInContext)
    return(
        <div>
            
            <p f3>
                {'This Magic Brain will detect Faces in Your Pictures'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
                    <button className='w-30 glow-on-hover f4 link ph3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
                </div>
                
            </div>

        </div>
    );
};
export default ImageLinkForm;