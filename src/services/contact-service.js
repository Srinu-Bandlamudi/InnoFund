// src/services/contactService.js
const contactRepository = require('../repository/contact-repository');

const createContact = async (contactData) => {
  return await contactRepository.createContact(contactData);
};

const getAllContacts = async () => {
  return await contactRepository.getAllContacts();
};

const getContactById = async (id) => {
  return await contactRepository.getContactById(id);
}; 

const updateContact = async (id, contactData) => {
  return await contactRepository.updateContact(id, contactData);
};

const deleteContact = async (id) => {
  return await contactRepository.deleteContact(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact
};
