
import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
  apiKey:'588fbe9a305a4bc1881b25df1f0052b2'
})


const particlesOptions = {
  particles: {
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
    }
  }
  onInputChange=(event)=>{
    
    this.setState({input:event.target.value});
    console.log(this.state.input);

  }

  onButtonSubmit =()=>{

    // for passing image url to to faceRecognition component
    
    this.setState({imageUrl:this.state.input},this.callToApi);
    console.log("1onButtonSubmit",this.state.imageUrl);



    
      
    console.log('click');
  }

  callToApi=()=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.imageUrl)
  .then(response => {
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    // There was a successful response
  })
  .catch(error => {
    console.log(error);
  })
  }

  render(){
    return (
    <div className="App">

<Particles params={particlesOptions} className='particles'/>

      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
      <FaceRecognition imageUrl={this.state.imageUrl}/>

      
    </div>
  );
  }
  
}

export default App;
