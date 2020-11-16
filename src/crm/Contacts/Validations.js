
export const Validations = (values) => {

  let errors = { };    

  errors.first_name = (values.first_name) ? 'This field is required' : '';
  errors.last_name = (values.last_name) ? 'This field is required' : '';
  errors.phone = (values.phone) ? values.phone[0] : '';
  errors.email = (values.email) ? values.email[0] : '';
      
  return errors;
}