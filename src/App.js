import React, { Component } from 'react';
import Particles from 'react-particles-js';
import MouseParticles from 'react-mouse-particles'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const appURL = 'https://pacific-crag-61191.herokuapp.com';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    const { id, name, email, entries, joined } = data;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    let dataBoxes = [];
    for (var i = 0; i > data.outputs.length; i++) {
      const clarifaiFace = data.outputs[i].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      dataBoxes.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      })
    }
    return dataBoxes;
    
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
   this.setState({imageUrl: this.state.input});
    fetch(`${appURL}/imageAPI`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json()) 
      .then(response => {
        if (response) {
          fetch(`${appURL}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(err => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({isSignedin: true});
    } else if(route === 'signout') {
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedin, box, imageUrl, user } = this.state;
    return (
      <div className="App">
        <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
        <Particles 
          className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
        { this.state.route === 'home' ? 
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>
          : ( this.state.route !== 'register' ?
              <Signin appURL={appURL} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register appURL={appURL} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )        
        }
      </div>
    );
  }
}

export default App;
