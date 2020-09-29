import React, {Component} from 'react';
import whiteLogo from '../pictures/WhiteWritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/entry.css';
import { useState } from 'react';

const Entry = () => {
    const [title, setTitle] = useState("");
    const [mood, setMood] = useState("");
    const [entry, setEntry] = useState("");
    return(
        <div id="App">
            <div className="home home2">
              <nav className="nav"> 
                    <Hamburger />
                    <img className="logo" src={whiteLogo} alt="Writtery-Logo"/>
                    <h2 className="welcome">Welcome User!</h2>
                </nav>
                  <div className="entry-container">
                        <div className="title-mood-container">
                            <input className="Title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                            <select className="mood" onChangeCapture={(e) => setMood(e.target.value)}>
                                <option value="Happy">Happy</option>
                                <option value="Depressed">Depressed</option>
                                <option value="Confused">Confused</option>
                                <option value="Angry">Angry</option>
                                <option value="Relaxed">Relaxed</option>
                            </select>
                        </div>
                        <textarea name="textarea" className="textarea" maxLength="20000" cols="60" rows="10" onChange={(e) => setEntry(e.target.value)} />
                        <div className="save">
                            <button>
                                Save
                            </button>
                        </div>
                    </div>      
            </div>
        </div>
    )
};

export default Entry;

