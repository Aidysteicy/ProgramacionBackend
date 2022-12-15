const controllerGraphQL = require("../controller/gqlController");
const productSchema = require("../models/gql.js");

routeProdGraphQL = {
	schema: productSchema,
	rootValue: {
		getProducts: controllerGraphQL.getProducts,
		getProdById: controllerGraphQL.getProdById,
		postProd: controllerGraphQL.postProduct,
		putProd: controllerGraphQL.putProd,
		deleteProdById: controllerGraphQL.deleteProdById
	},
	graphiql: true
};

module.exports = routeProdGraphQL;