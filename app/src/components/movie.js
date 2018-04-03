import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MovieService from  '../services/movie.service';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      cast: [],
      crew: []
    };
    this.movieService = new MovieService();
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.movieService.getMovie(id).then((movie) => {
        this.setState({movie: movie});
      });
      this.movieService.getMovieCredits(id).then((result) => {
        this.setState({cast: result.cast, crew: result.crew});
      });
    }
  }
  
  render() {
    const {movie, cast} = this.state;
    if (!movie) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-md-4">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-thumbnail" alt=""/>
          {
            movie.homepage ? <p>
              <a href={movie.homepage} className="btn btn-info btn-block" target="_blank">Visit Movies Website</a>
            </p> : null
          }
        </div>
        <div className="col-md-8">
          <h2>
            {movie.title}
            <small className="label label-warning">
              {movie.vote_average}
              <i className="glyphicon glyphicon-star"></i>
            </small>
          </h2>
          <p>{movie.tagline}</p>
          <p>
            {
              movie.genres.map((item, index) => <Link to={`/genres/${item.id}/${item.name}`} key={index}>{item.name}</Link>)
            }
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
    
          {/*<Casts>*/}
          
  
        </div>
      </div>
    );
  }
}

export default Movie;