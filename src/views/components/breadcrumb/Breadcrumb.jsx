import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  const { t } = useTranslation();

  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link to="/">{t('common_uniqlo')}</Link>
        </li>
        <li className="slash">/</li>
        <li>
          <Link to="/products">{t('product_all')}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
