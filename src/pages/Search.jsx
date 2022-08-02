import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const SEARCHCHARACTERS = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isSearchButtonDisabled: true,
      loading: false,
      artist: '',
      albums: [],
    };
  }

  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ artist: value });
    if (value.length >= SEARCHCHARACTERS) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  onSearchButtonClick = () => {
    const { artist } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artist);
      this.setState({ albums, artist, loading: false });
    });
  }

  render() {
    const { isSearchButtonDisabled, loading, artist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            <form>
              <label htmlFor="search">
                {' '}
                Nome
                <input
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.onInputSearch }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isSearchButtonDisabled }
                onClick={ this.onSearchButtonClick }
              >
                Pesquisar
              </button>
            </form>
            <div>
              {!albums.length ? 'Nenhum álbum foi encontrado' : (
                <div>
                  <h1>{`Resultado de álbuns de: ${artist}`}</h1>
                  {albums.map(({
                    artistName,
                    collectionId,
                    collectionName,
                    artworkUrl100,
                    collectionPrice,
                    releaseDate,
                    trackCount,
                  }) => (
                    <div key={ collectionId }>
                      <img src={ artworkUrl100 } alt={ artistName } />
                      <h3>{artistName}</h3>
                      <p>{collectionPrice}</p>
                      <p>{releaseDate}</p>
                      <p>{trackCount}</p>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        {collectionName}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </>
        )}
      </div>
    );
  }
}

export default Search;
