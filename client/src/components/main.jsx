import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './main.css'; // Ensure your CSS file is imported

const FameEntry = ({ entry }) => (
  <div className="fame-entry">
    <img src={entry.image} alt={entry.name} />
    <div className="fame-entry-info">
      <h2>{entry.name}</h2>
      <p>{entry.description}</p>
    </div>
  </div>
);

const WallOfFame = ({ entries }) => (
  <div className="wall-of-fame">
    <div className="fame-entries">
      {entries.map((entry) => (
        <FameEntry key={entry._id} entry={entry} />
      ))}
    </div>
  </div>
);

const Card = ({ dataImage, header, content }) => {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    setDimensions({
      width: cardRef.current.offsetWidth,
      height: cardRef.current.offsetHeight,
    });
  }, []);

  const handleMouseMove = (e) => {
    const mouseX = e.pageX - cardRef.current.offsetLeft - dimensions.width / 2;
    const mouseY = e.pageY - cardRef.current.offsetTop - dimensions.height / 2;
    setMousePosition({ mouseX, mouseY });
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      setMousePosition({ mouseX: 0, mouseY: 0 });
    }, 1000);
  };

  let mouseLeaveDelay;

  const mousePX = mousePosition.mouseX / dimensions.width;
  const mousePY = mousePosition.mouseY / dimensions.height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`,
  };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
        <div className="card-info">
          <h1>{header}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/entries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <header>
        <nav className="main-nav">
          <div className="nav-container">
            <h1>Hall of Fame</h1>
          </div>
        </nav>
      </header>
      <WallOfFame entries={entries} />
      <div className="container">
        {entries.map((entry) => (
          <Card
            key={entry._id}
            dataImage={entry.image}
            header={entry.name}
            content={entry.description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
