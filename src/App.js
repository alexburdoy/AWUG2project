import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
var pagina = 1;
//aaaaaaaaaaaaaaaaaaaaa
function App() {
  /*const llista ={
    title: 'Hola',
    desc: 'gora greta'
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="cosPagina">
        <p>{llista.title}</p>
      </div>
    </div>
  );*/
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <Link to="/">
            <a class="navbar-brand navbar-fontstyle">
              <img src={logo} height="30" className="d-inline-block align-top" alt="" loading="lazy"></img>
          Trending Movies
        </a>
          </Link>
          <form className="form-inline">
            <input class="form-control mr-sm-2 navbar-form" type="search" placeholder="Search a movie" aria-label="Search"></input>
            <button class="btn btn-outline-info my-2 my-sm-0 navbar-form" type="submit">Search</button>
          </form>
        </nav>
        <div className="cosPagina">
          <Switch>
            <Route exact path="/">
              <MovieList></MovieList>
            </Route>
            <Route path="/detailMovie">
              <MovieDetail />
            </Route>
            <Route path="/movieSearch">
              <MovieDetail />
            </Route>
          </Switch>

        </div>
      </div>
    </Router>
  );
}

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      page: 1
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
    if(pageNumber<=1){
      pageNumber=1;
    }
    fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=f37c16e288bd47f8c2026f6fdc704e57&page=" + pageNumber)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          page: json.page
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
    return (
      <div>
        <div className="row row-cols-1 row-cols-md-3 p-3">{this.state.movies.map((film, idx) =>
          <Movie key={idx} movie={film}></Movie>
        )}
        </div>
        <ul class="pagination centerPagination">
          <li class="page-item">
            <a class="page-link" onClick={() => this.makeHttpRequestWithPage((this.state.page-1))} aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>

          {renderPageNumbers}

          <li class="page-item">
            <a class="page-link" aria-label="Next">
              <span onClick={() => this.makeHttpRequestWithPage((this.state.page+1))} aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
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
    console.log('https://image.tmdb.org/t/p/w500' + info.backdrop_path);
    return (
      <div className="col mb-4">
        <div className="card bgCard" id={info.id}>
          <img src={'https://image.tmdb.org/t/p/w500' + info.backdrop_path} className="card-img-top" alt={info.original_title}></img>
          <div className="card-body">
            <h5 className="card-title title">{info.original_title}</h5>
            <p className="card-text">{info.overview}</p>
            <p className="card-text"><small className="text-muted">{info.release_date}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

class MovieDetail extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <p>Hola</p>
      </div>
    );
  }
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
