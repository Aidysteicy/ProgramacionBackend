const axios = require('axios')

let url = 'http://localhost:8080/productos';

const testgetProd = async () => {
  try {
    const productos = await axios.get(url);
    console.log(productos.data.productos);
  } catch (error) {
    console.log(error);
  }
};

const testgetProdId = async (id) => {
  try {
    const prod = await axios.get(`${url}/${id}`);
    console.log(prod.data.prod);
  } catch (error) {
    console.log(error);
  }
};

const prod = {
  nombre: 'pruebaaa',
  precio: 5700,
  descripcion: 'esta es mi pruebaaa',
  foto: 'https://',
};
const addProd = async () => {
  try {
    const addOne = await axios.post(url, prod);
    console.log(addOne);
  } catch (error) {
    console.log(error);
  }
};

const delProd = async (id) => {
  try {
    await axios.delete(`${url}/${id}`).then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

const delAll = async () => {
  try {
    await axios.delete(url).then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

const putProd = async (id, data) => {
  try {
    await axios
      .put(`${url}/${id}`, { data })
      .then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {testgetProd, testgetProdId, addProd, putProd, delProd, delAll}