
class FormHandler {

  constructor() {
    const field_values = null;
  }

  // Set the values
  set_values(values) {
    this.field_values = values;
  }

  // Handle the form submission
  handle_form_submission(callback) {

    if(!this.field_values) {
      throw new Error('Invalid form values');
    }

    return callback(this.field_values);
  }
}