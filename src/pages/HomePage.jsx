import Header from '../сomponents/Header'
import Footer from '../сomponents/Footer'
import GroupsComponent from '../сomponents/GroupsComponent'

const HomePage = () => {
    return (
        <div className="welcome-text-container">
            <Header />
            <div className="homepage-container">
                <div className="welcome-texts">
                    <p className="welcome-header">Привет! </p>
                    <p className="primary-text">
                        Это мой небольшой проект - здесь можно быстро найти
                        актуальное расписание занятий, и другую важную
                        информацию об учебе.
                    </p>
                    <p className="primary-text">
                        Если твоей группы в списках еще нет, напиши мне, и я
                        добавлю ее.
                    </p>
                    <GroupsComponent isMainScreen={true} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default HomePage
