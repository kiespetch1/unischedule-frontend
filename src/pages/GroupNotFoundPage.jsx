import Header from "../сomponents/Header";
import Footer from "../сomponents/Footer";

const GroupNotFoundPage = () => {

    return (
        <>
            <Header/>
            <div className="not-found-page">
                <p className="not-found-header">Данная группа не найдена.</p>
                <p className="not-found-text">Проверьте, верно ли вы ввели адрес страницы.</p>
            </div>
            <Footer/>
        </>
    );
};

export default GroupNotFoundPage;