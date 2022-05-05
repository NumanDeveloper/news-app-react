import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

class App extends Component {
  pages = 8;
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            // React router v6
            <Route exact path="/" element={<News key="general" pageSize={this.pages} country="us" category="general" />} />
            <Route exact path="/business" element={<News key="business" title="Business News" pageSize={this.pages} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" title="Entertaiment News" pageSize={this.pages} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" title="Health News" pageSize={this.pages} country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" title="Science News" pageSize={this.pages} country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" title="Sports News" pageSize={this.pages} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" title="Technology News" pageSize={this.pages} country="us" category="technology" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
