import React from 'react';


const FaceRecognition = ({imageUrl,imageBoxes}) => {
    return (
        <div className={'center'}>
            <div alt={"pic"} className={'absolute mt2'}>
            <img id="inputImage" alt="pic" src={imageUrl} width={'500px'} height="auto"/>
            </div>
        </div>
    )

}

export default FaceRecognition