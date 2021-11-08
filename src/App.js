
import './App.css';
import * as React from 'react';


import {
  BrowserRouter as Router,
  Route,Switch, Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Home from './views/home';
import Documentation from './views/documentation';
import ShowCase from './views/showCase';
import Api from './views/api';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { useTranslation } from "react-i18next";
export default function App() {
  
  const { t, i18n } = useTranslation();
  const [ aur, setAur ] = React.useState(0)
  const [ lang, setLang ] = React.useState(0)

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = param => () => {

    setLang(param)
    if(param === 'en' || param === 'es'){
      setAur(false)
      setLang(param)
      i18n.changeLanguage(param);
    }else{
      setAur(!aur)
    }
    setAnchorEl(null);
  };
  return (
    <div style={{position: 'relative', overflow: "hidden"}} className={aur ? 'aurabesh' : ''}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative"  style={{zIndex: 10000, background: 'black'}}>
            <Toolbar>
              <Link to="/" >
                <Button>
                    <FontAwesomeIcon icon={["fab", "rebel"]} size="2x" color="white"/>
                </Button>
              </Link>
              <Box sx={{ flexGrow: 1 }} />
              <Button color="primary">
                <Link to="/documentation" className={aur ? 'link-white aurabesh-condensed' : 'link-white'}>
                  documentación
                </Link>
              </Button>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={["fas", "language"]} size="2x" color="white"/>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose("es")}>Español</MenuItem>
                <MenuItem onClick={handleClose("aur")}>Aurabesh</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
        <Switch >
          <Route path="/documentation">
              <Documentation  i18n={i18n} font={aur} />
          </Route>
          <Route path="/showCase">
              <ShowCase />
          </Route>
          <Route path="/api">
              <Api />
          </Route>
          <Route path="/" >
              <Home i18n={i18n} font={aur}/>
          </Route>
        </Switch>
      </Router>
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="relative"  style={{ zIndex: 10000,background: 'black'}}>
            <Toolbar>
              <Typography caption color="gray" className={aur ? 'aurabesh ' : ''}>
                Aplicacion desarrollada por Fernando Prieto para el proceso de selección de Mercado Libre
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    </div>
  );
}
