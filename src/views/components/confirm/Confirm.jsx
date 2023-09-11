import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './confirm.scss';

const Confirm = ({
  open,
  setOpen,
  Content,
  titleText = 'common_confirm',
  cancelText = 'common_cancel',
  confirmText = 'common_confirm',
  onConfirm,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      id="confirm"
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={true}
      maxWidth={'sm'}
    >
      <DialogTitle className="title">{t(titleText)}</DialogTitle>
      <DialogContent>
        <Content />
      </DialogContent>
      <div className="confirm-action">
        <button className="btn-confirm" onClick={onConfirm}>
          {t(confirmText)}
        </button>
        <button className="btn-cancel" onClick={() => setOpen(false)}>
          {t(cancelText)}
        </button>
      </div>
    </Dialog>
  );
};

export default Confirm;
