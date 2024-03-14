import "./App.css";
import Header from "./Components/Header";
import Monday from "./Components/Monday";
import Footer from "./Components/Footer"
import GetCurrentWeekText from "./Components/CurrentWeekText";
import GetNextWeekText from "./Components/NextWeekText";
import {ContextProvider} from "./Context";

function App() {
    return (
        <ContextProvider>
            <div className="App">
                <header>
                    <Header/>
                </header>
                <div className="app-container">
                    <div className="week-container">
                        <strong className="current-week-text">
                            <GetCurrentWeekText date={new Date()}/>
                        </strong>
                        <div className="next-week-text">
                            <GetNextWeekText
                                date={new Date(new Date().setDate(new Date().getDate() + 7 - new Date().getDay()))}/>
                        </div>
                    </div>
                    <div className="days-container">
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
        </ContextProvider>
    );
}

export default App;
