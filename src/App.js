import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
class App extends Component {
  state = {
    progress: 10,
  }
  pages = 8;
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            // React router v6
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pages} country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" title="Business News" pageSize={this.pages} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress = {this.setProgress}  key="entertainment" title="Entertaiment News" pageSize={this.pages} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" title="Health News" pageSize={this.pages} country="us" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" title="Science News" pageSize={this.pages} country="us" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" title="Sports News" pageSize={this.pages} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" title="Technology News" pageSize={this.pages} country="us" category="technology" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
