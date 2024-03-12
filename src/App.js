import "./App.css";
import HeaderNew from "./Components/HeaderNew";
import Monday from "./Components/Monday";
import Footer from "./Components/Footer"
import GetCurrentWeekText from "./Components/CurrentWeekText";
import GetNextWeekText from "./Components/NextWeekText";

function App() {
    return (
        <div className="App">
            <header>
                <HeaderNew/>
            </header>
            <div className="appContainer">
                <div className="weekContainer">
                    <strong className="currentWeekText">
                        <GetCurrentWeekText date={new Date()}/>
                    </strong>
                    <div className="nextWeekText">
                        <GetNextWeekText
                            date={new Date(new Date().setDate(new Date().getDate() + 7 - new Date().getDay()))}/>
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
            <Footer/>
        </div>
    );
}

export default App;
