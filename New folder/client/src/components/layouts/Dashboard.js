//Dashboard Page which contains side bar code
import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'//For the icons used in side menu 
import { faBars, faTimes, faQrcode,faRoad,faStream,faAddressCard,faQuestionCircle,faSlidersH,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Menu from './Menu'//To use top menu component
export default class Dashboard  extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    return (
    
    
      <body>
          <Menu />{/* top menu component */}
    <input type="checkbox" id="check" />{/* To open and close sidebar */}
    <label for="check">
    <i id="btn"><FontAwesomeIcon icon={faBars} /></i>{/*link to open sidebar */}
      <i id="cancel"><FontAwesomeIcon icon ={faTimes} ></FontAwesomeIcon></i>{/* link to close sidebar */}
    </label>
    <div className="sidebar">{/* sidebar contents */}
    <header className="gg">Menu</header>
  <ul>
    <li><a href="/"><i><FontAwesomeIcon icon={faQrcode} /></i>Dashboard</a></li>      {/* One of Different options available in side menu and icons used for them*/}
    <Link to="Search"  className="navbarItems">
            <li>
            <FontAwesomeIcon icon={faRoad} />
    &nbsp;&nbsp;Road Cutting
            </li>
           </Link>
    <li><a href="/"><i><FontAwesomeIcon icon={faStream} /></i>Overview</a></li>
    <li><a href="/"><i><FontAwesomeIcon icon={faAddressCard} /></i>Profile</a></li>
    <li><a href="/"><i><FontAwesomeIcon icon={faQuestionCircle} /></i>About</a></li>
    <li><a href="/"><i><FontAwesomeIcon icon={faSlidersH} /></i>Services</a></li>
    <li><a href="/"><i><FontAwesomeIcon icon={faEnvelope} /></i>Contact</a></li>
  </ul>
</div>
 <section></section>

  </body>
    );
  }
}