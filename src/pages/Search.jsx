import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const SEARCHCHARACTERS = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isSearchButtonDisabled: true,
      search: '',
      loading: false,
      albums: [],
    };
  }

  onInputSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
    if (value.length >= SEARCHCHARACTERS) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  onSearchButtonClick = () => {
    const { search } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(search);
      this.setState({ albums, search: '', loading: false });
    });
  }

  render() {
    const { isSearchButtonDisabled, loading, search, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          <form id="search">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputSearch }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ this.onSearchButtonClick }
            >
              Pesquisar
            </button>
          </form>
        </label>
      </div>
    );
  }
}

export default Search;
