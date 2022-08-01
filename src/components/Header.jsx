import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    username: '',
    loading: true,
  }

  componentDidMount() {
    this.currentUser();
  }

  currentUser = () => {
    this.setState({ loading: true }, async () => {
      const username = await getUser();
      this.setState({ loading: false, username: username.name });
    });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <div>
        {loading ? (<Loading />
        ) : (
          <header data-testid="header-component">
            <h2 data-testid="header-user-name">{username}</h2>
            <nav>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </nav>
          </header>
        )}
      </div>

    );
  }
}

export default Header;
