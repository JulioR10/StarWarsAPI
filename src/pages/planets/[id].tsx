type ServerSideProps = {
  params: {
    id: string;
  };
};

type Planet = {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: number;
  terrain: string;
  surface_water: number;
  population: number;
  residents: string[];
};

type Resident = {
  name: string;
};

export async function getServerSideProps(props: ServerSideProps) {
  const id = props.params.id;
  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const planet: Planet = await res.json();

  // Hacer solicitudes a cada enlace de residentes y almacenar los resultados
  const residentsData = await Promise.all(
    planet.residents.map(async (residentUrl) => {
      const residentRes = await fetch(residentUrl);
      const residentData: Resident = await residentRes.json();
      return residentData;
    })
  );

  return { props: { ...planet, residentsData } };
}

const Data = (props: Planet & { residentsData: Resident[] }) => {
  const { residentsData } = props;

  return (
    <>
      Nombre: {props.name}
      <br />
      Rotacion: {props.rotation_period}
      <br />
      Orbita: {props.orbital_period}
      <br />
      Diametro: {props.diameter}
      <br />
      Clima: {props.climate}
      <br />
      Gravedad: {props.gravity}
      <br />
      Terreno: {props.terrain}
      <br />
      Agua: {props.surface_water}
      <br />
      Poblacion: {props.population}
      <br />
      Residentes:
      <ul>
        {residentsData.map((resident) => (
          <li key={resident.name}>{resident.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Data;
