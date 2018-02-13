import React, { Component } from 'react';
import Menu, { DIVIDER } from './Menu';
import styles from './Menubar.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openMenu, closeMenu, FILE, EDIT } from '../../actions/menubar';

class MenuBar extends Component {
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
      DIVIDER,
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
      DIVIDER,
      {
        item: 'Manage Storage',
        // action: manage_storage,
        description: 'Manages storage of previously created or opened pictures.'
      },
      DIVIDER,
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
      DIVIDER,
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
      DIVIDER,
      {
        item: 'Recent File',
        disabled: true, // @TODO for chrome app / desktop app
        description: ''
      },
      DIVIDER,
      {
        item: 'E&xit',
        shortcut: 'Alt+F4',
        // action() {
        //   close();
        // },
        description: 'Quits Paint.'
      }
    ];

    const editItems = [
      {
        item: '&Undo',
        shortcut: 'Ctrl+Z',
        // enabled: function(){
        // 	return undos.length >= 1;
        // },
        // action: undo,
        description: 'Undoes the last action.'
      },
      {
        item: '&Repeat',
        shortcut: 'F4',
        // enabled: function(){
        // 	return redos.length >= 1;
        // },
        // action: redo,
        description: 'Redoes the previously undone action.'
      },
      DIVIDER,
      {
        item: 'Cu&t',
        shortcut: 'Ctrl+X',
        // enabled: function(){
        // 	// @TODO disable if no selection (image or text)
        // 	return (typeof chrome !== "undefined") && chrome.permissions;
        // },
        // action: function(){
        // 	document.execCommand("cut");
        // },
        description: 'Cuts the selection and puts it on the Clipboard.'
      },
      {
        item: '&Copy',
        shortcut: 'Ctrl+C',
        // enabled: function(){
        // 	// @TODO disable if no selection (image or text)
        // 	return (typeof chrome !== "undefined") && chrome.permissions;
        // },
        // action: function(){
        // 	document.execCommand("copy");
        // },
        description: 'Copies the selection and puts it on the Clipboard.'
      },
      {
        item: '&Paste',
        shortcut: 'Ctrl+V',
        // enabled: function(){
        // 	return (typeof chrome !== "undefined") && chrome.permissions;
        // },
        // action: function(){
        // 	document.execCommand("paste");
        // },
        description: 'Inserts the contents of the Clipboard.'
      },
      {
        item: 'C&lear Selection',
        shortcut: 'Del',
        // enabled: function(){ return !!selection; },
        // action: delete_selection,
        description: 'Deletes the selection.'
      },
      {
        item: 'Select &All',
        shortcut: 'Ctrl+A',
        // action: select_all,
        description: 'Selects everything.'
      },
      DIVIDER,
      {
        item: 'C&opy To...',
        // enabled: function(){ return !!selection; },
        // action: save_selection_to_file,
        description: 'Copies the selection to a file.'
      },
      {
        item: 'Paste &From...',
        // action: paste_from_file_select_dialog,
        description: 'Pastes a file into the selection.'
      }
    ];

    const {
      fileActive, editActive, openMenu, closeMenu
    } = this.props;

    return (
      <div className={styles['menu-bar']}>
        <Menu
          title="&File"
          items={fileItems}
          isOpen={fileActive}
          openMenu={() => openMenu(FILE)}
          closeMenu={closeMenu}
        />
        <Menu
          title="&Edit"
          items={editItems}
          isOpen={editActive}
          openMenu={() => openMenu(EDIT)}
          closeMenu={closeMenu}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fileActive: state.menu.file,
    editActive: state.menu.edit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openMenu, closeMenu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
