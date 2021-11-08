import React, { Component } from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import ListItemText from '@mui/material/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import "leaflet/dist/leaflet.css";
import Map from "./map"
import { Button } from '@mui/material';

const drawerWidth = 260;
const items = [

  {id:'#index',icon: ['fab', 'galactic-senate'], text: 'General'},
  {id:'#services',icon: ['fas', 'satellite'], text: 'Servicios'},
  {id:'#examples',icon: ['fas', 'satellite-dish'], text: 'Ejemplo'},
  {id:'#refs',icon: ['fab', 'rebel'], text: 'Referencias'},
  {id:'#limits',icon: ['fas', 'vector-square'], text: 'Alcance'},
]
export default class Documentation extends Component {
  
  constructor(props){
    super(props)
    this.handlerSats = this.handlerSats.bind(this);
    this.handlerApi = this.handlerApi.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.state={
      message: "hola",
      response: {
        message: "",
        position: {x: 0, y:0}
      },
      error: "",
      satellites:[
        {
          name: "kenobi",
          position: {y: -200, x: -500},
          distance: 0,
          message: []
        },
        {
          name: "skywalker",
          position: {y: -100, x: 100},
          distance: 0,
          message: ["h"]
        },
        {
          name: "sato",
          position: {y: 100,  x: 500},
          distance: 0,
          message: []
        }
      ],
    }
  }
  
  handlerChange = () => (event) => {
    const messageArray = event.target.value.split(" ")
    this.setState({ 
      message: event.target.value,
      satellites: this.state.satellites.map(i=>{
        i.message = messageArray.map(m => {
          if(Math.random() > 0.6){
            return m
          }else{
            return ""
          }
        })
        return i
      })
    });
  };
  handlerApi(){
    const formData = {
      satellites: this.state.satellites
    }
    axios.post("https://meli-331518.rj.r.appspot.com/topsecret", formData).then((res) => {
      console.log(res)

      this.setState({
        response: res.data,
        error: res.status
      })
    }).catch(e => {
      this.setState({
        response: {
          message: "",
          position: {x: 0, y:0}
        },
        error: e.response.status
      })
    })
  }

