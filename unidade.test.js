const { soma, dobro } = require('./unidade');

describe('Funções matematicas', () => {
    beforeAll(() => {
        console.log('Executando antes de todos os testes')
    })

    afterAll(() => {
        console.log('Executando depois de todos os testes')
    })

    beforeEach(() => {
        console.log('Executando antes de cada teste')
    })

    afterEach(() => {
        console.log('Executando depois de cada teste')
    })

    it('Soma de dois valores', () => {
        expect(soma(2,5)).toBe(7);
        expect(soma(2,4)).toBe(6);
        expect(soma(21,44)).toBe(65);
    });

    it('Dobro de um valor', () => {
        expect(dobro(4)).toBe(8);
    });
});