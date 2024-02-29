import "./App.css";
import Header from "./Components/Header";
import Monday from "./Components/Monday";

function App() {
    return (
        <div className="App">
            <div className="appContainer">
                <Header/>

                <div className="weekContainer">
                    <strong className="currentWeekText">
                        Сейчас четная неделя - С 19.02.2024 по 24.02.2024 - 3 неделя
                        (верхняя/нечетная)
                    </strong>
                    <div className="nextWeekText">
                        Следующая неделя нечетная - С 26.02.2024 по 02.03.2024 - 4 неделя
                        (нижняя/четная)
                    </div>
                </div>
                <div className="daysContainer">
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                    <Monday/>
                </div>
            </div>
        </div>
    );
}

export default App;
