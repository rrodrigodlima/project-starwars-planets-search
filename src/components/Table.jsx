import { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { loading, error, data } = useFetch('https://swapi.dev/api/planets');
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectOptions, setSelectOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const tableHeads = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'URL'];

  const handleClick = () => {
    setSelectedFilters([...selectedFilters, numericFilter]);
    setSelectOptions(selectOptions.filter((option) => option !== numericFilter.column));
  };

  const createFilters = () => {
    const singleFilter = data
      .filter((filtered) => filtered.name.toLowerCase()
        .includes(searchValue.toLowerCase()));

    const multipleFilters = singleFilter.filter((element) => {
      const filterPlanet = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          return Number(element[column]) > Number(value);
        case 'menor que':
          return Number(element[column]) < Number(value);
        case 'igual a':
          return Number(element[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterPlanet.every((result) => result);
    });
    return multipleFilters;
  };
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
            data-testid="column-filter"
            value={ numericFilter.column }
            onChange={ (event) => setNumericFilter({
              ...numericFilter,
              column: event.target.value,
            }) }
          >
            {selectOptions.map((column) => (
              <option
                key={ column }
                value={ column }
              >
                {column}
              </option>
            ))}
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
            name="number"
            value={ numericFilter.value }
            onChange={ (event) => setNumericFilter({
              ...numericFilter,
              value: event.target.value,
            }) }
            data-testid="value-filter"
          />
          <button
            data-testid="button-filter"
            onClick={ handleClick }
          >
            Filter
          </button>
          {selectedFilters.map((filter, index) => (
            <div key={ index }>
              {filter.column}
              {filter.condition}
              {filter.value}
            </div>
          ))}
          <table>
            <thead>
              <tr>
                {tableHeads.map((th, index) => <th key={ index }>{th}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                createFilters().map((planet, index) => {
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
