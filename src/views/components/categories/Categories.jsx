import React, { useEffect, useState } from 'react';
import './categories.scss';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import genderTypeApi from '../../../api/apiGenderType';
import categoryApi from '../../../api/apiCategory';
import { Link } from 'react-router-dom';

const ParentCategory = ({ parent }) => {
  const { i18n } = useTranslation();
  const [listCategoriesOn, setListCategoriesOn] = useState(false);

  return (
    <div className="category-item" key={parent.id}>
      <div className="category-head" onClick={() => setListCategoriesOn(!listCategoriesOn)}>
        <span className={listCategoriesOn ? 'head-text bold' : 'head-text'}>
          {i18n.language === 'en'
            ? parent.nameEn
            : i18n.language === 'en'
            ? parent.nameVi
            : parent.name}
        </span>
        <span className={listCategoriesOn ? 'arrow-up arrow-down' : 'arrow-down'}>
          <KeyboardArrowDown className="arrow-down-icon" />
        </span>
      </div>
      <ul className={listCategoriesOn ? 'show-list-categories categories-list' : 'categories-list'}>
        {parent.children.map((child) => {
          return (
            <Link key={child.id} to={`/products?category=${child.id}`}>
              <li>
                {i18n.language === 'en'
                  ? child.nameEn
                  : i18n.language === 'en'
                  ? child.nameVi
                  : child.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

const Categories = ({ category }) => {
  const { i18n } = useTranslation();

  const [genderType, setGenderType] = useState();
  const [categories, setCategories] = useState([]);

  const getGenderType = async (id) => {
    const data = await genderTypeApi.getGenderTypeById(id);
    setGenderType(data);
  };

  const getCategories = async (id) => {
    const data = await categoryApi.getCategories(id);
    const groupCategories = data.reduce((group, category) => {
      const { column } = category;
      group[column] = group[column] ?? [];
      group[column].push(category);
      return group;
    }, []);
    setCategories(groupCategories.flat());
  };

  useEffect(() => {
    getGenderType(category.genderTypeId);
    getCategories(category.genderTypeId);
  }, [category]);

  return (
    <div id="categories">
      {genderType && (
        <h2 className="title">
          {i18n.language === 'en'
            ? genderType.nameEn
            : i18n.language === 'en'
            ? genderType.nameVi
            : genderType.name}
        </h2>
      )}
      {categories.map((parent) => {
        return <ParentCategory parent={parent} key={parent.id} />;
      })}
    </div>
  );
};

export default Categories;
