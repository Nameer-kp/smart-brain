
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
      isSignedIn:false,
      user:{
            id:'',
            name:'',
            email:'',
            entries:0,
            joined : ''
      }
    }
  }

  componentDidMount(){
      fetch('http://localhost:3001').then(response=>response.json()).then(console.log);
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
  //this calls when we register a new user
  loadUser=(user)=>{
    console.log("logUser Called",user);
    this.setState({user:{
      id:user.id,
      name:user["name"],
      email:user.email,
      entries:user.entries,
      joined : user.joined
      }})
      console.log(this.state);
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
    // updating entries via put on /image
    if(response){
        fetch('http://localhost:3001/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
            })
    }).then(response=>response.json()).then(user=>{
      
      this.setState({user:
        {
          id:user.id,
          name:user["name"],
          email:user.email,
          entries:user.entries,
          joined : user.joined
          }

      })
    })
  }

    //here the processed response is passed to displayFaceBox
    this.displayFaceBox(this.calculateFaceLocation(response));
    // There was a successful response
  })
  .catch(error => {
    console.log(error);
  })
  
  }

  render(){
    const { route,isSignedIn,imageUrl,box } = this.state;
    return(
    
    <div className="App">

      <Particles params={particlesOptions} className='particles'/>
      {/* we pass isSignIn to Navigation to show it accordingly */}
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      
      {route==='home'?
      <div>
        <Logo/>
        <Rank name ={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
        <FaceRecognition box ={box} imageUrl={imageUrl}/>
      </div>
      :(route==='signin'?
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
        
      }
      
    </div>
    )}
  
  
}

export default App;
