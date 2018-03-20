import React, {Component} from 'react';
import MovieCard from './movie-card';

class Movies extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {topRatedList, popularList} = this.props;
    return (
      <div>
        {/*Search area*/}
        <div className="jumbotron">
          <p>Search for a movie using the form below</p>
          <form>
            <div className="form-group">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for movies" />
                <span className="input-group-btn">
                  <button className="btn btn-primary">Go!</button>
                </span>
              </div>
            </div>
          </form>
        </div>
    
        {/*Top rated movies*/}
        <h3 className="orange-text">Top Rated Movies</h3>
        <div className="row is-flex">
          {
            topRatedList.map((item, index) => <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <MovieCard movie={item} />
            </div>)
          }
        </div>
  
        {/*Top popular movies*/}
        <h3 className="orange-text">Popular Movies</h3>
        <div className="row is-flex">
          {
            popularList.map((item, index) => <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <MovieCard movie={item} />
            </div>)
          }
        </div>
      </div>
    );
  }
}

export default Movies;