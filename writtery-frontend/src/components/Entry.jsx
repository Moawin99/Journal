import React, {Component} from 'react';
import whiteLogo from '../pictures/WhiteWritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/entry.css';

const Entry = () => {
    return(
        <div id="App">
            <div className="home">
              <nav className="nav"> 
                    <Hamburger />
                    <img className="logo" src={whiteLogo} alt="Writtery-Logo"/>
                    <h2 className="welcome">Welcome User!</h2>
                </nav>
                <div className="entry-container">
                    <div className="entry">
                        <div className="title-mood-container">
                            <input className="Title" type="text"/>
                            <select name="moods" id="moods">
                                <option value="Happy">Happy</option>
                                <option value="Depressed">Depressed</option>
                                <option value="Confused">Confused</option>
                                <option value="Angry">Angry</option>
                                <option value="Relaxed">Relaxed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Entry;

