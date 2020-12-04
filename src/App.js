import React, {Component} from "react";
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/signIn/signIn'
import Register from './components/register/register'
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
            input: '',
            imageUrl: '',
            box: {},
            route: 'signIn',
            rank: null,
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data[0].region_info.bounding_box;
        console.log(clarifaiFace)
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

    displayFaceBox = (box) => {
        console.log(box)
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        console.log('click')
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => {
                let regions = response.outputs[0].data.regions
                this.setState({rank: '#' + regions.length})
                let box = this.calculateFaceLocation(regions)
                this.displayFaceBox(box)
            })
            .catch(err => console.log(err))
    }

    onRouteChange = (route) => {

        this.setState({route: route});
    }


    render() {
        return (
            <div className="App">
                <Particles
                    params={particlesOptions}
                    className={'particles'}
                />

                {
                    this.state.route === 'signIn' ?
                        <SignIn onRouteChange={this.onRouteChange}/> :

                            this.state.route === 'register' ?
                                <Register onRouteChange={this.onRouteChange}/> :
                                <div>
                                    <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>
                                    <Logo/>
                                    <Rank
                                        rank={this.state.rank}
                                    />
                                    <ImageLinkForm
                                        onInputChange={this.onInputChange}
                                        onButtonSubmit={this.onButtonSubmit}
                                    />
                                    <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>}
                                </div>


                }

            </div>
        )
            ;
    }
}

export default App;
