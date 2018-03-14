import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Movie extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {movie} = this.props;
    if (!movie) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-md-4">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="thumbnail" alt=""/>
          {
            movie.homepage ? <p>
              <a href={movie.homepage} className="btn btn-info btn-block" target="_blank">Visit Movies Website</a>
            </p> : null
          }
          <div className="cold-md-8">
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
                movie.genre.map((item) => <Link to={`/genres/${item.id}/${item.name}`}>{item.name}</Link>)
              }
            </p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            
            {/*<Casts>*/}
            
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;