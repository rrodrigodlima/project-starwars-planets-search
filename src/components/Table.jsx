import { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { loading, error, data } = useFetch('https://swapi.dev/api/planets');
  const [searchValue, setSearchValue] = useState('');

  const filteredPlanets = data.filter((planet) => planet
    .name.toLowerCase().includes(searchValue.toLowerCase()));

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
