import React, {Component} from 'react';
import '../stylesheets/global.css';
import Hamburger from './Hamburger';
import '../stylesheets/mainpage.css';
import logo from '../pictures/WritteryLogo.png';
import whiteLogo from '../pictures/WhiteWritteryLogo.png';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
   
    render() { 
        return ( 
            <div className="App">
                <div className="home">
                    <nav className="nav">
                        <Hamburger />
                        <img className="logo" src={whiteLogo} alt="Writtery-Logo"/>
                        <h2 className="welcome">Welcome User!</h2>
                    </nav>
                    <div className="card-container">

                    </div>
                </div>
            </div>
         );
    }
}
 
export default MainPage;