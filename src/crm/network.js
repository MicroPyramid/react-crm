import axios from 'axios';

let config = {
  headers: {
    'Content-Type': 'application/json',          
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    company: `${localStorage.getItem('SubDomain')}`
  }
}
export const getContactsForReactSelect = (api) => {    
    return axios.get(api, config)
        .then( res => {          
          let availableContacts = [];
          res.data.contact_obj_list.map(contact => (
            availableContacts.push({label: contact.first_name, value: contact.first_name, id: contact.id})            
          ))
          return availableContacts;
        });
        return availableContacts;
    });
};

export const getLeadsForReactSelect = (api) => {
    return axios.get(api, config).then((res) => {
        let mergedLeads;
        let availableLeads = [];
        mergedLeads = res.data.open_leads.concat(res.data.close_leads);
        mergedLeads.map((lead) =>
            availableLeads.push({ label: lead.title, value: lead.title, id: lead.id })
        );
        return availableLeads;
    });
};
