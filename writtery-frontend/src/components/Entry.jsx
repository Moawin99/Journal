import React from 'react';
import whiteLogo from '../pictures/WhiteWritteryLogo.png';
import blackLogo from '../pictures/WritteryLogo.png';
import Hamburger from './Hamburger';
import '../stylesheets/entry.css';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {selectMood} from '../reducers/mood';
import Navbar from './navBar';
import { Link } from 'react-router-dom';

const Entry = () => {
    const [title, setTitle] = useState("");
    const [entry, setEntry] = useState("");
    const [isLoggedinSpotify, setLoggedinSpotify] = useState();
    const mood = useSelector((state) => state.mood.value);
    const dispatch = useDispatch();


         useEffect(() => {
            Axios.get(`/isLoggedSpotify`,)
            .then((response) => {
                if(response.status === 200){
                    setLoggedinSpotify(true);
                }
                else{
                    setLoggedinSpotify(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }, []);
    

    return(
        <div className={`App ${mood}`}>
            <div className="home home2">
                <Navbar />
                  <div className="entry-container">
                        <div className="title-mood-container">
                            <input className="Title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                            <select className="mood" value={mood} onChangeCapture={(e) => dispatch(selectMood(e.target.value))}>
                                <option value="Happy">Happy</option>
                                <option value="Sad">Sad</option>
                                <option value="Confused">Confused</option>
                                <option value="Angry">Angry</option>
                                <option value="Relaxed">Relaxed</option>
                            </select>
                        </div>
                        <textarea name="textarea" className="textarea" maxLength="20000" cols="60" rows="10" onChange={(e) => setEntry(e.target.value)} />
                        <div className="save">
                            <button onClick={ () => {
                                Axios
                                .put('/logout')
                                .then((response) => {
                                    console.log(response);
                                })
                                .catch((err) =>{
                                    console.log(err);
                                })
                            }
                            }>
                                Logout
                            </button>
                            <button onClick={() => {
                                Axios
                                .post('/entry', {
                                    title: title,
                                    mood: mood,
                                    entry: entry
                                })
                                .then((response) => {
                                    console.log(response);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                            }}>
                                Save
                            </button>
                            <Link to="/home"><button>HOME!</button></Link>
                        </div>
                    </div>   
                    {!isLoggedinSpotify ?
                     <button className="spotify-button" onClick={() => {
                        Axios
                        .get('/spotify')
                        .then((res) => {
                            window.location = res.data;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }}>Login With Spotify</button> 
                :
                null}
            </div>
        </div>
    )
};

export default Entry;

