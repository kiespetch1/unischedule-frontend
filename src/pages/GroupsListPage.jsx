import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";
import GroupsComponent from "../сomponents/GroupsComponent";


const GroupsListPage = () => {

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
