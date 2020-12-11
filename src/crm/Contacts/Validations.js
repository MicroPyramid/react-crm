
export const Validations = (values) => {

  let errors = { };    

  errors.first_name = (!values.first_name.trim()) ? 'This field is required' : '';
  errors.last_name = (!values.last_name.trim()) ? 'This field is required' : '';  
  errors.email = (!values.email.trim()) ? 'Please enter the email' : 
                (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) ? 'Please enter valid email address' : ''  
  errors.phone = (!values.phone.trim()) ? 'Please enter the correct phone number' : '';  
      
  return errors;
}