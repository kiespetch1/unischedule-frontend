import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";
import GroupsComponent from "../сomponents/GroupsComponent";
import {useEffect} from "react";


const GroupsListPage = () => {
    useEffect(() => {
        document.title = 'Список групп';
    }, []);

    return (
        <div>
            <Header/>
                <div className="groups-main-container">
                    <GroupsComponent isMainScreen={false}/>
                </div>
            <Footer/>
        </div>
    )
}

export default GroupsListPage;
