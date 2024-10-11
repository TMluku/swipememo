import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import reactLogo from './assets/react.svg';
import shampoo from './img/シャンプー.png'

const SwipeCards = () => {
  const [people] = useState([
    { name: "シャンプー", url: shampoo },
  ]);

  const [lastDirection, setLastDirection] = useState();
  const [currentIndex, setCurrentIndex] = useState(people.length-1);
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useRef(people.map(() => React.createRef()));

  const updateCurrentIndex = (value)=>{
    setCurrentIndex(value);
    currentIndexRef.current=value;
  }  

  const swiped = (direction, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (index) => {
    if (index >= 0 && index < childRefs.current.length) {
      if (currentIndexRef.current >= index) {
        childRefs.current[index]?.current?.restoreCard();
      }
    }
  };


  const swipe = (dir) => {
    const cardsLeft = people.filter((person) => person.name !== lastDirection);
    if (cardsLeft.length) {
      const toBeSwiped = cardsLeft[cardsLeft.length - 1].name;
      const index = people.map((person) => person.name).indexOf(toBeSwiped);
      childRefs.current[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div style={styles.appContainer}>
      <h1>React Tinder Card</h1>
      <div className="cardContainer" style={styles.cardContainer}>
        {people.map((person, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(${person.url})`,
                ...styles.card,
              }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => swipe("left")}>Swipe left!</button>
        <button style={styles.button} onClick={() => swipe("right")}>Swipe right!</button>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #ff9a9e 0%, #fad0c4 100%)",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginBottom: "20px",
  },
  card: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "300px",
    height: "400px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    color: "#fff",
    textShadow: "0px 0px 10px rgba(0,0,0,0.5)",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    backgroundColor: "#6200ea",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
};

export default SwipeCards;
