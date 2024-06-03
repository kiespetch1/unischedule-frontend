import React from 'react';
import Header from "../Header";
import Footer from "../Footer";
import GroupsComponent from "../GroupsComponent";

const HomePage = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <p className="welcome-header">Привет! </p>
            <p className="welcome-text" style={{marginBottom: '0'}}>Это мой небольшой проект - здесь можно быстро найти актуальное расписание
                занятий, и другую важную информацию об учебе.</p>
            <p className="welcome-text" style={{marginTop: '0'}}> Если твоей группы в списках еще нет, напиши мне, и я добавлю ее.</p>
            <div className="homepage-container">
                <GroupsComponent/>
            </div>
            <Footer/>
        </div>
    );
}
export default HomePage;