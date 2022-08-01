import React, { Component } from 'react';
import Header from '../components/Header';

const ALBUMCHARACTERS = 2;

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isSearchButtonDisabled: true,
    };
  }

  onInputSearch = ({ target }) => {
    const { value } = target;
    if (value.length >= ALBUMCHARACTERS) {
      this.setState({ isSearchButtonDisabled: false });
    }
  };

  render() {
    const { isSearchButtonDisabled } = this.state;
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
