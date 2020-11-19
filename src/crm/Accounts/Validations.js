
export const Validations = (values) => {

  let errors = { };
  
  errors.name = (!values.name.trim()) ? 'This field is required' : '';     
  errors.email = (!values.email.trim()) ? 'This field is required' : 
                 (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) ? '' :
                 'Please enter valid email';
  errors.phone = (!values.phone.trim()) ? 'This field is required': '';
  // errors.phone = (!values.phone.trim()) ? 'This field is required':
  //                (/^[0-9\b]+$/.test(values.phone)) ? '': 'Please enter valid phone number';
  errors.billing_address_line = (!values.billing_address_line.trim()) ? 'This field is required' : '';
  errors.billing_street = (!values.billing_street.trim()) ? 'This field is required' : '';
  errors.billing_postcode = (!values.billing_postcode.trim()) ? 'This field is required' : '';
  errors.billing_city = (!values.billing_city.trim()) ? 'This field is required' : '';
  errors.billing_state = (!values.billing_state.trim()) ? 'This field is required' : '';
  errors.billing_country = (!values.billing_country.trim()) ? 'This field is required' : '';  
  errors.contacts = (values.contacts.length === 0) ? 'This field is required': '';      

  return errors;
}