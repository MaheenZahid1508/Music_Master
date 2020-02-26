import React, { Component } from 'react';
class TrackSearch extends Component{
    state={TracksQeury: ""}
    updateTrackQuery = event => {
        // this.setState({activePage: 1});
        this.state.TracksQeury = event.target.value;
        // if (this.state.TracksQeury === "") {
        //     this.setState({searchedTracks: this.props.tracks});
        // } else {
            this.searchTracks();
        // }
    };
searchTracks=()=>{
    this.props.searchTracks(this.state.TracksQeury);
}
    render(){
        return(
            <input
            placeholder="search for a Track"
            onChange={this.updateTrackQuery}
            value={this.state.TracksQeury}
            />
        );
    }
}
export default TrackSearch;