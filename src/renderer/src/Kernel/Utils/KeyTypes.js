
const KeyTypes = {

  // Actions
  _action_delete: 1,

  // The valid keys
  _delete: 'Delete',
  _backspace: 'Backspace',


  // Get the action associated with this key press
  getAction: function(key_event) {
    let type = key_event.code;
    switch(type) {
      case KeyTypes._delete: return this._action_delete;
      case KeyTypes._backspace: return this._action_delete;
      default: return false;
    }

  }
}

export default KeyTypes;