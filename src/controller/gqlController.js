const { graphqlHTTP } = require( 'express-graphql')
const { buildSchema } = require( 'graphql')

const schema = buildSchema(`
input PersonaInput {
  nombre: String,
  edad: Int
}
type Persona {
  id: ID!
  nombre: String,
  edad: Int
}
type Query {
  getPersona(id: ID!): Persona,
  getPersonas(campo: String, valor: String): [Persona],
}
type Mutation {
  createPersona(datos: PersonaInput): Persona
  updatePersona(id: ID!, datos: PersonaInput): Persona,
  deletePersona(id: ID!): Persona,
}
`)

class GraphQLController{
  constructor(){
      this.api = new UsuariosApi()
      this.config = {
        schema,
        rootValue: {
          getPersona: this.api.getPersona,
          getPersonas: this.api.getPersonas,
          createPersona: this.api.createPersona,
          updatePersona: this.api.updatePersona,
          deletePersona: this.api.deletePersona
        }
      }
      return graphqlHTTP(this.config)
  }

  
}

module.exports = { GraphQLController }




