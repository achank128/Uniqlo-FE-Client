import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
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
  isConfirmInput = false,
  inputLabel = 'Reason',
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
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
        {isConfirmInput && (
          <div className="confirm-input">
            <TextField
              label={t(inputLabel)}
              variant="outlined"
              multiline
              rows={2}
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}
      </DialogContent>
      <div className="confirm-action">
        <button className="btn-confirm" onClick={() => onConfirm(input)}>
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
