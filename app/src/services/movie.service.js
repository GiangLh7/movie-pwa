const axios = require('axios');

export default class MovieService {
  
  apiKey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  
  baseUri = 'https://api.themoviedb.org/3';
  
  constructor(setting) {
    if (setting && setting.apiKey ) {
      this.apiKey = setting.apiKey;
    }
    if (setting && setting.baseUri ) {
      this.baseUri = setting.baseUri;
    }
  }
  
  getPopular() {
    const searchOptions = {
      sort_by: 'popularity.desc',
      api_key: this.apiKey
    };
    return axios.get(`${this.baseUri}/discover/movie`, searchOptions);
  }
  
  getInTheaters() {
    // /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
      const searchOption = {
        params: {
          api_key: this.apiKey,
          'primary_release_date.gte': '',
          'primary_release_date.lt': '',
          sort_by: 'popularity.desc'
        }
      };
      return axios.get(`${this.baseUri}/discover/movie`, searchOption);
  }
  
  getTopRatedMovies() {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
    };
    return axios.get(`${this.baseUri}/movie/top_rated`, searchOption).then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status !== 200 || !response.data) {
          return reject();
        }
        resolve(response.data.results);
      })
    });
  }
  
  searchMovies(searchStr) {
    const searchOption = {
      params: {
        api_key: this.apiKey,
        sort_by: 'popularity.desc',
        query: searchStr
      }
    };
    return axios.get(`${this.baseUri}/search/movie`, searchOption);
  }
  
  getMovie(id) {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
    };
    return axios.get(`${this.baseUri}/movie/${id}`, searchOption).then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status !== 200 || !response.data) {
          return reject();
        }
        resolve(response.data);
      });
    });
  }
  
  getGenres() {
    const searchOption = {
      params: {
        api_key: this.apiKey,
        language: 'en-US'
      }
    };
    return axios.get(`${this.baseUri}/genre/movie/list`, searchOption).then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status !== 200 || !response.data) {
          return reject();
        }
        resolve(response.data.genres);
      });
    });
  }
  
  getMoviesByGenre(id) {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
    };
    return axios.get(`${this.baseUri}/genre/${id}/movies`, searchOption);
  }
  
  getMovieReviews(id) {
    const searchOption = {
      api_key: this.apiKey
    };
    return axios.get(`${this.baseUri}/movie/${id}/reviews`, searchOption);
  }
  
  getMovieVideos(id) {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
      
    };
    return axios.get(`${this.baseUri}/movie/${id}/videos`, searchOption);
  }
  
  getSimilarMovies(id) {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
    };
    return axios.get(`${this.baseUri}/movie/${id}/similar`, searchOption);
  }
  
  getMovieCredits(id) {
    const searchOption = {
      params: {
        api_key: this.apiKey
      }
    };
    return axios.get(`${this.baseUri}/movie/${id}/credits`, searchOption).then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status !== 200 && !response.data) {
          return reject();
        }
        resolve(response.data);
      })
    });
  }
}