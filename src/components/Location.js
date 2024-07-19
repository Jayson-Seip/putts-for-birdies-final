import React from 'react';
import './Location.css';
import { useTranslation } from 'react-i18next';

export const Location = () => {
    const { t } = useTranslation();
    return (
        <div className="container-fluid" id="location">
            <h1 className="text-center text-header"> {t('whereToFindUs')}</h1>
            <div className="row">
                <div className="col-md-8">
                    <iframe className="img-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.483870075305!2d-75.61055222444553!3d45.25822877107125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccde19df232ccd5%3A0xfa670e58d493f264!2s6357%20Emerald%20Links%20Dr%2C%20Greely%2C%20ON%20K4P%201M4!5e0!3m2!1sen!2sca!4v1720324698488!5m2!1sen!2sca" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                </div>

                <div className="col-md-4 border hours">
                    <div className="text-center">
                        <h1 > {t('contactUs')} </h1>
                    </div>
                    <div className=" center-text">


                        <h4 className="left-align mt-5">{t('address')}</h4>
                        <h4 className="left-align mt-5">{t('openingHours')}</h4>
                        <h5>{t('openingHoursText')}</h5>
                        <h4 className="left-align mt-5">{t('phoneNumber')}</h4>
                        <h4 className="left-align mt-5">{t('email')}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};


