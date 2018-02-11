import React, { Component } from 'react';

import Menu from './Menu';

import styles from './MenuBar.css';

export default class MenuBar extends Component {
  render() {
    const fileItems = [
      {
        item: '&New',
        shortcut: 'Ctrl+N',
        // action: file_new,
        description: 'Creates a new document.'
      },
      {
        item: '&Open',
        shortcut: 'Ctrl+O',
        // action: file_open,
        description: 'Opens an existing document.'
      },
      {
        item: '&Save',
        shortcut: 'Ctrl+S',
        // action: file_save,
        description: 'Saves the active document.'
      },
      {
        item: 'Save &As',
        shortcut: 'Ctrl+Shift+S',
        // in mspaint, no shortcut is listed, but it supports F12; it doesn't support Ctrl+Shift+S
        // action: file_save_as,
        description: 'Saves the active document with a new name.'
      },
      // $MenuBar.DIVIDER,
      {
        item: '&Load From URL',
        // shortcut: "Ctrl+L",
        // action: file_load_from_url,
        description: 'Opens an image from the web.'
      },
      {
        item: '&Upload To Imgur',
        // action: upload_to_imgur,
        description: 'Uploads the active document to Imgur'
      },
      // $MenuBar.DIVIDER,
      {
        item: 'Manage Storage',
        // action: manage_storage,
        description: 'Manages storage of previously created or opened pictures.'
      },
      // $MenuBar.DIVIDER,
      {
        item: 'Print Pre&view',
        // action() {
        //   print();
        // },
        description: 'Prints the active document and sets printing options.'
        // description: "Displays full pages.",
      },
      {
        item: 'Page Se&tup',
        // action() {
        //   print();
        // },
        description: 'Prints the active document and sets printing options.'
        // description: "Changes the page layout.",
      },
      {
        item: '&Print',
        shortcut: 'Ctrl+P',
        // action() {
        //   print();
        // },
        description: 'Prints the active document and sets printing options.'
      },
      // $MenuBar.DIVIDER,
      {
        item: 'Set As &Wallpaper (Tiled)',
        // action: set_as_wallpaper_tiled,
        description: 'Tiles this bitmap as the desktop background.'
      },
      {
        item: 'Set As Wallpaper (&Centered)', // in mspaint it's Wa&llpaper
        // action: set_as_wallpaper_centered,
        description: 'Centers this bitmap as the desktop background.'
      },
      // $MenuBar.DIVIDER,
      {
        item: 'Recent File',
        enabled: false, // @TODO for chrome app / desktop app
        description: ''
      },
      // $MenuBar.DIVIDER,
      {
        item: 'E&xit',
        shortcut: 'Alt+F4',
        // action() {
        //   close();
        // },
        description: 'Quits Paint.'
      }
    ];

    return (
      <div className={styles['menu-bar']}>
        <Menu title="File" items={fileItems} />
      </div>
    );
  }
}
