import SchedulePage from "./Components/Pages/SchedulePage";
import {ContextProvider} from "./Context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GroupsListPage from "./Components/Pages/GroupsListPage";
import HomePage from "./Components/Pages/HomePage";


function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/group/:groupId" element={<SchedulePage />}/>
                    <Route path="/groups" element={<GroupsListPage/>}/>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;
