class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `\n El nombre del Usuario es:\n  ${this.nombre} ${this.apellido} \n`;
    }
    addMascota(new_mascota) {
        this.mascotas.push(new_mascota);
        console.log("Mascotas: " +this.mascotas);
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(nombre, autor) {
        let nuevo_libro = {
            "nombre": nombre,
            "autor": autor
        };
        this.libros.push(nuevo_libro);
    }
    getBookNames() {
        return this.libros.map(libro=>libro.nombre);
    }
}
const usuario = new Usuario('Steicy', 'Abreu', 
                [{ "nombre": 'La Cabaña', "autor": 'Nosequiencito' }], ['Pelusa']);
console.log(usuario.getFullName());
usuario.addMascota('perrita');
console.log('Numero de mascotas: ' + usuario.countMascotas());
usuario.addMascota('Gatiita');
console.log('Numero de mascotas: ' + usuario.countMascotas());
usuario.addBook('SOS', 'fulanito');
console.log("Libros: "+usuario.getBookNames());
usuario.addBook('Harry potter', 'JK r');
console.log("Libros: "+usuario.getBookNames());
