import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";
import GroupsComponent from "../сomponents/GroupsComponent";


const GroupsListPage = () => {

    return (
        <div>
            <Header/>
            <div className="group-list-container">
                <GroupsComponent/>
            </div>
            <Footer/>
        </div>
    )
}

export default GroupsListPage;
