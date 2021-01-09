import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a class="navbar-brand navbar-fontstyle" href="#">
          <img src={logo} height="30" className="d-inline-block align-top" alt="" loading="lazy"></img>
          Trending Movies
        </a>
        <form class="form-inline">
          <input class="form-control mr-sm-2 navbar-form" type="search" placeholder="Search a movie" aria-label="Search"></input>
          <button class="btn btn-outline-info my-2 my-sm-0 navbar-form" type="submit">Search</button>
        </form>
      </nav>
    </div>
  );
}

export default App;
