const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

let productNew = {
	id: "4",
	nombre: "Calculadora",
	foto:
		"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
	precio: 555
};

let productUpdate = {
	id: "4",
	nombre: "Calculadora Científica",
	foto:
		"https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
	precio: 555
};
// --------------------------------------------------------------------------------------------------------//
describe("Test Completo de Funciones:", () => {
	before(function () {
		console.log("\n ------- INICIO TESTING ------- \n");
	});

	after(function () {
		console.log("\n ------- FIN TESTING -------");
	});

	// --------------------------------------------------------------------------------------------------------//
	describe("GET /api/productos", () => {
		it("Solicitar todos los productos: ", async () => {
			let response = await request.get("/productos");
			expect(response.status).to.eql(200);
		});
	});

	// --------------------------------------------------------------------------------------------------------//
	describe("POST /productos", () => {
		it("Agregar producto:", async () => {
			let response = await request.post("/productos").send(productNew);
			expect(response.status).to.eql(200);
		});

		it("Verificar datos de producto agregado", async () => {
			let addedProduct = await request.get("/productos" + 4);
			expect(addedProduct.body.name).to.eql(productNew.name);
			expect(parseInt(addedProduct.body.price)).to.eql(
				parseInt(productNew.price)
			);
			expect(addedProduct.body.thumbnail).to.eql(productNew.thumbnail);
		});
	});

	// --------------------------------------------------------------------------------------------------------//
	describe("PUT /productos", () => {
		it("Actualizar producto:", async () => {
			let response = await request
				.put("/productos" + 4)
				.send(productUpdate);
			expect(response.status).to.eql(200);
		});

		it("Verificar datos de producto actualizado", async () => {
			let updatedProduct = await request.get("/productos" + 4);
			expect(updatedProduct.body.name).to.eql(productUpdate.name);
			expect(parseInt(updatedProduct.body.price)).to.eql(
				parseInt(productUpdate.price)
			);
			expect(updatedProduct.body.thumbnail).to.eql(productUpdate.thumbnail);
		});
	});

	// --------------------------------------------------------------------------------------------------------//
	describe("GET /productos/:id", () => {
		it("Solicitar producto agregado:", async () => {
			let response = await request.get("/productos/" + 4);
			expect(response.status).to.eql(200);
		});
	});

	// --------------------------------------------------------------------------------------------------------//
	describe("DELETE /producto", () => {
		it("Eliminar producto agregado recientemente:", async () => {
			let response = await request.delete("/productos/" + 4);
			expect(response.status).to.eql(200);
			expect(response.body).to.eql({ deleted: true });
		});
	});
});