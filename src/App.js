import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [query, setQuery] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();

    //const query="hola";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f37c16e288bd47f8c2026f6fdc704e57&language=en-US&query=${query}`;
    //const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=1";
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (er) {
      console.log(er);
    }

  }

  return (

    <div className="App">
      <Router>
        <nav className="navbar navbar-dark bg-dark">

          <a class="navbar-brand navbar-fontstyle cursor" href="/">
            <img src={logo} height="30" className="d-inline-block align-top" alt="" loading="lazy" ></img>
          Trending Movies
        </a>

          <form className="form-inline" onSubmit={searchMovies}>

            <input class="form-control mr-sm-2 navbar-form" type="search" aria-label="Search" id="movieSearch" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type here bruh"></input>
            <Link to={'/movieSearch/' + query}>
              <button className="button" type="submit">Search</button>
            </Link>

          </form>

        </nav>

        <Route exact path="/" component={MovieList} />
        <Route exact path="/movieSearch/:query" component={MovieSearch} />
        <Route exact path="/movie/:movieID" component={MovieDetails} />
      </Router>
    </div>

  );
}



class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      page: 1,

    }

  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
    /*fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=${pageNumber}")
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page
        });
      }); */
  }

  makeHttpRequestWithPage = async pageNumber => {
    if (pageNumber <= 1) {
      pageNumber = 1;
    }
    fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=" + pageNumber)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page,

        });
      });
  }


  render() {
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.page === number ? 'activePage' : 'pages';

        return (
          <li class="page-item">
            <a className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>
              <span key={number}>{number}</span>
            </a>
          </li>
        );
      });
    }
    /*<div className="row row-cols-1 row-cols-md-3 p-3">{this.state.movies.map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>
          onClick={this.filterMovie}
          <div className="row row-cols-1 row-cols-md-3 p-3">{this.state.movies.filter(movie=>movie.original_title.includes(this.state.filter|| movie.title.includes(this.state.filter))).map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>*/
    return (
      <div>

        <div className="cosPagina">
          <div className="row row-cols-1 row-cols-md-5 p-3">{this.state.movies.map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>
          <ul class="pagination centerPagination">
            <li class="page-item">
              <a class="page-link pages" onClick={() => this.makeHttpRequestWithPage((this.state.page - 1))} aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>

            {renderPageNumbers}

            <li class="page-item">
              <a class="page-link pages" aria-label="Next" onClick={() => this.makeHttpRequestWithPage((this.state.page + 1))}>
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>

        </div>

        <footer className="footer mt-auto py-3 bg-dark">
          <div className="container">
            <span className="text-muted footerText">Àlex Burdoy, Josep Vílchez i Martí Peña</span>
          </div>
        </footer>
      </div>
    );
  }
}

class Movie extends React.Component {
  constructor(props) {
    super();
  }


  render() {
    let info = this.props.movie;
<<<<<<< HEAD
    //console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);
=======
    console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);
>>>>>>> ddc583fe723dd0526128dbfe0c5d35e689c7a848


    return (

      <div className="col mb-4">
        <Link to={'/movie/' + info.id}>
          <div className="card bgCard" id={info.id}>
            <img src={'https://image.tmdb.org/t/p/w500' + info.backdrop_path} className="card-img-top" alt={info.original_title}></img>
            <div className="card-body">
              <h5 className="card-title title">{info.original_title}</h5>
              <p className="card-text">{info.overview}</p>
              <p className="card-text"><small className="text-muted">{info.release_date}</small></p>
            </div>
          </div>
        </Link>



      </div>

    );
  }
}

class MovieDetails extends React.Component {
  //https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=f37c16e288bd47f8c2026f6fdc704e57
  constructor({ match, location }) {
    super();
    this.state = {
      img: [],
      idFilm: match.params.movieID,
      title: [],
      genres: [],
      overview: [],
      homepage: [],
      production_companies: [],
      production_countries: []
    }
    console.log(JSON.stringify(match));

  }
  /*constructor() {
    super();
    this.state = {
      img: [],
      title: ""

    }
    
  }*/

