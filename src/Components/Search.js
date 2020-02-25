import React, { Component } from 'react';

class Search extends Component {
    state = { artistQuery: '' };
    updateArtistQuery = event => {
        this.setState({ artistQuery: event.target.value });
    };
    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchArtist();
        }
    };
    searchArtist = () => {
        this.props.searchArtist(this.state.artistQuery);
        this.setState({artistQuery:''});
    };
    render() {
        return (
            <div>
                <input
                    placeholder="search for an artist"
                    value={this.state.artistQuery}
                    onChange={this.updateArtistQuery}
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.searchArtist}>search</button>
            </div>
        )
    }
}
export default Search;
