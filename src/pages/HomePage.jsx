import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";
import GroupsComponent from "../сomponents/GroupsComponent";

const HomePage = () => {

    return (
        <div className="fix-me-container">
            <Header/>
            <div className="fix-me">
                <p className="welcome-header">Привет! </p>
                <p className="welcome-text">Это мой небольшой проект - здесь можно быстро найти актуальное расписание
                    занятий, и другую важную информацию об учебе.</p>
                <p className="welcome-text">Если твоей группы в списках еще нет, напиши мне, и я добавлю ее.</p>
            </div>

            <div className="homepage-container">
                <GroupsComponent/>
            </div>
            <Footer/>
        </div>
    );
}
export default HomePage;