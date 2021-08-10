const y = new Date().getFullYear();

export const memberIds = [
	'eileenHorton-1153',
	'terranceMoreno-1322',
	'ronVargas7653',
	'lukeCook4721',
	'joyceFreeman1384',
	'samanthaPhillips8493',
	'taraFletcher1263',
	'frederickAdams6532',
	'carolynHanson7953',
	'brittanyHale3683',
	'lloydObrien1564',
	'gabriellaMay2850',
	'leeWheeler1941',
	'gailBarnes7615',
	'ellaRobinson1093'
]

export const membersDetail = [
  {
    id: "eileenHorton-1153",
    name: "Eileen Horton",
    email: "eileen_h@hotmail.com",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "terranceMoreno-1322",
    name: "Terrance Moreno",
    email: "",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "ronVargas7653",
    name: "Ron Vargas",
    email: "ronnie_vergas@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "lukeCook4721",
    name: "Luke Cook",
    email: "cookie_lukie@hotmail.com",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "joyceFreeman1384",
    name: "Joyce Freeman",
    email: "joyce991@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "samanthaPhillips8493",
    name: "Samantha Phillips",
    email: "samanthaphil@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "taraFletcher1263",
    name: "Tara Fletcher",
    email: "taratarara@imaze.edu.du",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "frederickAdams6532",
    name: "Frederick Adams",
    email: "iamfred@imaze.infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "carolynHanson7953",
    name: "Carolyn Hanson",
    email: "carolyn_h@gmail.com",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "brittanyHale3683",
    name: "Brittany Hale",
    email: "brittany1134@gmail.com",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "lloydObrien1564",
    name: "Lloyd Obrien",
    email: "handsome-obrien@hotmail.com",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "gabriellaMay2850",
    name: "Gabriella May",
    email: "maymaymay12@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "leeWheeler1941",
    name: "Lee Wheeler",
    email: "",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "gailBarnes7615",
    name: "Gail Barnes",
    email: "gailby0116@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  },
  {
    id: "ellaRobinson1093",
    name: "Ella Robinson",
    email: "ella_robinson@infotech.io",
    img: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  }
]

export const labels = [
	{
		color: 'blue',
		label: 'Task'
	},
	{
		color: 'gold',
		label: 'Bug'
	},
	{
		color: 'red',
		label: 'Live issue'
	},
	{
		color: 'cyan',
		label: 'Low priority'
	}
];
  
const toBeProcessCards = [
	{
		id: 'zb7zxtjctd',
		name: 'Unable to upload file',
		description: 'Scenester hashtag sustainable art party 3 wolf moon live-edge portland offal master cleanse disrupt viral palo santo tacos. Offal sriracha you probably havent heard of them vaporware glossier.',
		cover: '/img/others/img-13.jpg',
		members: ['eileenHorton-1153', 'terranceMoreno-1322', 'ronVargas7653'],
		labels: ['Task', 'Live issue'],
		attachments: [
			{
				'id': 'jubuK7XGp3',
				'name': 'mail.jpg',
				'src': '/img/others/img-13.jpg',
				'size': '36.1kb'
			},
			{
				'id': 'xsb3HCejCM',
				'name': 'mail.jpg',
				'src': '/img/others/img-14.jpg',
				'size': '55.9kb'
			}
		],
		comments: [
			{
				id: 'R22TqMkACm',
				name: 'Carolyn Hanson',
				src: "/img/avatars/thumb-9.jpg",
				message: 'I am baby kitsch plaid mustache, williamsburg butcher gluten-free 3 wolf moon authentic quinoa selvage knausgaard unicorn. Palo santo viral everyday carry, heirloom tumblr raw denim yr iceland wayfarers single-origin coffee tote bag shoreditch cloud bread poke.',
				date: new Date(y, 4, 20)
			}
		],
		'dueDate': new Date(y, 7, 5)
	},
	{
		id: '7qgsduurxt',
		name: 'Table data incorrect',
		description: '',
		cover: '',
		members: ['frederickAdams6532'],
		labels: ['Bug'],
		attachments: [],
		comments: [
			{
				id: 'Wx8FDSsVTg',
				name: 'Samantha Phillips',
				src: "/img/avatars/thumb-6.jpg",
				message: 'Helvetica 8-bit photo booth tumblr food truck. Enamel pin wolf tousled sartorial, brunch shoreditch skateboard beard helvetica. Plaid typewriter gastropub bespoke.',
				date: new Date(y, 4, 20)
			},
			{
				id: '3AhkqqSFFr',
				name: 'Ron Vargas',
				src: "/img/avatars/thumb-3.jpg",
				message: 'Af trust fund meggings, meditation chicharrones brunch wolf narwhal shoreditch whatever bicycle rights ramps. ',
				date: new Date(y, 4, 20)
			}
		],
		dueDate: new Date(y, 6, 11)
	},
	{
		id: 'wtwgpz6csc',
		name: 'Fix broken UI',
		description: 'Air plant subway tile four loko ramps. Microdosing offal tote bag, single-origin coffee biodiesel before they sold out swag pok pok gastropub tacos letterpress.',
		cover: '',
		members: ['leeWheeler1941', 'joyceFreeman1384',],
		labels: ['Low priority'],
		attachments: [],
		comments: [
			{
				id: 'bAvBdtKHNC',
				name: 'Lloyd Obrien',
				src: "/img/avatars/thumb-11.jpg",
				message: 'Helvetica 8-bit photo booth tumblr food truck. Enamel pin wolf tousled sartorial, brunch shoreditch skateboard beard helvetica. Plaid typewriter gastropub bespoke.',
				date: new Date(y, 4, 20)
			}
		],
		'dueDate': new Date(y, 7, 5)
	},
]

const processingCards = [
	{
		id: 'ywejrdr3rn',
		name: 'Fix dashboard layout',
		description: 'Biodiesel selvage letterpress 8-bit, coloring book banjo austin pabst post-ironic try-hard gluten-free tilde authentic prism man braid.',
		cover: '',
		members: ['taraFletcher1263', 'frederickAdams6532'],
		labels: ['Bug'],
		attachments: [],
		comments: [
			{
				id: 'afPugkEmkp',
				name: 'Eileen Horton',
				src: "/img/avatars/thumb-1.jpg",
				message: '',
				date: new Date(y, 5, 16)
			}
		],
		dueDate: new Date(y, 3, 17)
	},
	{
		id: 'tkBXWJGwkr',
		name: 'New design',
		description: 'Typewriter hell of cloud bread health goth beard mlkshk four loko.',
		cover: '',
		members: ['brittanyHale3683'],
		labels: ['Task'],
		attachments: [
			{
				'id': 'NjHJhHeWrG',
				'name': 'issue.jpg',
				'src': '/img/others/img-16.jpg',
				'size': '46.1kb'
			}
		],
		comments: [
			{
				id: 'MAsPDzGwnA',
				name: 'Ron Vargas',
				src: "/img/avatars/thumb-3.jpg",
				message: 'Af trust fund meggings, meditation chicharrones brunch wolf narwhal shoreditch whatever bicycle rights ramps. ',
				date: new Date(y, 4, 20)
			}
		],
		dueDate: null
	},
	{
		id: 'VQgUDrYJYH',
		name: 'Improve user experiences',
		description: '',
		cover: '',
		members: ['samanthaPhillips8493'],
		labels: ['Low priority', 'Task'],
		attachments: [],
		comments: [],
		dueDate: new Date(y, 4, 20)
	}
]

const submittedCards = [
	{
		id: 'jzjn95g3v4',
		name: 'Update node environment',
		description: 'Unicorn occupy locavore pug, stumptown literally tofu irony. Af street art paleo shoreditch. Banh mi before they sold out activated charcoal.',
		cover: '',
		members: ['ronVargas7653'],
		labels: ['Low priority'],
		attachments: [],
		comments: [
			{
				id: 'nBAGhJqe9v',
				name: 'Ron Vargas',
				src: "null",
				message: '',
				date: new Date(y, 1, 8)
			}
		],
		dueDate: null
	},
	{
		id: 'ZFQDPmscwA',
		name: 'Remove user data',
		description: 'Crucifix polaroid hot chicken asymmetrical wolf helvetica keytar fashion axe ramps YOLO wayfarers 90s.',
		cover: null,
		members: ['carolynHanson7953', 'brittanyHale3683'],
		labels: ['Live issue'],
		attachments: [
			{
				'id': 'NjHJhHeWrG',
				'name': 'issue.jpg',
				'src': null,
				'size': '42.6kb'
			}
		],
		comments: [
			{
				id: 'nBAGhJqe9v',
				name: 'Ron Vargas',
				src: "/img/avatars/thumb-3.jpg",
				message: '',
				date: new Date(y, 1, 8)
			}
		],
		dueDate: null
	},
]

const completedCards = [
	{
		id: 'yhjk5679xr',
		name: 'Ready to test',
		description: 'Yr green juice health goth, williamsburg four dollar toast shabby chic meggings jean shorts VHS.',
		cover: '',
		members: ['leeWheeler1941', 'carolynHanson7953'],
		labels: ['Task'],
		attachments: [],
		comments: [
			{
				id: 'yxc5gwrXUZ',
				name: 'Ron Vargas',
				src: "/img/avatars/thumb-3.jpg",
				message: '',
				date: new Date(y, 3, 4)
			}
		],
		dueDate: new Date(y, 3, 4)
	},
	{
		id: 'UMgvapYVXm',
		name: 'Slow API connection',
		description: 'Yr green juice health goth, williamsburg four dollar toast shabby chic meggings jean shorts VHS.',
		cover: '',
		members: ['joyceFreeman1384', 'samanthaPhillips8493', 'taraFletcher1263'],
		labels: ['Bug'],
		attachments: [],
		comments: [],
		dueDate: new Date(y, 7, 19)
	},
	{
		id: 'uRZNVsCmDW',
		name: 'Login failed',
		description: 'Air plant subway tile four loko ramps. Microdosing offal tote bag, single-origin coffee biodiesel before they sold.',
		cover: '',
		members: ['lukeCook4721'],
		labels: ['Live issue'],
		attachments: [],
		comments: [],
		dueDate: new Date(y, 4, 6)
	},
	{
		id: 'PBSGmhVgvS',
		name: 'Locale incorrect',
		description: 'Hoodie mustache woke pour-over you probably havent heard of them cray.',
		cover: '',
		members: ['joyceFreeman1384', 'ronVargas7653'],
		labels: ['Low priority'],
		attachments: [],
		comments: [
			{
				id: 'dNskbPFeQD',
				name: 'Ron Vargas',
				src: "/img/avatars/thumb-3.jpg",
				message: 'Af trust fund meggings, meditation chicharrones brunch wolf narwhal shoreditch whatever bicycle rights ramps. ',
				date: new Date(y, 4, 20)
			},
			{
				id: 'qNzkmRZiTO',
				name: 'Terrance Moreno',
				src: "/img/avatars/thumb-2.jpg",
				message: 'Noted!',
				date: new Date(y, 4, 20)
			}
		],
		dueDate: new Date(y, 7, 13)
	}
]

export const scrumboardData = {
	'To be processed': [...toBeProcessCards],
	'Processing': [...processingCards],
	'Submitted': [...submittedCards],
	'Completed': [...completedCards]
}
