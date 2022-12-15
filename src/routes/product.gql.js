const controllerGraphQL = require("../controllers/gqlController.js");

const productSchema = require("../models/gql.js");

routeProdGraphQL = {
	schema: productSchema,
	rootValue: {
		getProducts: controllerGraphQL.getProducts,
		getProdById: controllerGraphQL.getProdById,
		postProd: controllerGraphQL.postProd,
		putProd: productsControllerGraphQL.putProd,
		deleteProdById: controllerGraphQL.deleteProdById
	},
	graphiql: true
};

module.exports = routeProdGraphQL;