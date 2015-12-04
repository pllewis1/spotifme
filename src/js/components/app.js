import React, { PropTypes } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      searchResults: []
    };
    this.handleBandData = this.handleBandData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchData = this.handleSearchData.bind(this);
  }

  handleBandData(data) {
  this.setState({bands: data.results})
}
  handleSearchData(data) {
  this.setState({searchResults: data.results})
  }
  componentDidMount() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/bands',
             headers: {
               "X-Parse-Application-Id": "0ZyBFshykQS2P58OSxYZvrRqlbshmGbFLEDQ2sis",
               "X-Parse-REST-API-Key": "vIHq5cUki3BHyllTcWbRzD1A270cVNAgpcjevtJq"
             }
    ,  success: this.handleBandData
    });
  }

  handleSearch(e) {
    let search = this.refs.band.value;
    let artist;
    let image;
    if (e.keyCode === 13)
       {    console.log('jess')
           e.preventDefault();
           $.get( `https://api.spotify.com/v1/search?q=${search}&type=artist`, {
             headers: {
               "X-Parse-Application-Id": "0ZyBFshykQS2P58OSxYZvrRqlbshmGbFLEDQ2sis",
               "X-Parse-REST-API-Key": "vIHq5cUki3BHyllTcWbRzD1A270cVNAgpcjevtJq"
             }
           }).then(this.handleSearchData)
         }
  }

  render () {
    let childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {bands: this.state.bands})
    })
    let artist = this.state.searchResults.map(artist => {
      return (
        <div>
          <h3>artist.items.name</h3>
          <img src="artist.items.images[2]"/>
        </div>
      )
    })
    return (
      <div>
        <header>
          <h1>SpotiME: Your Favorite Bands. Guaranteed.</h1>
          <nav>
            <Link to="/">Your Band List</Link>
            <Link to="login">Login</Link>
            <Link to="signup">Register</Link>
          </nav>
          <input onKeyUp={this.handleSearch} ref="band" type="text" placeholder="Band Name"/>
          {artist}
          <p>Tell us what bands you want us to book at the SpotiME Concert Hall!</p>
        </header>
        {childrenWithProps}
      </div>
    )
  }
}

export default App;
