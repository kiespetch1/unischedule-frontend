import "./App.css";
import Header from "./Header";
import Monday from "./Monday";

function App() {
  return (
    <div className="App">
      <div className="">
        <Header />
        <strong className="currentWeekText">
          Сейчас четная неделя - С 19.02.2024 по 24.02.2024 - 3 неделя
          (верхняя/нечетная)
        </strong>
        <div className="nextWeekText">
          Следующая неделя нечетная - С 26.02.2024 по 02.03.2024 - 4 неделя
          (нижняя/четная)
        </div>
      </div>
      <Monday />
    </div>
  );
}

export default App;
