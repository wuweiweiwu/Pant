import uuid from 'uuid/v1';
import React from 'react';

export function embedHotkey(str: string) {
  const arr = [];
  arr.push(str.split('&')[0]);

  let hotkey = null;
  const index = str.indexOf('&');
  if (index >= 0) {
    hotkey = str[index + 1];
  }
  arr.push(hotkey ? (
    <span
      style={{
          textDecoration: 'underline',
          display: 'inline'
        }}
      key={uuid()}
    >
      {hotkey}
    </span>
  ) : null);

  const second = str.split('&')[1];
  arr.push(second ? second.substring(1) : null);

  return arr;
}
