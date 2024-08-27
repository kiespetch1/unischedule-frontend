import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";
import GroupsComponent from "../сomponents/GroupsComponent";


const GroupsListPage = () => {

    return (
        <div>
            <Header/>
            <div className="group-list-container">
                <div className="groups-main-container">
                    <GroupsComponent/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default GroupsListPage;
