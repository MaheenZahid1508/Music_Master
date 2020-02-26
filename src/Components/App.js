import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';
import Search from './Search';
import {GoogleLogout} from 'react-google-login';
import { Redirect } from 'react-router-dom';
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
    state = { artist: null, tracks: [] };
    componentDidMount = () => {
            this.searchArtist('bruno');
    };
    searchArtist = artistQeury => {
        fetch(`${API_ADDRESS}/artist/${artistQeury}`)
            .then(response => response.json())
            .then(json => {
                if (json.artists.total > 0) {
                    const artist = json.artists.items[0];
                    this.setState({ artist });
                    fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                        .then(response => response.json())
                        .then(json => this.setState({ tracks: json.tracks }))
                        .catch(error => alert(error.message));
                }else{
                    alert("Artist not found");

                }
            })
            .catch(error => alert(error.message));
    };
    Logout=()=>{
        this.props.history.push('/');
    };
    render() {
        const API_KEY=`${process.env.REACT_GOOGLE_LOGIN_KEY}`;
        if(this.props.location.state == null){
            return <Redirect to={{
                pathname:'/',
                state:{notAuthenticated:true}
            }} />
        }
      let {profile} =this.props.location.state;
        return (
            <div>
                <div style={{marginBottom:10}}>
                    <nav className="navbar navbar-expand-sm bg-light nav-fill w-100" >
                        <div className="navbar-brand">
                            <h1>Music Master</h1>
                        </div>
                        {/* <div className="nav-item">
                            
                        </div> */}
                        {/*<div className="nav-item">*/}
                        {/*</div>*/}
                        <div className="nav-item justify-content-center">
                        <img src={profile.imageUrl} alt="Profile"  style={{
                                width:40,
                                height:40,
                                display:"inline-flex"
                            }}/>
                            <h3 style={{display:"inline-flex",marginLeft:5}}>{profile.name}</h3>
                            <p>{profile.email}</p>
                        </div>
                        <div className="navbar-brand" >
                            <GoogleLogout
                            clientId={API_KEY}
                                buttonText="Logout"
                                onLogoutSuccess={this.Logout}
                            />
                        </div>
                    </nav>
                </div>
                <Search searchArtist={this.searchArtist} />
                <Artist artist={this.state.artist} />
                <Tracks tracks={this.state.tracks} />
            </div>
        )
    }
}
export default App;
