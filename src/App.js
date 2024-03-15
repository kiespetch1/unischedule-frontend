import "./App.css";
import SchedulePage from "./Components/SchedulePage";
import {ContextProvider} from "./Context";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path = "" element={<SchedulePage/>} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;
