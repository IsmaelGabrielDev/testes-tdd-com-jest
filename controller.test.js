const { UsuariosController } = require('./controller');
const { Database } = require('./database');
const { spy, assert, stub, mock } = require('sinon');

let respostaEsperada

describe('Controller de Usuários', () => {

    beforeAll(() => {
        respostaEsperada = [
            {
                id: 10,
                name: 'João Carlos',
                email: 'email@teste.com'
            }
        ]

    });

    it('fake', () => {
        
        const fakeDatabase = {
            findAll () {
                return respostaEsperada
            }
        }

        const controller = new UsuariosController(fakeDatabase)
        const response = controller.getAll()

        expect(response).toEqual(respostaEsperada)
    });

    it('spy', () => {
        const findAll = spy(Database, 'findAll')
        const controller = new UsuariosController(Database)
        controller.getAll()

        assert.calledWith(findAll, 'usuarios')
        findAll.restore()

    });

    it('stub', () => {
        
        const findAll = stub(Database, 'findAll')
        findAll.withArgs('usuarios').returns(respostaEsperada) // Configura o stub

        const controller = new UsuariosController(Database); // Instancia o controller
        const response = controller.getAll() // Chama o getAll

        assert.calledWith(findAll, 'usuarios') // Verifica se o stub foi chamado
        expect(response).toEqual(respostaEsperada) // Verifica se o stub retornou o valor esperado
        findAll.restore() // Limpa o stub
    });

    it('mock', () => {
        
        const dbMock = mock(Database) // Cria um mock
        dbMock.expects('findAll').once().withArgs('usuarios').returns([respostaEsperada]) // Configura o mock

        const controller = new UsuariosController(Database) // Instancia o controller
        const response = controller.getAll() // Chama o getAll

        expect(response).toEqual([respostaEsperada])

        dbMock.verify() // Verifica se o mock foi chamado
        dbMock.restore() // Limpa o mock
    });

});