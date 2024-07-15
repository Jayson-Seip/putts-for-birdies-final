import './AboutUs.css'
import { useTranslation } from 'react-i18next';

function AboutUs() {
    const { t } = useTranslation();
    return (
        <div className="about-container">
            <div className="container abt-container mt-4">
                < h1 > {t('aboutUs')}</h1 >
                <p> {t('aboutUsText')}</p>
            </div >
        </div >

    );
}

export default AboutUs;