  handlerSats(location){
    this.setState({
      satellites: this.state.satellites.map(i=>{
        i.distance =  Math.sqrt(Math.pow(i.position.y-location.lng, 2) + Math.pow(i.position.x-location.lat, 2))
        return i
      })
    })
   
  }
  render() {
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 0),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    }));
    const listSats = this.state.satellites.map(i =>{
      return(
        <li key={i.name}>{i.name}: 
          <ul>
            <li>Posicion: {i.position.x}, {i.position.y}</li>
            <li>Distancia: {i.distance}</li>
            <li>Mensaje: [{i.message.map(m =>  <code>{m}, </code>)}]</li>
          </ul>
        </li>
      )
    })
    return (
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          
        </AppBar>
        
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <DrawerHeader>
         
              <FontAwesomeIcon icon={["fab", "rebel"]} size="3x" color="red"/>

          </DrawerHeader>

          <Divider />
          <List>
            {items.map((item, index) => (
              <ListItem button component="a" key={item.id} href={item.id}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon}/>
                </ListItemIcon>
                <ListItemText>
                  <span className={this.props.font ? 'aurabesh-condensed_bi' : ''} >{item.text}</span>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Typography className={this.props.font ? 'aurabesh' : ''} variant="h2">Operación Fuego de Quasar</Typography>
          <h2 className={this.props.font ? 'aurabesh' : ''} id={"index"}>Introducción</h2>
          
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Typography variant="h5" color="gray" className={this.props.font ? 'aurabesh' : ''}>
            Bienvenido a la documentación de la operacion fuego de quasar. Esta pagina contiene una referencia a la API de consumo de los servicios de comunicación rebelde para la intercepcion de naves enemigas, usando sondas remotas de intercepción de mensajes
            </Typography>
            
            </Grid>
          </Grid>
          <h2 className={this.props.font ? 'aurabesh' : ''} id={"services"}>Servicios</h2>
          <Grid container spacing={2}>
            <Grid  item xs={8}>
              <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Actualmente los servicios de decodificado de mensajes y localización se encuentran integrados en la misma petición a apartir de un objeto <code>satellites</code> que contendra una matriz de 3 satelites con la informacion de la distancia y el mensaje a decodificar:
                </Typography>
                <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}>Decodificación simple</h3>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Para decodificar un mensaje debe pasar un arreglo de <code>satellite</code> que contenga la informacion de distancia y el mensaje a decodificar de los 3 satellites en funcionamiento, el cuerpo de la petición debe ser:
                <br/>
                
                </Typography>
            </Grid>
            <Grid item xs={8}>
              
              <pre className="language-json">
                <span className="token comment">//URI: "/topsecret"</span><br/>
                <span className="token comment">//BODY: POST JSON REQUEST</span><br/>
                <code className="language-json">
                  <span className="token keyword">{"{"}</span>
                  <br/>
                  <span className="token string">&ensp;&ensp;"satellites"</span><span className="token punctuation">:</span>
                  <span className="token keyword">{"["}</span>
                  <br/>
                  &ensp;&ensp;&ensp;&ensp;
                  <span className="token keyword">{"{"}</span><br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"name": "kenobi"</span>, <br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"message": ["este", "es", "", "mensaje"]</span>,<br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"distance":</span> <span className="token number">112.5</span>,<br/>
                  <span className="token keyword">&ensp;&ensp;&ensp;&ensp;{"}"}</span>,
                  <br/>
                  &ensp;&ensp;&ensp;&ensp;
                  <span className="token keyword">{"{"}</span><br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"name": "skywalker"</span>, <br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"message": ["este", "", "", "mensaje"]</span>,<br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"distance":</span> <span className="token number">100.5</span>,<br/>
                  <span className="token keyword">&ensp;&ensp;&ensp;&ensp;{"}"}</span>,
                  <br/>
                  &ensp;&ensp;&ensp;&ensp;
                  <span className="token keyword">{"{"}</span><br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"name": "sato"</span>, <br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"message": ["", "es", "un", ""]</span>,<br/>
                  <span className="token string">&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;"distance":</span> <span className="token number">132.5</span>,<br/>
                  <span className="token keyword">&ensp;&ensp;&ensp;&ensp;{"}"}</span>,
                  <br/>
                  <span className="token keyword">&ensp;&ensp;{"]"}</span>
                  <br/>
                  <span className="token keyword">{"}"}</span>
                </code>
              </pre>
            </Grid>
            <Grid item xs={4}>
              <pre className="language-json">
                  <span className="token comment">//RESPONSE:</span>
                  <br/>
                  <span className="token comment">RESPONSE CODE: 200</span>
                  <br/>
                  <code className="language-json">
                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"position"</span><span className="token punctuation">:</span>

                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"x"</span><span className="token punctuation">:</span>
                    <span className="token number"> 512.5</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"y"</span><span className="token punctuation">:</span>
                    <span className="token number"> 623.0</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;{"}"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"message"</span><span className="token punctuation">:</span>
                    <span className="token string">"Este es un mensaje"</span>
                    <br/>
                    <span className="token keyword">{"}"}</span>
                  </code>
              </pre>
            </Grid>
            <Grid  item xs={8}>
                <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}>Decodificación Fragmentada</h3>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                En algunas ocaciones no contamos con la información de los 3 satelites al mismo tiempo, para estos casos podemos configurar los satellites asincronicamente para posteriormente obtener la respuesta de la decodificación, para ello usaremos la api <code>topsecret_split</code> que nos permitira configurar nuestros satellites de forma infividual
                </Typography>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Para obtener la decodificacion primero debemos configurar cada uno de los satellites, donde <code>name</code> es el nombre del satellite:
                </Typography>
            </Grid>
            <Grid item xs={8}>
              
              <pre className="language-json">
                <span className="token comment">//URI: "/topsecret_split/{"{name}"}"</span><br/>
                <span className="token comment">//BODY: POST JSON REQUEST</span><br/>
                <code className="language-json">
                  <br/>

                  <span className="token keyword">{"{"}</span><br/>
                  <span className="token string">&ensp;&ensp;"distance":</span> <span className="token number">112.5</span>,<br/>
                  <span className="token string">&ensp;&ensp;"message": ["este", "es", "", "mensaje"]</span><br/>
                  <span className="token keyword">{"}"}</span>

                  <br/>
                 
                </code>
              </pre>
            </Grid>
            <Grid item xs={4}>
              <pre className="language-json">
                  <span className="token comment">//RESPONSE:</span>
                  <br/>
                  <span className="token comment">RESPONSE CODE: 200</span>
                  <br/>
                  <code className="language-json">
                    <span className="token keyword">{"Satellite configurado correctamente"}</span>
                  </code>
              </pre>
            </Grid>
            <Grid  item xs={8}>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Luego de configurar los 3 satellites podremos llamar <code>topsecret_split</code> que nos retornara el resultado de decodificación
                </Typography>
                <pre className="language-json">
                  <span className="token comment">//URI: /topsecret_split</span>
                  <br/>
                  <span className="token comment">//REQUEST GET</span>
                  <br/>
                  <span className="token comment">RESPONSE CODE: 200</span>
                  <br/>
                  <code className="language-json">
                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"position"</span><span className="token punctuation">:</span>

                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"x"</span><span className="token punctuation">:</span>
                    <span className="token number"> 512.5</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"y"</span><span className="token punctuation">:</span>
                    <span className="token number"> 623.0</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;{"}"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"message"</span><span className="token punctuation">:</span>
                    <span className="token string">"Este es un mensaje"</span>
                    <br/>
                    <span className="token keyword">{"}"}</span>
                  </code>
                </pre>
                En caso de que no tengamos la información completa de los satellites la petición retornara un codigo de error 404 indicando que el recurso no fue encontrado
            </Grid>
            <Grid  item xs={8}>
                <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}>Modos de decodificación</h3>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Actualmente el sistema cuenta con dos modos de decodificaciós dependiendo de las necesidades de la misión, el modo estricto retornara un error siempre que el mensaje contenga palabaras que no se pueden determinar y el modo flexible retornara siempre un mensaje aún cuando no se puedan determinar palabras por falta de información
                </Typography>
                <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Puede consultar el modo actual de funcionamiento con una petición GET a<code>/config-mode</code> o cambiarlo estableciendo el <code>mode</code> con una peticion POST a la misma ruta 
                </Typography>
                <pre className="language-json">
                <span className="token comment">//URI: "/config-mode"</span><br/>
                <span className="token comment">//BODY: POST JSON REQUEST</span><br/>
                <code className="language-json">
                  <br/>

                  <span className="token keyword">{"{"}</span><br/>
                  <span className="token string">&ensp;&ensp;"mode": "strict"</span><br/>
                  <span className="token keyword">{"}"}</span>

                  <br/>
                 
                </code>
              </pre>
            </Grid>
          </Grid>
          <h2 className={this.props.font ? 'aurabesh' : ''} id={"examples"}>Ejemplos</h2>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
                Esta es una simulación del proceso que realiza el sistema de interceptación rebelde para determinar la posición de una nave enemiga cuando esta emite un mensaje
              </Typography>
              <Map satellites={this.state.satellites} setDistance={this.handlerSats}/>
            </Grid>
            <Grid item xs={4}>
              <ul>
                {listSats}
              </ul>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Mensaje</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={this.state.message}
                  onChange={this.handlerChange()}
                />
              </FormControl>
              <Button onClick={this.handlerApi} fullWidth variant="outlined">Calcular Posición</Button>
              <pre className="language-json">
                <span className="token comment">//URI: "/topsecret"</span><br/>
                <span className="token comment">Response: {this.state.error}</span><br/>
                <code className="language-json">
                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"position"</span><span className="token punctuation">:</span>

                    <span className="token keyword">{"{"}</span>
                    <br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"x"</span><span className="token punctuation">:</span>
                    <span className="token number">{this.state.response.position.x}</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;&ensp;&ensp;"y"</span><span className="token punctuation">:</span>
                    <span className="token number">{this.state.response.position.y}</span>,<br/>
                    <span className="token keyword">&ensp;&ensp;{"}"}</span>
                    <br/>
                    <span className="token string">&ensp;&ensp;"message"</span><span className="token punctuation">:</span>
                    <span className="token string">"{this.state.response.message}"</span>
                    <br/>
                    <span className="token keyword">{"}"}</span>
                  </code>
              </pre>
            </Grid>
          </Grid>
          <h2 className={this.props.font ? 'aurabesh' : ''} id={"refs"}>Referencias</h2>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography paragraph className={this.props.font ? 'aurabesh' : ''}>
              </Typography>
              <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}><code>position</code> atributos:</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Tipo de dato</TableCell>
                      <TableCell align="right">Valor por defecto</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>x</code></TableCell>
                        <TableCell align="right"><code>float64</code></TableCell>
                        <TableCell align="right"><code>0</code></TableCell>
                        <TableCell align="right">Coordenada X </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>y</code></TableCell>
                        <TableCell align="right"><code>float64</code></TableCell>
                        <TableCell align="right"><code>0</code></TableCell>
                        <TableCell align="right">Coordenada Y </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}><code>satellite</code> atributos:</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Nombre</TableCell>
                      <TableCell align="right">Tipo de dato</TableCell>
                      <TableCell align="right">Valor por defecto</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>name</code></TableCell>
                        <TableCell align="right"><code>string</code></TableCell>
                        <TableCell align="right"><code>"kenobi", "skywalker", "sato"</code></TableCell>
                        <TableCell align="right">Nombre del satelite</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>distance</code></TableCell>
                        <TableCell align="right"><code>float64</code></TableCell>
                        <TableCell align="right"><code>0</code></TableCell>
                        <TableCell align="right">Distancia entre el receptor y el emisor</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>message</code></TableCell>
                        <TableCell align="right"><code>[]string</code></TableCell>
                        <TableCell align="right"><code>[]</code></TableCell>
                        <TableCell align="right">Mensaje a decodificar</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>position</code></TableCell>
                        <TableCell align="right"><code>position</code></TableCell>
                        <TableCell align="right"><code>[]</code></TableCell>
                        <TableCell align="right">Posicion del receptor</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <h3 className={this.props.font ? 'aurabesh' : ''} id={"services"}>Rutas</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>URI</TableCell>
                      <TableCell align="right">Method</TableCell>
                      <TableCell align="right">Params</TableCell>
                      <TableCell align="right">Returns</TableCell>
                      <TableCell align="right">Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret</code></TableCell>
                        <TableCell align="right">POST</TableCell>
                        <TableCell align="right"><code>satellites: []satellite</code></TableCell>
                        <TableCell align="right"><code>position</code>, <code>string</code> message</TableCell>
                        <TableCell align="right">Decodifica y retorna el mensaje y la ubicación de un transmisor a partir de 3 emisiores <code>satellite</code> con una distancia y un mensaje por decodificar</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret</code></TableCell>
                        <TableCell align="right">GET</TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right"><code>[]satellite</code></TableCell>
                        <TableCell align="right">Desctripción de la configuracion actual de los <code>satellites</code></TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret_split</code></TableCell>
                        <TableCell align="right">GET</TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right"><code>position</code>, <code>string</code> message</TableCell>
                        <TableCell align="right">Decodifica y retorna el mensaje y la ubicación de un transmisor a partir de 3 emisiores <code>satellites</code> con una distancia y un mensaje por decodificar previamente configurados</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret_split/:name</code></TableCell>
                        <TableCell align="right">POST</TableCell>
                        <TableCell align="right"><code>name</code>, <code>satellite</code></TableCell>
                        <TableCell align="right">none</TableCell>
                        <TableCell align="right">Configura la distancia y el mensaje de un <code>satellite</code></TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret_split/:name</code></TableCell>
                        <TableCell align="right">GET</TableCell>
                        <TableCell align="right"><code>name</code></TableCell>
                        <TableCell align="right"><code>satellite</code></TableCell>
                        <TableCell align="right">Describe la configuracion actual de un <code>satellite</code></TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/topsecret_split</code></TableCell>
                        <TableCell align="right">DELETE</TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right">Reinicia la configuración de los satellites a sus valores por defecto</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/config/:name</code></TableCell>
                        <TableCell align="right">POST</TableCell>
                        <TableCell align="right"><code>name</code></TableCell>
                        <TableCell align="right"><code>position</code></TableCell>
                        <TableCell align="right">Cambia la posición de un satellite</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/config-mode</code></TableCell>
                        <TableCell align="right">POST</TableCell>
                        <TableCell align="right"><code>string</code></TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right">Configura el modo de decodificacón: "strict" para retornar error siempre que haga falte una palabra por determinar, "flex" retornara siempre un mensaje aunque falten palabras por determinar</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><code>/config-mode</code></TableCell>
                        <TableCell align="right">GET</TableCell>
                        <TableCell align="right"><code>none</code></TableCell>
                        <TableCell align="right"><code>string</code></TableCell>
                        <TableCell align="right">Retorna la configuracion actual de los modos de decodificación</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4}>
             
            </Grid>
          </Grid>
          <h2 className={this.props.font ? 'aurabesh' : ''} id={"limits"}>Alcance</h2>
          
          <Grid container spacing={2}>
            <Grid item xs={8}>
            <Typography paragraph color="gray" className={this.props.font ? 'aurabesh' : ''}>
            Si bien el metodo de triletaración usado para calcular la posicion de una nave enemiga es efectivo, tiene limitaciones importantes que debe conocer, para comenzar ningun satelite debe estar alineado en ninguno de los dos ejes ya que al contar unicamente con 3 recursos la trilateracion de la posicion no contaria con la informacion necesaria para realizar el calculo.
            </Typography>
            <Typography paragraph color="gray" className={this.props.font ? 'aurabesh' : ''}>
            Otro punto importante a detallar es que si bien nuestros satellites cuentan con un rango de distancia casi ilimitado, si en la implementacion usted cuenta con satelites de menor potencia, en algunos casos sera imposible determinar la posición
            </Typography>
            </Grid>
          </Grid>
        </Box>
        
      </Box>
    )
  }
}