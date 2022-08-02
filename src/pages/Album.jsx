import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musicList: [],
    };
  }

  componentDidMount = () => {
    this.musicFunction();
  }

  musicFunction = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      musicList: music,
      loading: false,
    });
  }

  render() {
    const { musicList, loading } = this.state;
    const favoriteList = musicList.filter((_music, index) => index > 0);
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                src={ musicList[0].artworkUrl100 }
                alt={ musicList[0].collectionName }
              />
              <p data-testid="artist-name">{ musicList[0].artistName }</p>
              <p data-testid="album-name">{ musicList[0].collectionName }</p>
            </div>
            <div>
              <MusicCard
                obj={ favoriteList }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
