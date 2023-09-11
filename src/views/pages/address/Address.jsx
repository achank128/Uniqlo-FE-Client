import React, { useState } from 'react';
import './address.scss';
import addressApi from '../../../api/apiAddress';
import { useQuery } from 'react-query';
import Loading from '../../components/loading/Loading';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import AddressForm from '../../components/addressForm/AddressForm';
const Address = () => {
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const { isLoading, data: addresses } = useQuery(['addresses'], () => addressApi.getMyAddress());

  return (
    <div id="address">
      <div className="heading">
        <h3>ADDRESSES</h3>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div className="item" key={address.id}>
                <IconButton
                  aria-label="edit"
                  className="btn-edit"
                  onClick={() => setOpenAddressForm(true)}
                >
                  <Edit />
                </IconButton>
                <div className="item-content">
                  <div className="info">
                    <div className="name">
                      {address.fullName}
                      {address.isDefault && <span>Default</span>}
                    </div>
                    <p>
                      {address.addressDetail}, {address.ward?.fullName},{' '}
                      {address.district?.fullName}, {address.province?.fullName}
                    </p>
                    <p>{address.phone}</p>
                    {address.note && <p>Note: {address.note}</p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <AddressForm />
          )}
        </div>
      )}
      <Dialog
        open={openAddressForm}
        fullWidth={true}
        maxWidth="md"
        onClose={() => setOpenAddressForm(false)}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: 30,
            top: 30,
          }}
          onClick={() => setOpenAddressForm(false)}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <AddressForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Address;
