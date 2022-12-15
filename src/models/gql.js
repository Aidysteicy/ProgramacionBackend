const { buildSchema } = require("graphql");

const productSchema = buildSchema(`
type Product {
    id: ID!
    nombre: String,
    descripcion: String,
    precio: Number,
    foto: String,
    stock: Number
}
input ProductInput {
    nombre: String,
    descripcion: String,
    precio: Number,
    foto: String,
    stock: Number
}
type Query {
    getProducts: [Product],
    getProdById(id:String): Product,
}
type Mutation {
    postProd(data: ProductInput): Product
    putProd(id:String, datos: ProductInput): Product
    deleteProdById(id:String): Product
}
`);

module.exports = productSchema;
