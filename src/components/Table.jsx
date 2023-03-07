import useFetch from '../hooks/useFetch';

function Table() {
  const { loading, error, data } = useFetch('https://swapi.dev/api/planets');
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
          <input type="text" />
          <table>
            <thead>
              <tr>
                {tableHeads.map((th, index) => <th key={ index }>{th}</th>)}
              </tr>
            </thead>
            <tbody>
              {
                data.map((planet, index) => {
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
