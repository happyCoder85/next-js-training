import { useState } from "react";
import "./styles.css";
import RebelLogo from "./star-wars-logo.png";
const content = [
  [ // Why Learn the Force?
    "Force be with you!",
    "Harness the Dark Side.",
    "Master Jedi ways.",
    "Conquer any challenge."
  ],
  [ // Core Jedi Skills
    "Force Push for production.",
    "Force Pull for opportunities.",
    "Mind Trick for breaks.",
    "Force Lightning for debugging."
  ],
  [ // Resources for Jedi Training
    "Official Jedi Order.",
    "Mandalorian series.",
    "Clone Wars series.",
    "Last Jedi."
  ],
  [ // Jedi vs Sith
    "Light vs Dark.",
    "Clean, efficient code.",
    "Beware of Dark Side.",
    "Choose your path."
  ]
];

export default function App() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  return (
    <div>
      <header>
        <img src={RebelLogo} alt="Star Wars Rebels logo" />
        <div>
          <h1>STAR WARS</h1>
          <p>May the Force be with your code!</p>
        </div>
      </header>

      <div id="tabs">
        <menu>
          <button
            className={activeContentIndex === 0 ? "active" : ""}
            onClick={() => setActiveContentIndex(0)}
          >
            Why Learn the Force?
          </button>
          <button
            className={activeContentIndex === 1 ? "active" : ""}
            onClick={() => setActiveContentIndex(1)}
          >
            Core Jedi Skills
          </button>
          <button
            className={activeContentIndex === 2 ? "active" : ""}
            onClick={() => setActiveContentIndex(2)}
          >
            Resources for Training
          </button>
          <button
            className={activeContentIndex === 3 ? "active" : ""}
            onClick={() => setActiveContentIndex(3)}
          >
            Jedi vs Sith
          </button>
        </menu>
        <div id="tab-content">
          <ul>
            {content[activeContentIndex].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}