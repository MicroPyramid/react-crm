import React, { useState } from 'react';
import { RichTextField } from 'mui-quill';

export function RichEditor(props) {
  const [value, setValue] = useState('');

  return (
    <RichTextField
      value={ value }
      onChange={ (nextValue) => setValue(nextValue) }
      variant="outlined"
      options={{
        toolbar: true
      }}
    />
  );
}
