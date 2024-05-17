import SchedulePage from "./Components/SchedulePage";
import {ContextProvider} from "./Context";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GroupsListPage from "./Components/GroupsListPage";


function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/groups" replace/>}/>
                    <Route path="/group/:groupId" element={<SchedulePage />}/>
                    <Route path="/groups" element={<GroupsListPage/>}/>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;
