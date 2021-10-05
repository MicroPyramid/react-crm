import {
  LEADS_DATA,
  LEADS_FILTER,
  LEADS_FILTER_DATA,
  LEAD_NAME,
  AMOUNT,
  WEBSITE,
  CONTACT,
  ASSIGN_TO,
  ORGANIZATION,
  STATUS,
  SKYPE_ID,
  SOURCE,
  ATTACHMENT,
  TAG,
  INDUSTRY,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  JOB_TITLE,
  PHONE_NUMBER,
  ADDRESS_LINE,
  CITY,
  STREET,
  STATE,
  PINCODE
} from '../constants/Leads'

const initLeads = {
  loading: true,
  leads: '',
  leadsFilters: '',
  isFiltered: false,
  users: '',
  leadName: '',
  amount: '',
  website: '',
  contact: '',
  assignTO: '',
  organization: '',
  status: '',
  skypeID: '',
  source: '',
  attachment: '',
  tag: '',
  industry: '',
  firstName:'',
  lastName:"",
  jobTitle:"",
  phone:"",
  email:"" ,
  addressLine:'',
  city:"",
  street:'',
  state:"",
  pincode:''
}


const leads = (state = initLeads, action) => {
  switch (action.type) {
    case LEADS_DATA:
      return {
        ...state,
        leads: action.data,
        loading: false
      }
    case LEADS_FILTER_DATA: {
      return {
        ...state,
        leadsFilters: action.data
      }
    }
    case LEADS_FILTER:
      return {
        ...state,
        isFiltered: action.bool
      }
    case LEAD_NAME:
      return {
        ...state,
        leadName: action.data
      }
    case AMOUNT:
      return {
        ...state,
        amount: action.data
      }
    case WEBSITE:
      return {
        ...state,
        website: action.data
      }
    case CONTACT:
      return {
        ...state,
        contact: action.data
      }
    case ASSIGN_TO:
      return {
        ...state,
        assignTO: action.data
      }
    case ORGANIZATION:
      return {
        ...state,
        organization: action.data
      }
    case STATUS:
      return {
        ...state,
        status: action.data
      }
    case SKYPE_ID:
      return {
        ...state,
        skypeID: action.data
      }
    case SOURCE:
      return {
        ...state,
        source: action.data
      }
    case ATTACHMENT:
      return {
        ...state,
        attachment: action.data
      }
    case TAG:
      return {
        ...state,
        tag: action.data
      }
    case INDUSTRY:
      return {
        ...state,
        industry: action.data
      }
      case FIRST_NAME:
        return {
          ...state,
          firstName: action.data
        }
        case LAST_NAME:
        return {
          ...state,
          lastName: action.data
        }
        case JOB_TITLE:
        return {
          ...state,
          jobTitle: action.data
        }
        case PHONE_NUMBER:
        return {
          ...state,
          phone: action.data
        }
        case EMAIL:
          return {
            ...state,
            email: action.data
          }
          case ADDRESS_LINE:
            return {
              ...state,
              addressLine: action.data
            }
            case CITY:
            return {
              ...state,
              city: action.data
            }
            case STATE:
              return {
                ...state,
                state: action.data
              }
              case STREET:
              return {
                ...state,
                street: action.data
              }
              case PINCODE:
                return {
                  ...state,
                  pincode: action.data
                }
    default:
      return state
  }
}

export default leads