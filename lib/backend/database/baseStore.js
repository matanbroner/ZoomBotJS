const Datastore = require('nedb-promises')

class BaseStore {
    constructor(schema, location){
        this.schema = schema;
        this.store = Datastore.create(location);
    }

    insert(doc){
        return this.store.insert(doc);
    }

    update(query, updates){
        return this.store.update(query, updates);
    }

    find(query){
        return this.store.find(query);
    }

    findOne(query){
        return this.store.findOne(query);
    }

    findById(_id){
        return this.findOne({ _id });
    }

    remove(query){
        return this.store.remove(query);
    }
    
}

module.exports = BaseStore