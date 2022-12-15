const { Producto } = require("../daos/productosDaoDB");
const contenedor = new Producto();

const getProducts = async () => {
	const listaProductos = await contenedor.getAll();
	return listaProductos;
};

const getProdById = async ({ id }) => {
	const prodById = await contenedor.getbyField(parseInt(id));
	return prodById;
};

const postProduct = async ({ data }) => {
	const idProduct = await contenedor.save(data);
	return idProduct;
};

const putProd = async ({ id, data }) => {
	const response = await contenedor.saveById(parseInt(id), data);
	return response;
};

const deleteProdById = async ({ id }) => {
	const response = await producto.deleteById(parseInt(id));
	return response;
};

module.exports = {
	getProducts,
	getProdById,
	postProduct,
	putProd,
	deleteProdById
}



