import React, {Component} from 'react';
import TopLine from './common/topline';
import NavBar from './common/navbar';
import {Link, Redirect} from 'react-router-dom';

class Profile extends Component {
  state = {
    client: [],
    backLink: '',
    redirectback: false,
    doUnmount: false,
  };

  exitProfile = () => {
    localStorage.clear ();
    sessionStorage.clear ();
    sessionStorage.setItem ('link', '');
  };

  goBackCustom = () => {
    let link = sessionStorage.getItem ('link').split ('/').pop ();
    let session = sessionStorage.getItem ('link').split ('/');

    let newSession = [];

    session.map ((i, index) => {
      if (index !== session.length - 1) {
        newSession.push (i);
      }
    });

    this.setState ({
      backLink: `/` + link,
      redirectback: true,
      doUnmount: true,
    });

    sessionStorage.setItem ('link', newSession.join ('/'));
  };

  componentWillMount () {
    if (!sessionStorage.getItem ('link')) {
      sessionStorage.setItem ('link', '');
    }

    let formData = new FormData ();
    formData.append (
      'token',
      localStorage.getItem ('token').replace (/[^\w\s]/gi, '')
    );
    formData.append (
      'token_id',
      localStorage.getItem ('tokenID').replace (/[^\w\s]/gi, '')
    );

    fetch ('https://dev.crm.inta.group/app/userinfo', {
      method: 'POST',
      body: formData,
    })
      .then (response => {
        return response.json ();
      })
      .then (data => {
        if (JSON.stringify (data.error)) {
          console.log ('Error');
        } else {
          this.setState ({client: data});
        }
      })
      .catch (err => console.log (err));
  }

  componentWillUnmount () {
    let history = sessionStorage.getItem ('link');
    if (!this.state.doUnmount) {
      history += this.props.location.pathname;
    } else {
      history = sessionStorage.getItem ('link');
    }
    sessionStorage.setItem ('link', history);
  }

  render () {
    const t = this.props;
    if (this.state.redirectback) {
      return <Redirect to={this.state.backLink} />;
    }
    return (
      <div className="main-wrap page">
        <TopLine pageTitle="Профиль" handleBack={this.goBackCustom} />
        <div className="container profile-wrap">
          <div className="prof-info">
            <div className="prof-ava">
              <img
                src={
                  this.state.client.avatar !== ''
                    ? this.state.client.avatar
                    : require ('../img/user.svg')
                }
                alt=""
              />
            </div>
            <div className="prof-text">
              <div className="prof-text-name">
                {this.state.client.first_name} {this.state.client.last_name}
              </div>
              <div className="prof-text-undername">
                {this.state.client.code}
              </div>
            </div>
          </div>
          <div className="prof-list">
            <ul>
              <li>
                <Link to="/contact">Контактная информация</Link>
              </li>
              <li>
                <Link to="/" onClick={this.exitProfile}>
                  Выход
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
