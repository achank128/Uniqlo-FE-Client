import React, { useState } from 'react';
import { useQuery } from 'react-query';
import regionApi from '../../../api/apiRegion';
import './addressForm.scss';

const AddressForm = () => {
  const [provinceId, setProvinceId] = useState('01');
  const [districtId, setDistrictId] = useState('001');
  const [ward, setWard] = useState('');
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();
  const [addressDetail, setAddressDetail] = useState();
  const { data: provincesList } = useQuery(['provinces'], () => regionApi.getProvinces());

  const { data: districtsList } = useQuery(['districts', provinceId], ({ queryKey }) =>
    regionApi.getDistricts(queryKey[1]),
  );

  const { data: wardsList } = useQuery(['wards', districtId], ({ queryKey }) =>
    regionApi.getWards(queryKey[1]),
  );
  return (
    <div id="form-address">
      <div className="heading">
        <h3>ENTER YOUR ADDRESS</h3>
      </div>
      <div className="form">
        <div className="input-container">
          <label className="label">
            FULL NAME<span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              placeholder="Please enter your full name in alphabets"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="input-container">
          <label className="label">
            PHONE<span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              placeholder="Please enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <p>Please enter valid 10 digits phone number starting from 0</p>
          </div>
        </div>
        {provincesList?.length > 0 && (
          <div className="input-container">
            <label className="label" htmlFor="province">
              PROVINCE<span>*</span>
            </label>
            <div className="select-input">
              <select name="province" id="provice" onChange={(e) => setProvinceId(e.target.value)}>
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
              DISTRICT<span>*</span>
            </label>
            <div className="select-input">
              <select
                name="district"
                id="district"
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
              WARD<span>*</span>
            </label>
            <div className="select-input">
              <select
                name="ward"
                id="ward"
                onChange={(e) => {
                  setWard(e.target.value);
                }}
              >
                {wardsList.map((w) => (
                  <option value={w.name} key={w.code}>
                    {w.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="input-container">
          <label className="label">
            ADDRESS DETAILS<span>*</span>
          </label>
          <div className="form-input">
            <input
              type="text"
              placeholder="Apt, suite, unit, building, floor, etc"
              onChange={(e) => setAddressDetail(e.target.value)}
            />
            <p>For invoice purposes, please input only in Vietnamese.</p>
          </div>
        </div>
        <div className="input-container">
          <label className="label">NOTE</label>
          <div className="form-input">
            <input type="text" placeholder="Address note" />
          </div>
        </div>

        <p className="via">
          You may be contacted via phone or email if we have questions about your order and delivery
          option.
        </p>

        <button className="btn-submit">SAVE ADDRESS</button>
      </div>
    </div>
  );
};

export default AddressForm;
