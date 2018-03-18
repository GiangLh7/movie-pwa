import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class MovieCard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { movie } = this.props;
    return (
      <div className="card h-100">
        <img className="card-img" src={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : 'assets/img/abstract-image.jpg'} />
        <div className="card-body">
          <h4 className="card-title text-ellipsis">
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h4>
          <p><strong>Release Date: </strong>{movie.release_date}</p>
          <p>
            <Link to={`/movie/${movie.id}`}>View details &raquo;</Link>
            {
              movie.vote_average?
                <small className="label label-success pull-right">
                  {movie.vote_average}
                  <i className="glyphicon glyphicon-star"></i>
                </small> : null
            }
          </p>
        </div>
      </div>
    );
  }
}
export default MovieCard;