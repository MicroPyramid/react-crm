export const rules = {
  email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
  name: [
    {
      required : true, 
      message: 'Please input name'  
    }
  ],
  company: [
    {
      required: true,
      message: 'Please input company'  
    }
  ],
	amount: [
		{
			required: true,
			message: 'Please input amount'
		}
	],
	addressLane: [
		{
			required: true,
			message: 'Please input address lane'
		}
	],
	saluation: [
		{
			required: true,
			message: 'Please input saluation'
		}
	],
	lastName: [
		{
			required: true,
			message: 'Please input last name'
		}
	],
	firstName: [
		{
			required: true,
			message: 'Please input first Name'
		}
	],
	mobileNumber: [
		{
			required: true,
			message: 'Please input mobile number'
		}
	],
	addressLane: [
		{
			required: true,
			message: 'Please input address lane'
		}
	],
	title: [
		{
			required: true,
			message: 'Please input title'
		}
	]
}
