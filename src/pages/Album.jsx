import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicAlbum: [],
      musicInfo: {},
      loading: false,
      favoriteSong: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.musicFunction(id);
    this.getFromFavorite();
  }

  musicFunction = async (id) => {
    this.setState({ loading: true });
    const musicResult = await getMusics(id);
    const { musicAlbum } = this.state;
    musicResult.forEach((result, i) => ((i === 0)
      ? this.musicInformation(result)
      : musicAlbum.push(result)));
    this.setState({
      loading: false,
    });
  }

  favoriteFunction = async (event, obj) => {
    const { target } = event;
    const { favoriteSong } = this.state;
    this.setState({ loading: true }, async () => {
      if (target.checked) {
        await addSong(obj);
        this.setState({
          loading: false,
          favoriteSong: [...favoriteSong, obj.trackId],
        });
      } else {
        await removeSong(obj);
        this.setState({
          loading: false,
          favoriteSong: favoriteSong.filter((song) => song !== obj.trackId),
        });
      }
    });
  }

  getFromFavorite = async () => {
    const { favoriteSong } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSong: [...favoriteSong, ...result.map((song) => song.trackId)],
    });
  }

  musicInformation = (info) => {
    this.setState({
      musicInfo: info,
    }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { musicInfo, musicAlbum, loading, favoriteSong } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { loading ? <Loading />
            : (
              <>
                <h2 data-testid="artist-name">{musicInfo.artistName}</h2>
                <h4 data-testid="album-name">{musicInfo.collectionName}</h4>
                <div>
                  {musicAlbum.map((song) => (
                    <MusicCard
                      previewUrl={ song.previewUrl }
                      trackName={ song.trackName }
                      trackId={ song.trackId }
                      checked={ favoriteSong.some((favSong) => song.trackId === favSong) }
                      favoriteFunction={ this.favoriteFunction }
                      musicObj={ song }
                      key={ song.trackNumber }
                    />))}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
