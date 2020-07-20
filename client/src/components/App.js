import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateRoom from '../routes/CreateRoom';
import Room from '../routes/Room';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
