import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: [],
    };
  }

  favoriteFunction = async (object) => {
    const { favorite } = this.state;
    this.setState({ loading: true }, async () => {
      await addSong(object);
      this.setState({
        favorite: [...favorite, object],
        loading: false,
      });
    });
  }

  render() {
    const { favorite, loading } = this.state;
    const { obj } = this.props;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {obj.map((music) => {
              const { trackName, trackId, previewUrl } = music;
              return (
                <li key={ trackId }>
                  <p>{trackName}</p>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <label
                    htmlFor="checkbox"
                  >
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      name="favorite"
                      id="favorite"
                      checked={ favorite
                        .some((song) => song.trackId === trackId) }
                      onChange={ () => this.favoriteFunction(music) }
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  obj: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
