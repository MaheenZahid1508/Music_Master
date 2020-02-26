import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import TrackSearch from './TrackSearch';
class Tracks extends Component {
    state = {
        playing: false,
        activePage: 1,
        itemsCountPerPage: 2,
        totalItemsCount: 0,
        audio: null,
        playingPreviewUrl: null,
        searchedTracks: [],
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.tracks !== prevProps.tracks) {
            this.setState({ searchedTracks: this.props.tracks});
        }
    }
    // updateTrackQuery = event => {
    //     this.setState({activePage: 1});
    //     this.state.TracksQeury = event.target.value;
    //     if (this.state.TracksQeury === "") {
    //         this.setState({searchedTracks: this.props.tracks});
    //     } else {
    //         this.searchTracks();
    //     }
    // };
    searchTracks = TracksQeury => {
        if (TracksQeury === "") {
            this.setState({searchedTracks: this.props.tracks});
        } else {       
            const searchedTracks = this.props.tracks.filter(
                track => track.name.toLowerCase().indexOf(TracksQeury.toLowerCase()) !== -1
            );
            this.setState({searchedTracks: searchedTracks});
        }
    };
    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({playing: true, audio, playingPreviewUrl: previewUrl});
        } else {
            this.state.audio.pause();
            if (this.state.playingPreviewUrl === previewUrl) {
                this.setState({playing: false});
            } else {
                audio.play();
                this.setState({audio, playingPreviewUrl: previewUrl});
            }
        }
    };
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    };
    trackIcon = track => {
        if (!track.preview_url) {
            return <span>N/A</span>;
        }
        if (this.state.playing && this.state.playingPreviewUrl === track.preview_url) {
            return <span> | | </span>;
        }
        return <span>&#9654;</span>;
    };
    render() {
        const endIndex = this.state.activePage * this.state.itemsCountPerPage;
        const startIndex = endIndex - this.state.itemsCountPerPage;
        const temptracks = this.state.searchedTracks.slice(startIndex, endIndex);
        return (
            <div>
                <div>
                    <hr/>
                    <TrackSearch searchTracks={this.searchTracks}/>
                    {this.state.searchedTracks.length ?
                        <div>
                            {
                                temptracks.map(track => {
                                    const {id, name, album, preview_url} = track;
                                    return (
                                        <div
                                            key={id}
                                            className='track'
                                            onClick={this.playAudio(preview_url)}
                                        >
                                            <img
                                                className='track-image'
                                                src={album.images[0].url}
                                                alt='track-image'
                                            />
                                            <p className='track-text'>{name}</p>
                                            <p className='track-icon'>{this.trackIcon(track)}</p>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                {/* from https://www.npmjs.com/package/react-js-pagination */}
                                <Pagination className='pagination'
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.searchedTracks.length}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            <h3>Error</h3>
                            <p>No Tracks Found </p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default Tracks;
