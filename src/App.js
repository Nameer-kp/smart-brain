
import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
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
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage');
    const width = Number(image.width);
    const height =Number(image.height);
    console.log("height",height);

    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col*width),
      bottomRow: height-(clarifaiFace.bottom_row*height)


    }

  }

  displayFaceBox =(box)=>{
    console.log(box);
    this.setState({box:box});
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

  //this function is used for changing to home page

  onRouteChange =(route)=>{

    if(route==='home'){
      this.setState({isSignedIn:true})
    }else if (route==='signout'){
      this.setState({isSignedIn:false})
    }

    this.setState({route:route});


  }

  callToApi=()=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.imageUrl)
  .then(response => {
    //here the processed response is passed to displayFaceBox
    this.displayFaceBox(this.calculateFaceLocation(response));
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
      {/* we pass isSignIn to Navigation to show it accordingly */}
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      
      {this.state.route==='home'?
      <div>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
        <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      :(this.state.route==='signin'?
        <SignIn onRouteChange={this.onRouteChange}/>
        :<Register onRouteChange={this.onRouteChange}/>)
        
      }
      
    </div>
  );
  }
  
}

export default App;
