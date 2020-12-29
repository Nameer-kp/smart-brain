import React from 'react';
import Logo from '../Logo/Logo';
import Rank from '../Rank/Rank'
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
export const Home = (props) => {
 
    return(
        <div> <Logo/> {/*Here passing render Props to Protectedroute check aunthenticate with isSignedIn */}
            <Rank />
            <ImageLinkForm /> 
            <FaceRecognition />
            <ScoreBoard /> 
        </div>
          )
}
