const knex = require('knex')(require('../config/knexfile'))


module.exports.getProducts = () => {

    return knex.select('*').from('list')
}

module.exports.getProductsById = (id) => {

    return knex.select('*').from('list').where('id', id)
}

module.exports.addNewProduct = (data) => {

    return knex('list').insert([
        data
    ])

}

module.exports.updateProduct = (data) => {

    return knex('list').update(data).where('id', data.id)

}
