import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import GroupsComponent from "../GroupsComponent";


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
