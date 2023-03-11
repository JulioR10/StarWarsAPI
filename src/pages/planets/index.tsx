// HACE ESTO 2 VECES?

import Link from "next/link";

export async function getServerSideProps() {
  let arr = [];
  for (var i = 1; i < 7; i++) {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
    const data = await res.json();
    arr.push(data);
  }
  return {
    props: { param: arr },
  };
}

type planetType = {
  name: string;
};

const Index = ({ param }: { param: any[] }) => {
  // console.log("Aqui params");
  // console.log(param);

  const planetsNamesArr = param.map((item) => {
    return item.results.map((planet: planetType) => {
      return planet.name;
      // se podria hacer con un array/push/no se
    });
  });

  // console.log("Aqui planets");
  // console.log(planetsNamesArr);

  // .flat() el array de array se vuelve una array
  const planetsNames: string[] = planetsNamesArr.flat();

  // console.log(planetsNames);

  // cielo santo este error () {}
  return (
    <>
      <h1>Planets</h1>
      {planetsNames.map((item, index) => (
        <>
          <Link href={`/planets/${index + 1}`}>{item}</Link>
          <br />
        </>
      ))}
    </>
  );
};

export default Index;
