import React, { useState } from 'react';
import './address.scss';
import { Add, Close, Delete, Edit, LocationOn } from '@mui/icons-material';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import addressApi from '../../../api/apiAddress';
import Loading from '../../components/loading/Loading';
import AddressForm from '../../components/addressForm/AddressForm';
import Confirm from '../../components/confirm/Confirm';
import { toast } from 'react-toastify';

const Address = () => {
  const { t } = useTranslation();
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [addressSelected, setAddressSelected] = useState();
  const {
    isLoading,
    data: addresses,
    refetch,
  } = useQuery(['addresses'], () => addressApi.getMyAddress());

  const handleDeleteAddress = async () => {
    setOpenDeleteConfirm(false);
    const res = await addressApi.deleteAddress(addressSelected.id);
    toast.success(res.message);
    refetch();
  };

  const handleAddAddress = async (body) => {
    setOpenAddressForm(false);
    const res = await addressApi.createAddress(body);
    toast.success(res.message);
    refetch();
  };

  const handleUpdateAddress = async (body) => {
    setOpenAddressForm(false);
    const res = await addressApi.updateAddress(body);
    toast.success(res.message);
    refetch();
  };

  const handleSetDefaultAddress = async (id) => {
    const res = await addressApi.setDefaultAddress(id);
    toast.success(res.message);
    refetch();
  };

  return (
    <div id="address">
      <div className="heading">
        <h3>{t('profile_address')}</h3>
        <div className="head-action">
          <Button
            variant="outlined"
            endIcon={<Add />}
            onClick={() => {
              setOpenAddressForm(true);
              setAddressSelected(null);
            }}
          >
            {t('common_add')}
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div className="item" key={address.id}>
                <div className="btn-edit">
                  {!address.isDefault && (
                    <Button
                      variant="outlined"
                      startIcon={<LocationOn />}
                      size="small"
                      color="success"
                      onClick={() => {
                        handleSetDefaultAddress(address.id);
                      }}
                    >
                      {t('profile_address_set_default')}
                    </Button>
                  )}
                  <IconButton
                    onClick={() => {
                      setOpenAddressForm(true);
                      setAddressSelected(address);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpenDeleteConfirm(true);
                      setAddressSelected(address);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>

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
          <AddressForm
            address={addressSelected}
            handleAddAddress={handleAddAddress}
            handleUpdateAddress={handleUpdateAddress}
          />
        </DialogContent>
      </Dialog>
      <Confirm
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        titleText="profilt_address_delete_confirm"
        Content={() => <p>{t('profilt_address_are_you_sure_delete')}</p>}
        onConfirm={handleDeleteAddress}
      />
    </div>
  );
};

export default Address;
