import SchedulePage from "./pages/SchedulePage";
import {ScheduleContextProvider} from "./context/ScheduleContext";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GroupsListPage from "./pages/GroupsListPage";
import HomePage from "./pages/HomePage";
import {PopupsContextProvider} from "./context/PopupsContext";
import {AuthContextProvider} from "./context/AuthContext";
import {Toaster} from "react-hot-toast";
import LoginPage from "./pages/mobile/LoginPage.jsx";
import {useWindowWidth} from "./common.ts";
import NotificationsPage from "./pages/mobile/NotificationsPage.jsx";


function App() {
    const windowWidth = useWindowWidth()
    return (
        <AuthContextProvider>
            <PopupsContextProvider>
                <ScheduleContextProvider>
                    <BrowserRouter>
                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                style: {
                                    fontFamily: 'Raleway, sans-serif',},
                                success: {
                                    duration: 6000,
                                },
                                error: {
                                    duration: 10000,
                                },
                            }}
                        />
                        <Routes>
                            <Route path="/login" element={windowWidth <= 930 ? <LoginPage/> : <Navigate to="/"/>}/>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/group/:groupId" element={<SchedulePage/>}/>
                            <Route path="/groups" element={<GroupsListPage/>}/>
                            <Route path="/notifications/:groupId" element={<NotificationsPage/>}/>
                            <Route path="/notifications" element={<NotificationsPage/>}/>
                        </Routes>
                    </BrowserRouter>
                </ScheduleContextProvider>
            </PopupsContextProvider>
        </AuthContextProvider>
    );
}

export default App;
