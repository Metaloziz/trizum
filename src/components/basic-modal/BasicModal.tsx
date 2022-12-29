import React, { FC } from 'react';

import DialogContent from '@mui/material/DialogContent';

import { Dialog, DialogTitle } from '../franchising-page/ui/Dialog';

interface Props {
  children?: React.ReactNode;
  visibility: boolean;
  title?: string;
  fullWidth?: boolean;
  changeVisibility: (value: boolean) => void;
}

const BasicModal: FC<Props> = props => {
  const { children, visibility, changeVisibility, title, fullWidth } = props;
  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: '30px',
          position: 'relative',
        },
      }}
      maxWidth="md"
      fullWidth={fullWidth}
      onClose={() => changeVisibility(false)}
      open={visibility}
    >
      {title ? (
        <DialogTitle onClose={() => changeVisibility(false)}>
          <span>{title}</span>
        </DialogTitle>
      ) : (
        <DialogTitle onClose={() => changeVisibility(false)} />
      )}

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default BasicModal;
