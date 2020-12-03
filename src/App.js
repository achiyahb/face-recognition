import React, {Component} from "react";
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import Particles from "react-particles-js";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '0c76e64d597c433892b650149b0e28a5'
});

const particlesOptions = {
    particles: {
     number: {
         value: 200
     },
        size: {
            "value": 3
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input:'',
            imageUrl:'',
            imageBoxes: []
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data[0].region_info.bounding_box;
        const image = document.querySelector('#inputImage')
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) =>{
        this.setState({box:box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () =>{
        this.setState({imageUrl:this.state.input})
        console.log('click')
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => {
               let regions = response.outputs[0].data.regions
                this.setState({imageBoxes:regions})
               let box = this.calculateFaceLocation(regions)
                this.displayFaceBox(box)
            })
            .catch(err=> console.log(err))
    }

    render() {
        return (
            <div className="App">
            <Particles
                params={particlesOptions}
                className={'particles'}
            />
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
            />
             <FaceRecognition imageUrl={this.state.imageUrl} imageBoxes={this.state.imageBoxes}/>
        </div>
    )
        ;
    }
}

export default App;
