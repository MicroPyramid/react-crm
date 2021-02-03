export const Validations = (values) => {
    
  let errors = { };
  
  errors.name = (!values.name.trim()) ? 'This field is required' : '';     
  errors.email = (!values.email.trim()) ? 'This field is required' : 
                 (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)) ? '' :
                 'Please enter valid email';  
  errors.phone = (!values.phone.trim()) ? 'This field is required': 
                  (values.phone.length === 13) ? '' : 'Enter valid phone number';
  errors.billing_address_line = (!values.billing_address_line.trim()) ? 'This field is required' : '';
  errors.billing_street = (!values.billing_street.trim()) ? 'This field is required' : '';
  errors.billing_postcode = (!values.billing_postcode.trim()) ? 'This field is required' : '';
  errors.billing_city = (!values.billing_city.trim()) ? 'This field is required' : '';
  errors.billing_state = (!values.billing_state.trim()) ? 'This field is required' : '';
  errors.billing_country = (!values.billing_country.length > 0) ? 'This field is required' : '';
  errors.contacts = (values.contacts === null || !values.contacts.length > 0) ? 'This field is required': '';  
  errors.website = (!values.webiste && values.website === null) ? '' :
                    (values.website.trim().length === 0) ? '' : 
                    (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/.test(values.website)) ?  'Enter a valid URL' : '';  
    
  return errors;
}
