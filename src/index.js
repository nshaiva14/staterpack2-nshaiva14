// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import './style.scss';


// import VideoList from './components/video_list';

// const App = () => {
//   return <div className="test">All the React are belong to us!</div>;
// };
// const App = () => {
//   return (
//     <div>
//       <SearchBar />
//     </div>
//   );
// };

class App extends Component {
  // here's what our constructor would look like
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.search('pixar');
    this.search = debounce(this.search, 300);

    youtubeSearch('pixar').then(videos => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  search(text) {
    youtubeSearch(text).then(videos => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar onSearchChange={text => this.search(text)} />
        <div id="video-section">
          <div className="flex-item"><VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} /></div>
          <div className="flex-item"><VideoDetail video={this.state.selectedVideo} /></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));


/* ORIGINAL CONSTRUCTOR
 constructor(props) {
  super(props);
  this.state = {};
  youtubeSearch('pixar').then((videos) => {
    console.log(videos);
  });
} */
