import React from 'react';
import './Logo.css'
import Tilt from "react-tilt/dist/tilt";
import brain from './brain.png'

const Logo = () => {
    return (
        <div className={'ma4 mt0'}>
            <Tilt className={'Tilt br2 shadow-2'}  options={{max: 55}}>
                <div className={'Tilt-inner'}>
                    <img alt={'logo'} src={brain} id={'brain'}/>
                </div>
            </Tilt>
        </div>
    )

}

export default Logo