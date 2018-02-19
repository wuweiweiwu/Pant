// @flow

export const DIVIDER: string = 'DIVIDER';

export type Item =
  | {
      item: string,
      shortcut?: string,
      disabled?: boolean,
      checkbox?: boolean,
      description?: string,
      submenu?: Array<Item>
    }
  | string;

export const fileItems: Array<Item> = [
  {
    item: '&New',
    shortcut: 'Ctrl+N',
    description: 'Creates a new document.'
  },
  {
    item: '&Open',
    shortcut: 'Ctrl+O',
    description: 'Opens an existing document.'
  },
  {
    item: '&Save',
    shortcut: 'Ctrl+S',
    description: 'Saves the active document.'
  },
  {
    item: 'Save &As',
    shortcut: 'Ctrl+Shift+S',
    description: 'Saves the active document with a new name.'
  },
  DIVIDER,
  {
    item: '&Load From URL',
    description: 'Opens an image from the web.'
  },
  {
    item: '&Upload To Imgur',
    description: 'Uploads the active document to Imgur'
  },
  DIVIDER,
  {
    item: 'Manage Storage',
    description: 'Manages storage of previously created or opened pictures.'
  },
  DIVIDER,
  {
    item: 'Print Pre&view',
    description: 'Prints the active document and sets printing options.'
  },
  {
    item: 'Page Se&tup',

    description: 'Prints the active document and sets printing options.'
  },
  {
    item: '&Print',
    shortcut: 'Ctrl+P',

    description: 'Prints the active document and sets printing options.'
  },
  DIVIDER,
  {
    item: 'Set As &Wallpaper (Tiled)',
    description: 'Tiles this bitmap as the desktop background.'
  },
  {
    item: 'Set As Wallpaper (&Centered)', // in mspaint it's Wa&llpaper
    description: 'Centers this bitmap as the desktop background.'
  },
  DIVIDER,
  {
    item: 'Recent File',
    disabled: true,
    description: ''
  },
  DIVIDER,
  {
    item: 'E&xit',
    shortcut: 'Alt+F4',
    description: 'Quits Paint.'
  }
];

export const editItems = [
  {
    item: '&Undo',
    shortcut: 'Ctrl+Z',
    description: 'Undoes the last action.'
  },
  {
    item: '&Repeat',
    shortcut: 'F4',

    description: 'Redoes the previously undone action.'
  },
  DIVIDER,
  {
    item: 'Cu&t',
    shortcut: 'Ctrl+X',

    description: 'Cuts the selection and puts it on the Clipboard.'
  },
  {
    item: '&Copy',
    shortcut: 'Ctrl+C',
    description: 'Copies the selection and puts it on the Clipboard.'
  },
  {
    item: '&Paste',
    shortcut: 'Ctrl+V',
    description: 'Inserts the contents of the Clipboard.'
  },
  {
    item: 'C&lear Selection',
    shortcut: 'Del',
    description: 'Deletes the selection.'
  },
  {
    item: 'Select &All',
    shortcut: 'Ctrl+A',
    description: 'Selects everything.'
  },
  DIVIDER,
  {
    item: 'C&opy To...',
    description: 'Copies the selection to a file.'
  },
  {
    item: 'Paste &From...',
    description: 'Pastes a file into the selection.'
  }
];

export const viewItems = [
  {
    item: '&Tool Box',
    shortcut: 'Ctrl+T',
    checkbox: true,
    description: 'Shows or hides the tool box.'
  },
  {
    item: '&Color Box',
    shortcut: 'Ctrl+L',
    checkbox: true,
    description: 'Shows or hides the color box.'
  },
  {
    item: '&Status Bar',
    checkbox: true,
    description: 'Shows or hides the status bar.'
  },
  {
    item: 'T&ext Toolbar',
    disabled: true,
    checkbox: true,
    description: 'Shows or hides the text toolbar.'
  },
  DIVIDER,
  {
    item: 'E&xtras Menu',
    checkbox: true,
    description: 'Shows or hides the Extras menu.'
  },
  DIVIDER,
  {
    item: '&Zoom',
    submenu: [
      {
        item: '&Normal Size',
        shorcut: 'Ctrl+PgUp',
        description: 'Zooms the picture to 100%.'
      },
      {
        item: '&Large Size',
        shorcut: 'Ctrl+PgDn',
        description: 'Zooms the picture to 400%.'
      },
      {
        item: 'C&ustom...',
        disabled: true,
        description: 'Zooms the picture.'
      },
      DIVIDER,
      {
        item: 'Show &Grid',
        shorcut: 'Ctrl+G',
        disabled: true,
        checkbox: true,
        description: 'Shows or hides the grid.'
      },
      {
        item: 'Show T&humbnail',
        disabled: true,
        checkbox: true,
        description: 'Shows or hides the thumbnail view of the picture.'
      }
    ]
  },
  {
    item: '&View Bitmap',
    shortcut: 'Ctrl+F',
    description: 'Displays the entire picture.'
  }
];

export const imageItems = [
  {
    item: '&Flip/Rotate',
    shortcut: 'Ctrl+R',
    description: 'Flips or rotates the picture or a selection.'
  },
  {
    item: '&Stretch/Skew',
    shortcut: 'Ctrl+W',
    description: 'Stretches or skews the picture or a selection.'
  },
  {
    item: '&Invert Colors',
    shortcut: 'Ctrl+I',
    description: 'Inverts the colors of the picture or a selection.'
  },
  {
    item: '&Attributes...',
    shortcut: 'Ctrl+E',
    description: 'Changes the attributes of the picture.'
  },
  {
    item: '&Clear Image',
    shortcut: 'Ctrl+Shift+N',
    description: 'Clears the picture or selection.'
  },
  {
    item: '&Draw Opaque',
    checkbox: true,
    description: 'Makes the current selection either opaque or transparent.'
  }
];

export const colorItems = [
  {
    item: '&Edit Colors...',
    description: 'Creates a new color.'
  },
  {
    item: '&Get Colors',
    description: 'Uses a previously saved palette of colors.'
  },
  {
    item: '&Save Colors',
    description: 'Saves the current palette of colors to a file.'
  }
];

export const helpItems = [
  {
    item: '&Help Topics',
    description: 'Displays Help for the current task or command.'
  },
  DIVIDER,
  {
    item: '&About Paint',
    description: 'Displays information about this application.'
  }
];
