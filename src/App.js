
import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import SignInValidated from './components/SignIn/SignInValidated'
import Register from './components/Register/RegisterValidated'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ScoreBoard from './components/ScoreBoard/ScoreBoard'
import { Route, Switch } from 'react-router-dom';
import {ProtectedRoute} from './components/Routes/ProtectedRoute'
import {useLocation} from 'react-router-dom';




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

  componentDidMount(){
    window.onpopstate = (event)=>{
      this.setState(initialState)
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
    this.setState({...this.state,box:box});
  }

  onInputChange=(event)=>{
    
    this.setState({input:event.target.value});
    console.log(this.state.input);

  }

  onButtonSubmit =()=>{

    // for passing image url to to faceRecognition component
    if(this.state.input.length){
      this.setState({imageUrl:this.state.input},this.callToApi);
    console.log("1onButtonSubmit",this.state.imageUrl);
    }
    



    
      
    console.log('click');
  }

  //this function is used to flag signin

  isSignedIn =(route)=>{

    if(route==='home'){
      this.setState({isSignedIn:true})
    //   fetch('http://localhost:3001/token',{
    //             method: 'GET',
    //             credentials: 'include'
    //             }).then(data=>{
    //                 console.log("from signin cookie",data);
    //             });
    }
    else this.setState(initialState)

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
    const { isSignedIn,imageUrl,box } = this.state;

    return(
    
    <div className="App">
      
      <Particles params={particlesOptions} className='particles'/>
      {/* we pass isSignIn to Navigation to show it accordingly */}
      <Navigation isSignedIn={isSignedIn} signOut={this.isSignedIn}/>
       <Switch>
      <ProtectedRoute path ="/home" 
      render={()=> <div> <Logo/> {/*Here passing render Props to Protectedroute check aunthenticate with isSignedIn */}
        <Rank name ={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
        <FaceRecognition box ={box} imageUrl={imageUrl}/>
        <ScoreBoard name={this.state.user.name} /> 
          </div>
        } isSignedIn={this.state.isSignedIn}
        loadUser={this.loadUser}
         signIn={this.isSignedIn}/>


      { /* using react router */} 
        <Route path ="/register"
            render={(props)=><Register isSignedIn={this.isSignedIn} loadUser={this.loadUser} {...props}/>}
            />

         <Route path = "/" 
            render={(props)=>{
              
              return<SignInValidated isSignedIn={this.isSignedIn} loadUser={this.loadUser} {...props}/>}}
            />

      </Switch>
        
      
      
    </div>
    )
  }
  
  
}

export default App;
