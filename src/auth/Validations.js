export const Validations = (values) => {

  let errors = { };

  errors.sub_domain = (!values.sub_domain) ? 'This field is required' : '';
  errors.username = (!values.username) ? 'This field is required' :  '';
  errors.email = (!values.email.trim()) ? 'This field is required' : 
                 (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) ? '' :
                 'Please enter valid email';  
  errors.password = (!values.password.trim()) ? 'This field is required' : '';

  return errors;
}
