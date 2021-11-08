import React from 'react';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Particles from "react-tsparticles";
import particlesConfig from '../config/particlesConfig';

export default function Home(props) {


  const  t = props.i18n.t;
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };
 
  const particlesLoaded = (container) => {
    console.log(container);

  };
  return (
    <div className={props.font ? 'aurabesh' : ''}>     
        <div className="App" style={{ position: 'absolute', overflow: 'none'}}>
          <Particles
            height="100vh" 
            width="100vw" 
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            params={particlesConfig} />
        </div>
        <header className="App-header">
          <FontAwesomeIcon icon={["fab", "rebel"]} size="6x" color="red"/>
          <p className={props.font ? 'aurabesh' : ''}>              
            {t('name')}
          </p>
          <h2 className={props.font ? 'aurabesh-condensed' : ''}>{t('Welcome')}</h2>
        </header>
    </div>
  );
}

