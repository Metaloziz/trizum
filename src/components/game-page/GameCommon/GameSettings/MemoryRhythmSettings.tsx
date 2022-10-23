import { Checkbox, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';
import React, { FC } from 'react';

type MemoryRhythmSettingsPropsT = {
  setBlinksCount: (value: string) => void;
  blinksCount: string;
  sound: boolean;
  setSound: (value: boolean) => void;
};
export const MemoryRhythmSettings: FC<MemoryRhythmSettingsPropsT> = props => {
  const { sound, setSound, setBlinksCount, blinksCount } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Кол-во миганий"
          value={blinksCount}
          onChange={({ currentTarget: { value } }) => setBlinksCount(value)}
          fullWidth
          inputProps={{ type: 'number' }}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox title="Музыка вкл/откл" checked={sound} onChange={() => setSound(!sound)} />
            }
            label="Музыка вкл/откл"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};
