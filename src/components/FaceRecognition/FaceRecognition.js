import React from 'react';
import './faceRecognition.css'


const FaceRecognition = ({imageUrl,box}) => {
    return (
        <div className={'center'}>
            <div alt={"pic"} className={'absolute mt2'}>
            <img id="inputImage" alt="pic" src={imageUrl} width={'500px'} height="auto"/>
            <div className="bounding_box" style={{ top:box.topRow, right:box.rightCol, left:box.leftCol, bottom:box.bottomRow }}>
                <span>.</span>
            </div>
            </div>
        </div>
    )

}

export default FaceRecognition