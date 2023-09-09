import React from 'react';
import './notice.scss';
import { useTranslation } from 'react-i18next';

const Notice = () => {
  const { t } = useTranslation();

  return (
    <div id="notice">
      <div className="container">
        <div className="notice-wrapper">
          <div className="title">
            <h3>{t('home_important_notice')}:</h3>
          </div>
          <div className="text">{t('home_important_notice_1')}</div>
          <div className="text">{t('home_important_notice_2')}</div>
          <div className="text">{t('home_important_notice_3')}</div>
          <div className="text">{t('home_important_notice_4')}</div>
        </div>

        <div className="information">
          <div className="info-title">
            <h2>{t('common_information')}</h2>
          </div>
          <div className="info-content">
            <div className="info-left">
              <ul>
                <li>
                  <span>{t('home_information_1')}</span>
                </li>
                <li>
                  <span>{t('home_information_2')}</span>
                </li>
                <li>
                  <span>{t('home_information_3')}</span>
                </li>
              </ul>
            </div>
            <div className="info-right">
              <ul>
                <li>
                  <span>{t('home_information_4')}</span>
                </li>
                <li>
                  <span>{t('home_information_5')}</span>
                </li>
                <li>
                  <span>{t('home_information_6')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
