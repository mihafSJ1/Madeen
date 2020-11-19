
import * as Contacts from 'expo-contacts';
  

export const loadContacts = async () => {
    console.log("Contact");
    const permission = await Contacts.requestPermissionsAsync();
    

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

 
