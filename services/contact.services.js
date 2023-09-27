const Contact = require('../modles/contact');
exports.getAllContactServices = async () => {
    const result = await Contact.find({}).sort({ _id: -1 });;
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