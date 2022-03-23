
import { GetServerSideProps } from "next";
import { getDatabase } from "../src/database";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getDatabase();
  const games = await data
    .db("Database")
    .collection("games")
    .find()
    .toArray();

  const Games = JSON.parse(JSON.stringify(games));

  return {
    props: {
      games: Games,
    },
  };
};
type GamesType = {
  games: any,
};
const Games: React.FC<GamesType> = ({ games }) => {
  return (
    <div >

      <main >
        <h1 >Yoh game catalogue</h1>
        <div >
          {games.map((game: any, index: any) => {
            return (
              <Link href="/" key={index}>
                <a > {game.name} </a>
              </Link>
            );
          })}

        </div>
      </main>


    </div>
  );
};

export default Games;
