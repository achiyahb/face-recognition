import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange,route}) => {
    if (route==='home'){
        return (
            <nav className={'logOut'}>
                <p
                    className={'f3 link dim black underline pa3 pointer'}
                    onClick={() => onRouteChange('signIn')}
                > Sign Out </p>
            </nav>
        )
    } else {
        return (
            <nav className={'logOut'}>
                <p
                    className={'f3 link dim black underline pa3 pointer'}
                    onClick={() => onRouteChange('signIn')}
                > Sign In </p>
                <p
                    className={'f3 link dim black underline pa3 pointer'}
                    onClick={() => onRouteChange('register')}
                > Register </p>
            </nav>
        )
    }
}

export default Navigation