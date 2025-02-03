// const Home=()=>{
//     return(
//         <h1>Home is here</h1>
//     );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css'
import Navbar from './navbar'


interface GameCard {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string; // Link to the game or game page
  }
  
  // Sample data for the games (you can replace this with real data)
  const gamesData: GameCard[] = [
    {
      id: 1,
      title: 'Game 1',
      description: 'An exciting action game full of adventure.',
      imageUrl: 'https://gosharpener.com/content/uploads/photos/2024/06/sngine_d38fac84084ea933cb951b863185ccc3.png',
      link: '#game1',
    },
    {
      id: 2,
      title: 'Game 2',
      description: 'A puzzle game that challenges your mind.',
      imageUrl: 'https://gosharpener.com/content/uploads/photos/2024/06/sngine_d38fac84084ea933cb951b863185ccc3.png',
      link: '#game2',
    },
    {
      id: 3,
      title: 'Game 3',
      description: 'A multiplayer strategy game.',
      imageUrl: 'https://gosharpener.com/content/uploads/photos/2024/06/sngine_d38fac84084ea933cb951b863185ccc3.png',
      link: '#game3',
    },
    // Add more games as needed
  ];
  
  const HomePage: React.FC = () => {
    return (
      <>
        <Navbar brandName="GameHub" links={[]} />
        <div className="home-page">
          <h1 className="welcome-heading">Welcome to the Game Hub</h1>
          <div className="game-cards-container padded-container">
            {gamesData.map((game) => (
              <div key={game.id} className="game-card">
                <img src={game.imageUrl} alt={game.title} className="game-image" />
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <Link to={`/book/${game.id}`} className="play-button">
                  Play Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  export default HomePage;