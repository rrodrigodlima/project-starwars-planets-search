import { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { loading, error, data } = useFetch('https://swapi.dev/api/planets');
  const [searchValue, setSearchValue] = useState('');
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filter, setFilter] = useState(false);

  // const filteredPlanets = data.filter((planet) => planet
  //   .name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleFilter = () => {
    setFilter(true);
  };
  const filteredPlanets = data.filter((planet) => {
    if (!filter) {
      return true;
    }

    const planetValue = parseFloat(planet[numericFilter.column]);

    const filterValue = parseFloat(numericFilter.value);

    switch (numericFilter.comparison) {
    case 'maior que':
      return planetValue > filterValue;
    case 'menor que':
      return planetValue < filterValue;
    case 'igual a':
      return planetValue === filterValue;
    default:
      return true;
    }
  }).filter((planet) => planet.name.toLowerCase().includes(searchValue.toLowerCase()));

  const tableHeads = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'URL'];
  if (error) {
    return (
      <main>
        <h1>Um erro inesperado aconteceu</h1>
      </main>
    );
  }
  return (
    <main>
      { loading && <h1>Carregando...</h1> }
      { data.length > 0 && (
        <section>
          <input
            id="search"
            type="text"
            value={ searchValue }
            onChange={ (event) => setSearchValue(event.target.value) }
            data-testid="name-filter"
          />
          <label htmlFor="column-filter">Column:</label>
          <select
            id="column-filter"
            value={ numericFilter.column }
            onChange={ (event) => setNumericFilter({
              ...numericFilter,
              column: event.target.value,
            }) }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>

          <label htmlFor="comparison-filter">Comparison:</label>
          <select
            id="comparison-filter"
            value={ numericFilter.comparison }
            onChange={ (event) => setNumericFilter({
              ...numericFilter,
              comparison: event.target.value,
            }) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <label htmlFor="value-filter">Value:</label>
          <input
            id="value-filter"
            type="number"
            value={ numericFilter.value }
            onChange={ (event) => setNumericFilter({
              ...numericFilter,
              value: event.target.value,
            }) }
            data-testid="value-filter"
          />
          <button onClick={ handleFilter } data-testid="button-filter">
            Filter
          </button>
          <table>
            <thead>
              <tr>
                {tableHeads.map((th, index) => <th key={ index }>{th}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                filteredPlanets.map((planet, index) => {
                  const tables = [planet.name, planet.rotation_period,
                    planet.orbital_period, planet.diameter, planet.climate,
                    planet.gravity, planet.terrain, planet.surface_water,
                    planet.population, planet.films, planet.created,
                    planet.edited, planet.url];
                  return (
                    <tr key={ index }>
                      {tables.map((table) => (<td key={ table }>{table}</td>))}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>

        </section>
      ) }
    </main>
  );
}

export default Table;
