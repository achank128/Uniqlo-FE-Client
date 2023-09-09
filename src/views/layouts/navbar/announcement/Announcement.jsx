import React from 'react';
import './announcement.scss';
import { useTranslation } from 'react-i18next';

const Announcement = () => {
  const { t, i18n } = useTranslation();

  return (
    <div id="announcement">
      <div className="container">
        <div className="wrapper">
          <div className="an-left">{t('common_price_included_vat')}</div>
          <div className="an-right">
            <span>
              <a href="https://faq-vn.uniqlo.com/">{t('common_help')}</a>
            </span>
            <span>
              <a href="https://map.uniqlo.com/vn/en/">{t('common_store_locator')}</a>
            </span>
            <span
              className={i18n.language === 'en' ? 'language-active' : ''}
              onClick={() => i18n.changeLanguage('en')}
            >
              {t('common_english')}
            </span>
            |
            <span
              className={i18n.language === 'vi' ? 'language-active' : ''}
              onClick={() => i18n.changeLanguage('vi')}
            >
              {t('common_vietnamese')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
