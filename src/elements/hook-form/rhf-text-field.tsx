import type { TextFieldProps } from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { selectFile, selectFolder } from '@/utils/electron';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export function RHFTextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  const isFileSelect = name === 'image' || name === 'video'
  const isFolderSelect = name === 'path'
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            }

            else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          slotProps={{
            input: {
              ...(
                isFileSelect ? {
                  endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={async () => {
                      const path = await selectFile();
                      if (path === null) return;
                      field.onChange(path);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M9.5 11.5c.97 1.367 3.011 1.127 4.011 0l1.989-2c1.124-1.228 1.164-2.814 0-4c-1.136-1.157-2.864-1.157-4 0l-2 2"></path><path d="M11.5 10.57c-.97-1.367-3-1.197-4-.07l-2 1.975c-1.124 1.228-1.164 2.839 0 4.025c1.136 1.157 2.864 1.157 4 0l2-2"></path></g></svg>
                    </IconButton>
                  </InputAdornment>
                } : {}
              ),

              ...(
                isFolderSelect ? {
                  endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={async () => {
                      const path = await selectFolder();
                      if (path === null) return;
                      field.onChange(path);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}><path d="M9.5 11.5c.97 1.367 3.011 1.127 4.011 0l1.989-2c1.124-1.228 1.164-2.814 0-4c-1.136-1.157-2.864-1.157-4 0l-2 2"></path><path d="M11.5 10.57c-.97-1.367-3-1.197-4-.07l-2 1.975c-1.124 1.228-1.164 2.839 0 4.025c1.136 1.157 2.864 1.157 4 0l2-2"></path></g></svg>
                    </IconButton>
                  </InputAdornment>
                } : {}
              )
            }
          }}
          {...other}
        />
      )}
    />
  );
}
