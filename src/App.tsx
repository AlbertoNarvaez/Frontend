import Lessonalyzer from "./components/Lessonalyzer";
import Compliance from "./components/Compliance";
import "./App.css";

export default function App() {
  return (
    <div id="app">
      <div id="main">
        <Lessonalyzer />
        <Compliance />
        <div id="fire-container" aria-hidden="true">
          &nbsp;
        </div>
      </div>
    </div>
  );
}
