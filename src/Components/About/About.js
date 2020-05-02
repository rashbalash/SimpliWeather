import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Profile from './profile.jpg';
import { ReactComponent as AboutSVG } from '../Settings/settingIcons/about.svg';

import { ReactComponent as Gmail } from './SocialIcons/gmail.svg';
import { ReactComponent as Instagram } from './SocialIcons/instagram.svg';
import { ReactComponent as Linkedin } from './SocialIcons/linkedin.svg';
import { ReactComponent as Youtube } from './SocialIcons/youtube.svg';
import { ReactComponent as FA } from './SocialIcons/FALogo.svg';
import { ReactComponent as GitHub } from './SocialIcons/github.svg';

import './About.css';

function AboutModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"      
    >
      <div id={ props.modeid }>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalContainer">
        <h4>Rashad Balashov</h4>
        <img id="profileImage" src={Profile} alt="profile" />
        <p id="modalText">
          Hello! My name is Rashad Balashov, I am the creator and developer of SimpliWeather. 
          I designed and built this website from the ground up with ReactJS and OpenWeatherMap's API. 
          I have a deep interest in creating tools and products for people that can better help them 
          in their daily life.
          <br />
          Check out the rest of my projects, and follow me on social media!
          <br/>
          If you'd like to contribute to this project, checkout my GitHub as well.
        </p>
      </Modal.Body>
      <Modal.Footer>

        <div id="socialIconWrapper">
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="mailto:Rashad.Balashov@gmail.com"><Gmail /></a>
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/Rmab95/"><Youtube /></a>
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/rashadbalashov/"><Linkedin /></a>
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/rashad.balashov/"><Instagram /></a>
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="https://fracturedaperture.com/"><FA /></a>
          <a className={ props.socialmodeid } target="_blank" rel="noopener noreferrer" href="https://www.GitHub.com/rashbalash"><GitHub /></a>
        </div>

        {/* GitHub */}
        {/* FracturedAperture */}
        {/* Instagram, Twitter */}
      </Modal.Footer>
      </div>
    </Modal>
  );
}

function About(props) {
  const [modalShow, setModalShow] = React.useState(false);
  var modeid = props.mode === "light" ? "modalWrapper-light": "modalWrapper-dark";
  var socialmodeid = props.mode === "light" ? "socialIconA-light" : "socialIconA-dark";
  return (
    <>
      <AboutSVG id="svgIcon" onClick={() => setModalShow(true)} />
      
      <AboutModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modeid={modeid}
        socialmodeid={socialmodeid}
      />
    </>
  );
}
  

export default About;