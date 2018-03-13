import React, {Component} from 'react';

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
                {movie.}
              </small>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}