
import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

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
    }
  }
  onInputChange=(event)=>{
    console.log(event.target.value);
  }

  onButtonSubmit =()=>{
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("@@sampleTrain");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
        console.log(console)
      }).catch (() => {
        console.log("error");
      })
      TODO://Bug on response
    console.log('click');
  }
  render(){
    return (
    <div className="App">

<Particles params={particlesOptions} className='particles'/>

      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      {/*  
      <FaceRecognition/>*/}

      
    </div>
  );
  }
  
}

export default App;
