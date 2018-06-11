import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'

// movie api
// https://yts.am/api#list_movies
// https://yts.am/api/v2/list_movies.json?sort_by=rating

class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {};

/* response
body:ReadableStream
bodyUsed:false
headers:Headers {}
ok:true
redirected:false
status:200
statusText:""
type:"cors"
url:"https://yts.am/api/v2/list_movies.json?sort_by=rating"
----------------------------------------------------
json
@meta:{api_version:2
    execution_time:"0.02 ms"
    server_time:1528699735
    server_timezone:"CET"
data:{limit:20
    movie_count:7639
    movies:(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    page_number:1
status:"ok"
status_message:"Query was successful"
*/
  componentDidMount() {
    this._getMovies();
  }

  // 미리 정의된 함수가 많아서 사용자 정의 함수는 맨앞에 underscore(_)를 붙임
  // movies = [<Movie props/>, <Movie props/>]
  _renderMovies = () => {
    const movies = this.state.movies.map((movie, index) => {
      console.log(movie);
      return (
        <Movie 
          title={movie.title_english} 
          poster={movie.medium_cover_image} 
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies      // movies: movies
    });
  };

  _callApi = () => {
    return fetch(
      'https://yts.am/api/v2/list_movies.json?sort_by=rating'
    )
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err));
  };


  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    )
  }
}

export default App;
