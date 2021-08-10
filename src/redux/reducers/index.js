import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Leads from './Leads';
import Users from './Users';
import Contacts from './Contacts';

const reducers = combineReducers({    
    auth: Auth,
    theme: Theme,
    leads: Leads,
    users: Users,
    contacts: Contacts
});

export default reducers;