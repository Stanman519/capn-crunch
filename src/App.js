import React, { Fragment } from "react";
import "./index.css"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Home from "./components/Home.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImpendingFreeAgents from "./components/ImpendingFreeAgents";


export default function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Router >
      <div class="background">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} class="nav-button">
          Open Menu
        </Button>
        <Menu
        
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
          <MenuItem onClick={handleClose}><a href="https://www64.myfantasyleague.com/2020/home/13894">MFL League Site</a></MenuItem>
          <MenuItem onClick={handleClose}><a href="https://stanfan.herokuapp.com/">Free Agency Auction</a></MenuItem>
          <MenuItem onClick={handleClose}><a href="https://docs.google.com/document/d/1HwSDgwT0H-YcRJB2-SfSQ1MdvDogVJ691xxcmhmeWD0/edit">League Rules</a></MenuItem>
          <MenuItem onClick={handleClose}><Link to="/free-agents">Expiring Contracts</Link></MenuItem>
        </Menu>
      </div>
      <Route path="/" exact component={HomeView} />
      <Route path="/free-agents" component={FreeAgents}/>
    </Router>
  );
}
const HomeView = () => (
  <Fragment>
  <Home/>
  </Fragment>
)

const FreeAgents = () => (
  <Fragment>
    <h1>Impending Free Agents</h1>
    <ImpendingFreeAgents />
  </Fragment>
);