const {User} = require('../models/index');
const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    
}

module.exports = UserRepository;
