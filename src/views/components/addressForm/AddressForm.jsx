import React, { useEffect, useState } from 'react';
import './addressForm.scss';
import { useQuery } from 'react-query';
import regionApi from '../../../api/apiRegion';
import { Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import addressApi from '../../../api/apiAddress';
import { toast } from 'react-toastify';

const AddressForm = ({ address, handleAddAddress, handleUpdateAddress }) => {
  const { t } = useTranslation();
  const user = useSelector(userSelector);
  const [provinceId, setProvinceId] = useState('01');
  const [districtId, setDistrictId] = useState('001');
  const [wardId, setWardId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [note, setNote] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const { data: provincesList } = useQuery(['provinces'], () => regionApi.getProvinces());

  const { data: districtsList } = useQuery(['districts', provinceId], ({ queryKey }) =>
    regionApi.getDistricts(queryKey[1]),
  );

  const { data: wardsList } = useQuery(['wards', districtId], ({ queryKey }) =>
    regionApi.getWards(queryKey[1]),
  );

  const handleSaveAddress = async () => {
    const body = {
      id: address?.id,
      userId: user.id,
      title: '',
      fullName: fullName,
      phone: phone,
      provinceCode: provinceId,
      districtCode: districtId,
      wardCode: wardId,
      address: '',
      addressDetail: addressDetail,
      note: note,
      isDefault: isDefault,
    };
    if (address) {
      handleUpdateAddress(body);
    } else {
      handleAddAddress(body);
    }
  };

  useEffect(() => {
    if (address) {
      setFullName(address.fullName);
      setAddressDetail(address.addressDetail);
      setPhone(address.phone);
      setNote(address.note);
      setProvinceId(address.provinceCode);
      setDistrictId(address.districtCode);
      setWardId(address.wardCode);
      setIsDefault(address.isDefalt);
    }
  }, [address]);

  return (
    <div id="form-address">
      <div className="heading">
        <h3>{t('profile_enter_address')}</h3>
      </div>
      <div className="form">
        <div className="input-container">
          <label className="label">
            {t('profile_fullname')}
            <span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              placeholder={t('profile_fullname_placeholder')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="label">
            {t('profile_phone')}
            <span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              placeholder={t('profile_phone_placeholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p>{t('profile_phone_desc')}</p>
          </div>
        </div>
        {provincesList?.length > 0 && (
          <div className="input-container">
            <label className="label" htmlFor="province">
              {t('profile_address_province')}
              <span>*</span>
            </label>
            <div className="select-input">
              <select
                name="province"
                id="provice"
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
              >
                {provincesList.map((p) => (
                  <option value={p.code} key={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {districtsList?.length > 0 && (
          <div className="input-container">
            <label className="label" htmlFor="district">
              {t('profile_address_district')}
              <span>*</span>
            </label>
            <div className="select-input">
              <select
                name="district"
                id="district"
                value={districtId}
                onChange={(e) => {
                  setDistrictId(e.target.value);
                }}
              >
                {districtsList.map((d) => (
                  <option value={d.code} key={d.code}>
                    {d.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {wardsList?.length > 0 && (
          <div className="input-container">
            <label className="label" htmlFor="ward">
              {t('profile_address_ward')}
              <span>*</span>
            </label>
            <div className="select-input">
              <select
                name="ward"
                id="ward"
                value={wardId}
                onChange={(e) => {
                  setWardId(e.target.value);
                }}
              >
                {wardsList.map((w) => (
                  <option value={w.code} key={w.code}>
                    {w.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="input-container">
          <label className="label">
            {t('profile_address_detail')}
            <span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              name="address"
              placeholder="Apt, suite, unit, building, floor, etc"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
            <p>{t('profile_address_detail_desc')}</p>
          </div>
        </div>
        <div className="input-container">
          <label className="label">{t('common_note')}</label>
          <div className="form-input">
            <input type="text" placeholder="Address note" />
          </div>
        </div>
        {/* <div className="input-container">
          <label className="label">{t('profile_address_default')}</label>
          <div>
            <Switch
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div> */}

        <p className="via">{t('profilt_address_desc')}</p>

        <button className="btn-submit-address" onClick={handleSaveAddress}>
          {t('profile_save_address')}
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
