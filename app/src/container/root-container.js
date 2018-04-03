import React, {Component} from 'react';
import 'bootstrap';
import '../stylesheets/main.scss';
import Movie from '../components/movie';
import Movies from '../components/movies';
import PopularSeries from '../components/popular-series';
import Upcoming from '../components/upcoming';
import {Switch, Route, Link} from 'react-router-dom';
import MovieService from  '../services/movie.service';

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      topRateMovies: []
    };
    this.movieService = new MovieService();
  }
  
  componentDidMount() {
    var self = this;
    this.movieService.getGenres().then((genres) => {
      self.setState({genres: genres});
    });
    this.movieService.getTopRatedMovies().then((topRateMovies) => {
      self.setState({topRateMovies: topRateMovies});
    });
    
  }
  
  render() {
    var {genres, topRateMovies} = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>Movie Finder</Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-link"><Link to="/upcoming">Upcoming Movies</Link></li>
                <li className="nav-link"><Link to="/popular-series">Popular Series</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="container-fluid app-container">
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-2">
              <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="navbar-brand"></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#catNavbar" aria-controls="catNavbar" aria-expanded="false">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div id="catNavbar" className="collapse navbar-collapse ">
                  <ul className="navbar-nav flex-column">
                    {
                      genres.map((genre, index) => <li className="nav-item" key={index}><Link to={`/genres/${genre.id}/${genre.name}`} className="nav-link">{genre.name}</Link></li>)
                    }
                  </ul>
                </div>
              </nav>
            </div>
  
            <div className="col-sm-12 col-md-9 col-lg-10">
              <Switch>
                <Route exact path='/' render={(routeParams) => <Movies topRatedList={topRateMovies} popularList={[]} /> }/>
                <Route path='/upcoming' component={Upcoming} />
                <Route path='/popular-series' component={PopularSeries}/>
                <Route path='/genres/:id/:name' render={(routeParams) => <Movies topRatedList={[]} popularList={[]} /> } />
                <Route path='/movie/:id' component={Movie}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RootContainer;