import React from 'react';
import axios from 'axios';

const NAME_PATTERN = /^[a-zA-Z-. ]{1,256}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}[ ext\.]*[0-9]{0,5}/;

class FormController extends React.Component {
  constructor (props) {
    super(props);
    const formFields = this.getDefaultFields();
    this.state = {
      formFields,
      isLoading: false,
      hasSucceeded: false,
      hasFailed: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSubmitError = this.handleSubmitError.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
  }

  getDefaultFields () {
    const fields = this.getFields();
    return fields.reduce((dataObject, { key, defaultValue }) => {
      dataObject[key] = defaultValue;
      return dataObject;
    }, {});
  }

  getFields () {
    return [];
  }

  handleFormSubmit (e) {
    e.preventDefault();
    if (!this.formIsValid()) return;
    this.setState({ isLoading: true })
    this.submitForm();
  }

  getSuccessContent () {
    return null;
  }

  getFailureContent () {
    return null;
  }

  handleSubmitError (err) {
    const url = this.getSubmissionUrl();
    this.setState({ hasSucceeded: false, hasFailed: true, isLoading: false });
    console.log(`Submission Error (@${url})`, err);
  }

  handleSubmitSuccess (res) {
    const url = this.getSubmissionUrl();
    this.setState({ hasSucceeded: true, hasFailed: false, isLoading: false });
    console.log(`Sumission Success: (@${url})`, res);
  }

  submitForm () {
    const url = this.getSubmissionUrl();
    const { formFields } = this.state;
    const { handleSubmitError, handleSubmitSuccess } = this;
    axios.post(url, formFields)
      .then(res => handleSubmitSuccess(res))
      .catch(err => handleSubmitError(err));
  }

  formIsValid () {
    const { formFields } = this.state;
    const fieldKeys = this.getFields().map(({ key }) => key);
    return fieldKeys.every(key => {
      const result = this.fieldIsValid(key, formFields[key]);
      if (!result) alert('Please enter a valid ' + key + '.');
      return result;
    });
  }

  fieldIsValid (fieldName, value) {
    if (fieldName === 'email') return EMAIL_PATTERN.test(value);
    if (fieldName === 'phone') return PHONE_PATTERN.test(value);
    if (fieldName === 'name') return NAME_PATTERN.test(value);
    else return typeof value === 'string' && value.length > 1;
  }

  getDescription () {
    return null;
  }

  getButtonText () {
    return 'Submit';
  }

  handleFieldChange (prop) {
    return (event) => {
      const { formFields } = this.state;
      const { value } = event.target;
      const newFormFields = Object.assign({}, formFields, { [prop]: value });
      this.setState({ formFields: newFormFields });
    };
  }

  render () {
    const { handleFieldChange } = this;
    const { formFields, isLoading, hasSucceeded, hasFailed } = this.state;
    const fields = this.getFields();
    const description = this.getDescription();
    const buttonText = this.getButtonText();
    const successContent = this.getSuccessContent();
    const failureContent = this.getFailureContent();
    return (
      <div className="FormWrapper">
        <p>
          {description}
        </p>
        {!hasSucceeded ? null : (
          <p>
            <em><b>Thank you! Your submission has been received!</b></em>
            {successContent}
          </p>
        )}
        {!hasFailed ? null : (
          <p>
            <em><b>Oops! Something went wrong while submitting the form :(</b></em>
            {failureContent}
          </p>
        )}
        {!isLoading ? null : (
          <img src="/assets/loader.gif" className="loader" />
        )}
        {!isLoading && !hasSucceeded && !hasFailed ? (
          <form className="FormBox" onSubmit={this.handleFormSubmit}>
            {fields.map((field, idx) => (
              <section key={idx}>
                <label>{field.label}</label>
                {!field.options ? (
                  <input
                    type="text"
                    name={field.key}
                    placeholder={field.placeholder}
                    value={formFields[field.key]}
                    onChange={handleFieldChange(field.key)}
                  />
                ) : (
                  <select name={field.key} onChange={handleFieldChange(field.key)}>
                    <optgroup label={field.label}>
                      {field.options.map((option, key) => (
                        <option key={key} value={option}>{option}</option>
                      ))}
                    </optgroup>
                  </select>
                )}
              </section>
            ))}
            <button tyoe="submit">
              {buttonText}
            </button>
          </form>
        ) : null
      }
      </div>
    );
  }
};

export default FormController;
