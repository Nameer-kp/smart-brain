
import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'


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

const initialState={
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

class App extends Component {

  constructor(){
    super();
    this.state=initialState;
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
      this.setState(initialState)
    }

    this.setState({route:route});


  }

  callToApi=()=>{
    fetch('http://localhost:3001/apiCall',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            imageUrl:this.state.input
            })
          }).then(response=>response.json())
    .then(response => {
    // updating entries via put on /image
    if(response){
        fetch('http://localhost:3001/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
            })
    }).then(response=>response.json()).then(entries=>{
      
      this.setState(Object.assign(this.state.user,{entries:parseInt(entries)}))
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
        <ScoreBoard name={this.state.user.name}/>
      </div>
      :(route==='signin'?
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
        
      }
      
    </div>
    )}
  
  
}

export default App;
