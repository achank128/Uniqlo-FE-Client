import React, { useEffect, useState } from 'react';
import './filter.scss';
import { KeyboardArrowDown, CheckCircleOutline } from '@mui/icons-material';
import { useQuery } from 'react-query';
import colorApi from '../../../api/apiColor';
import sizeApi from '../../../api/apiSize';
import { priceFilters } from '../../../utils/const';
import { useTranslation } from 'react-i18next';

const Filter = ({ category, setFilter, filter }) => {
  const { t } = useTranslation();
  const [sizeFilterOn, setSizeFilterOn] = useState(false);
  const [colorFilterOn, setColorFilterOn] = useState(false);
  const [priceFilterOn, setPriceFilterOn] = useState(false);
  const [acFilterOn, setAcFilterOn] = useState(false);
  const [priceSelected, setPriceSelected] = useState();
  const [sizes, setSizes] = useState([]);
  const { data: colors } = useQuery('colors', () => colorApi.getColors());

  const handleAddColorFilter = (id) => {
    if (filter.colorIds.includes(id)) {
      const newColorIds = filter.colorIds.filter((colorId) => colorId !== id);
      setFilter({ ...filter, colorIds: newColorIds });
    } else {
      setFilter({ ...filter, colorIds: [...filter.colorIds, id] });
    }
  };

  const handleAddSizeFilter = (id) => {
    if (filter.sizeIds.includes(id)) {
      const newSizeIds = filter.sizeIds.filter((sizeId) => sizeId !== id);
      setFilter({ ...filter, sizeIds: newSizeIds });
    } else {
      setFilter({ ...filter, sizeIds: [...filter.sizeIds, id] });
    }
  };

  const handleSetPriceFilter = (price) => {
    if (priceSelected?.id === price.id) {
      setPriceSelected(null);
      setFilter({ ...filter, priceMin: null, priceMax: null });
    } else {
      setPriceSelected(price);
      setFilter({ ...filter, priceMin: price.priceMin, priceMax: price.priceMax });
    }
  };

  const getSizes = async (id) => {
    const data = await sizeApi.getSizeByGenderType(id);
    setSizes(data);
  };

  useEffect(() => {
    if (category) {
      getSizes(category.genderTypeId);
    } else {
      setSizes([]);
    }
  }, [category]);

  return (
    <div id="filter">
      {/* Size */}
      <div className="filter-item">
        <div className="filter-head" onClick={() => setSizeFilterOn(!sizeFilterOn)}>
          <span className={sizeFilterOn ? 'head-text bold' : 'head-text'}>Size</span>
          <span className={sizeFilterOn ? 'arrow-up arrow-down' : 'arrow-down'}>
            <KeyboardArrowDown className="arrow-down-icon" />
          </span>
        </div>
        <ul className={sizeFilterOn ? 'size-list filter-active' : 'size-list'}>
          {sizes.length > 0 &&
            sizes.map((size) => (
              <li
                key={size.id}
                className={filter.sizeIds.includes(size.id) ? 'active' : ''}
                onClick={() => handleAddSizeFilter(size.id)}
                style={{ background: size.code }}
              >
                {size.name}
              </li>
            ))}
        </ul>
      </div>

      {/* Color */}
      <div className="filter-item">
        <div className="filter-head" onClick={() => setColorFilterOn(!colorFilterOn)}>
          <span className={colorFilterOn ? 'head-text bold' : 'head-text'}>Color</span>
          <span className={colorFilterOn ? 'arrow-up arrow-down' : 'arrow-down'}>
            <KeyboardArrowDown className="arrow-down-icon" />
          </span>
        </div>
        <ul className={colorFilterOn ? 'color-list filter-active' : 'color-list'}>
          {colors &&
            colors.map((color) => (
              <li
                key={color.id}
                className={filter.colorIds.includes(color.id) ? 'active' : ''}
                onClick={() => handleAddColorFilter(color.id)}
                style={{ background: color.code }}
              ></li>
            ))}
        </ul>
      </div>

      {/* Price */}
      <div className="filter-item">
        <div className="filter-head" onClick={() => setPriceFilterOn(!priceFilterOn)}>
          <span className={priceFilterOn ? 'head-text bold' : 'head-text'}>
            {t('common_price')}
          </span>
          <span className={priceFilterOn ? 'arrow-up arrow-down' : 'arrow-down'}>
            <KeyboardArrowDown className="arrow-down-icon" />
          </span>
        </div>
        <ul className={priceFilterOn ? 'price-list filter-active' : 'price-list'}>
          {priceFilters.map((price) => (
            <li
              key={price.id}
              className={priceSelected?.id === price.id ? 'active' : ''}
              onClick={() => handleSetPriceFilter(price)}
            >
              <CheckCircleOutline className="icon-check" /> {price.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Criteria */}
      <div className="filter-item">
        <div className="filter-head" onClick={() => setAcFilterOn(!acFilterOn)}>
          <span className={acFilterOn ? 'head-text bold' : 'head-text'}>Additional Criteria</span>
          <span className={acFilterOn ? 'arrow-up arrow-down' : 'arrow-down'}>
            <KeyboardArrowDown className="arrow-down-icon" />
          </span>
        </div>
        <ul className={acFilterOn ? 'ac-list filter-active' : 'ac-list'}>
          <li cdata-test="filter-ac2">
            <CheckCircleOutline className="icon-check" /> Sale
          </li>
          <li data-test="filter-ac4">
            <CheckCircleOutline className="icon-check" /> New
          </li>
          <li data-test="filter-ac6">
            <CheckCircleOutline className="icon-check" /> Online Only
          </li>
          <li data-test="filter-ac6">
            <CheckCircleOutline className="icon-check" /> Limited Store
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