  componentDidMount() {
    let url = "https://api.themoviedb.org/3/movie/" + this.state.idFilm + "?api_key=f37c16e288bd47f8c2026f6fdc704e57";
    console.log(url);
    console.log(this.state.idFilm);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          img: json.backdrop_path,
          title: json.original_title,
          genres: json.genres,
          overview: json.overview,
          homepage: json.homepage,
          production_companies: json.production_companies,
          production_countries: json.production_countries
        });
      });

  }

  render() {
    return (
<<<<<<< HEAD
      <div>
=======
      <div className="cosPagina">
>>>>>>> ddc583fe723dd0526128dbfe0c5d35e689c7a848


        <div class="row featurette mt-5 px-3">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading textWhite title">{this.state.title}</h2>
            <p class="lead">{this.state.overview}</p>
            <br></br><br></br><br></br>
            <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
              <p>Genres: {this.state.genres.map((genre, idx) =>
                <Genre key={idx} genreName={genre}></Genre>
              )}
              </p>
              <a type="button" href={this.state.homepage} class="btn btn-outline-secondary">Movie Homepage</a>
            </div>
          </div>
          <div class="col-md-5 order-md-1">
            <img src={'https://image.tmdb.org/t/p/w500' + this.state.img} className="imgStyle"></img>
          </div>
        </div>
        <br></br>
        <hr class="featurette-divider hrStyle"></hr>
        <h4 class="ml-5 pl-5 featurette-heading textWhite title">Production Companies</h4>
        <div class="row m-2 justify-content-center">
          
          {this.state.production_companies.map((company, idx) => <ProductionCompanies key={idx} companyInfo={company}></ProductionCompanies>)}

        </div>
        <hr class="featurette-divider hrStyle"></hr>
        <h4 class="ml-5 pl-5 featurette-heading textWhite title">Production Coutries</h4>
        <div class="m-2">
          
          {this.state.production_countries.map((country, idx) => <ProductionCountries key={idx} countryName={country}></ProductionCountries>)}

        </div>
      </div>
    );
  }
}

class Genre extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.genreName;



    return (

      <em>|{info.name}| </em>

    );
  }

}

class ProductionCompanies extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.companyInfo;



    return (
      <div class="col-lg-3 bgProdCard m-1 p-3">
        <img class="bd-placeholder-img" src={'https://image.tmdb.org/t/p/w500' + info.logo_path} width="100"></img>
        <h5 class="pt-3">{info.name}</h5>
        <p><strong>Country: </strong>{info.origin_country}</p>
        
      </div>
    );
  }

}

class ProductionCountries extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    let info = this.props.countryName;



    return (
      <p class="center"><em>|{info.name}| </em></p>
    );
  }

}

class MovieSearch extends React.Component {
  //https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=f37c16e288bd47f8c2026f6fdc704e57
  constructor(props) {
    super();
    this.state = {
      movies: [],
      page: 1,

    }
    
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
    /*fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=${pageNumber}")
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page
        });
      }); */
  }

  makeHttpRequestWithPage = async pageNumber => {
    if (pageNumber <= 1) {
      pageNumber = 1;
    }
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=f37c16e288bd47f8c2026f6fdc704e57&language=en-US&query=${this.props.match.params.query}&page=` + pageNumber)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page,

        });
      });
      
  }
  render() {
    
    let renderPageNumbers;
    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.page === number ? 'activePage' : 'pages';

        return (
          <li class="page-item">
            <a className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>
              <span key={number}>{number}</span>
            </a>
          </li>
        );
      });
    }
    /*<div className="row row-cols-1 row-cols-md-3 p-3">{this.state.movies.map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>
          onClick={this.filterMovie}
          <div className="row row-cols-1 row-cols-md-3 p-3">{this.state.movies.filter(movie=>movie.original_title.includes(this.state.filter|| movie.title.includes(this.state.filter))).map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>*/
    return (
      <div>

        <div className="cosPagina">
          <div className="row row-cols-1 row-cols-md-5 p-3">{this.state.movies.map((film, idx) =>
            <Movie key={idx} movie={film}></Movie>
          )}
          </div>
          <ul class="pagination centerPagination">
            <li class="page-item">
              <a class="page-link pages" onClick={() => this.makeHttpRequestWithPage((this.state.page - 1))} aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>

            {renderPageNumbers}

            <li class="page-item">
              <a class="page-link pages" aria-label="Next" onClick={() => this.makeHttpRequestWithPage((this.state.page + 1))}>
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>

        </div>

        <footer className="footer mt-auto py-3 bg-dark">
          <div className="container">
            <span className="text-muted footerText">Àlex Burdoy, Josep Vílchez i Martí Peña</span>
          </div>
        </footer>
      </div>
    );
  }


  /*render() {
    console.log(this.props.match.params.query);
    return (

      <div className="col mb-4">



      </div>

    );
  }*/
}




export default App;

/*<div class="col mb-4">
<div class="card" id="movie' + element.id + '">
<img src="https://image.tmdb.org/t/p/w500' + element.backdrop_path + '" class="card-img-top" alt="' + element.original_title + '">
<div class="card-body"><h5 class="card-title">' + element.original_title + '
</h5><p class="card-text">' + element.overview + '</p>
<p class="card-text"><small class="text-muted">' + element.release_date + '</small>
</p><p class="card-text"><small class="text-muted">Click inside the card to get movie details</small>
</p></div></div></div>*/
