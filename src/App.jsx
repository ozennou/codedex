import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import Header from './components/Header';
import { UserProvider} from './components/UserContext';


const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
];

const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  // Continue mapping all your possible options to a keyword
};

//https://collectionapi.metmuseum.org/public/collection/v1/objects/124
//data.primaryImageSmall

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)  
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState('')
  const [element, setElement] = useState('')
  const [artwork, setArtwork] = useState(null)

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchArtwork(element) {
    const images = {
      "fire": "717358",
      "water": "395106",
      "earth": "189698",
      "air": "203015",
    }
    try {
      const imageId = images[element];
      if (!imageId) {
        throw new Error("No matching artwork found for element: " + element);
      }
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imageId}`);
      if (!response.ok) {
        throw Error("Error: fetch fail: ");
      }
      const data = await response.json();
      setArtwork(data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );
  return (
    <>
    <Header />
    <UserProvider>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </UserProvider>
    </>
  )
}

export default App
