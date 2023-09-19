import React from 'react';
import './footer.scss';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-content">
            <div className="about footer-content">
              <h3 className="title">{t('common_about_uniqlo')}</h3>
              <span>{t('common_information')}</span>
              <span>{t('common_store_locator')}</span>
            </div>

            <div className="help footer-content">
              <h3 className="title">{t('common_help')}</h3>
              <span>{t('common_faq')}</span>
              <span>{t('common_return_policy')}</span>
              <span>{t('common_privacy_policy')}</span>
              <span>{t('common_accessibility')}</span>
            </div>

            <div className="account footer-content">
              <h3 className="title">{t('common_account')}</h3>
              <span>{t('common_membership')}</span>
              <span>{t('common_profile')}</span>
              <span>{t('common_coupon')}</span>
            </div>

            <div className="e-newsletter footer-content">
              <h3 className="title">{t('footer_e_newsletter')}</h3>
              <div className="text">{t('footer_e_newsletter_desc')}</div>
              <button className="subscribe">{t('footer_subscribe_now')}</button>
            </div>

            <div className="social footer-content">
              <h3 className="title">{t('common_uniqlo_social')}</h3>
              <ul className="social-list">
                <li>
                  <Facebook className="icon" />
                </li>
                <li>
                  <Instagram className="icon" />
                </li>
                <li>
                  <YouTube className="icon" />
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-top-language">
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
      <div className="footer-bottom">
        <div className="container">
          <div className="header">
            <div className="copyright">{t('footer_copyright')}</div>
            <div className="terms">
              <span>{t('common_terms_of_use')}</span>
              <span>{t('common_privacy_policy')}</span>
            </div>
          </div>
          <div className="text-desc">
            <p>
              {t('footer_company_name')}: {t('footer_company_name_content')}
            </p>
            <p>
              {t('footer_enterprise_code')}: {t('footer_enterprise_code_content')}
            </p>
            <p>
              {t('footer_headquarters_address')}: {t('footer_headquarters_address_content')}
            </p>
            <p>{t('footer_for_any_inquiry')}</p>
            <p>
              {t('footer_working_hours')}: {t('footer_working_hours_content')}
            </p>
            <img
              src="https://im.uniqlo.com/global-cms/spa/resfb28ee615b9469a533e195812bd0de44fr.png"
              alt=""
              className="check"
            ></img>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
