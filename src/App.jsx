import SchedulePage from "./pages/SchedulePage";
import {ScheduleContextProvider} from "./context/ScheduleContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GroupsListPage from "./pages/GroupsListPage";
import HomePage from "./pages/HomePage";
import {PopupsContextProvider} from "./context/PopupsContext";
import {AuthContextProvider} from "./context/AuthContext";
import {Toaster} from "react-hot-toast";


function App() {
    return (
        <AuthContextProvider>
            <PopupsContextProvider>
                <ScheduleContextProvider>
                    <BrowserRouter>
                        <Toaster position="bottom-right" toastOptions={{
                            style: {
                                fontFamily: 'Raleway, sans-serif',
                                success: {
                                    duration: 3000,
                                    style: {
                                        padding: "0 10px 0 10px"
                                    },
                                },
                                error: {
                                    duration: 6000,
                                    style: {

                                    },
                                },
                            }
                            }}/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/group/:groupId" element={<SchedulePage/>}/>
                            <Route path="/groups" element={<GroupsListPage/>}/>
                        </Routes>
                    </BrowserRouter>
                </ScheduleContextProvider>
            </PopupsContextProvider>
        </AuthContextProvider>
    );
}

export default App;
