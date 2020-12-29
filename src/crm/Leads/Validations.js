export const Validations = (values) => {

  let errors = { };  
  errors.first_name = (!values.first_name.trim()) ? 'This field is required': '';
  errors.last_name = (!values.last_name.trim()) ? 'This field is required': '';
  errors.title = (!values.title.trim()) ? 'This field is required': '';
  errors.email = (!values.email.trim()) ? 'This field is required' : 
                 (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) ? '' :
                 'Please enter valid email';
  errors.phone = (!values.phone.trim()) ? 'This field is required': '';

  return errors;
}