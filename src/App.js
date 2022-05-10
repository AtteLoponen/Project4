import React, { useState, useEffect } from 'react';
import './styles.css';


const App = () => {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault();
    findDriverById();
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    getDrivers();
  };



  const [results, setResults] = useState([])
  const getDrivers = () => {
    fetch("http://localhost:8080/api/drivers")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        const items = data;
        setResults(items)
      });
  };

  const deleteDriver = () => {
    fetch("http://localhost:8080/api/delete/" + query, { method: 'DELETE' })
      .then(() => this.setState({ status: 'Delete successful' }));


  };
  const findDriverById = () => {
    fetch("http://localhost:8080/api/" + query)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const items = data;
        setResults([items])
      });
  };

  // f1 drivers in a table
  const DriverTable = (props) => {
    const { data } = props;

    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr key={props.id}>
              <th scope="col">Name</th>
              <th scope="col">Date of birth</th>
              <th scope="col">Nationality</th>
              <th scope="col">Constructor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr>
                <td key={i}> {item.name}</td>
                <td> {item.birthyear} </td>
                <td> {item.country} </td>
                <td> {item.latestconstructor}</td>


              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  };
  return (
    <div>
      <h1>Find or delete drivers</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Search/delete by driver Id: </label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="form-control"
              placeholder="Set id: "
              name="query"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleClick}
            >
              Search all
            </button>
            <button
              type="button"
              className="btn"
              onClick={deleteDriver}
            >
              Delete driver
            </button>
          </div>
        </form>
      </div>
      <DriverTable data={results} />
    </div>
  );
  };



export default App;