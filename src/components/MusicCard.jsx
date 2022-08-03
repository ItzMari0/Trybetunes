import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      favoriteFunction,
      musicObj,
      checked,
    } = this.props;
    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id="favorite"
              checked={ checked }
              onChange={ (event) => favoriteFunction(event, musicObj) }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  favoriteFunction: PropTypes.func.isRequired,
  musicObj: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
};
