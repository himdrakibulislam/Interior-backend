const Contact = require('../modles/contact');
exports.getAllContactServices = async () => {
    const result = await Contact.find({});
    return result; 
} 
exports.createContactService = async (data) => {
    const result = await Contact.create(data);
    return result; 
} 
exports.deteleClientService = async (id) => {
    const result = await Contact.deleteOne({_id:id});
    return result; 
} 