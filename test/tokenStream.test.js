import assert from "assert"
import { inputStream } from "../src/inputStream.js"
import { tokenStream } from "../src/tokenStream.js"

function createTokStream  (content) {
    const input = content 
    const stream = inputStream(input)
    const tokStream = tokenStream(stream)
    return tokStream
}

describe('tokenStream test', () => {
    it('test a lot blank', () => {
        const tokStream = createTokStream('   ')
        assert.equal(tokStream.next(), null)
    })

    it('test string', () => {
        const tokStream = createTokStream('"abc"')
        assert.deepEqual(tokStream.next(), { type: 'str', value: 'abc' })
    })

    it('test number', () => {
        const input = '123'
        const stream = inputStream(input)
        const tokStream = tokenStream(stream)
        assert.deepEqual(tokStream.next(), { type: 'num', value: 123 })
    })

    describe('test ident', () => {
        it('test ident var', () => {
            const input = 'var'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'var', value: 'var' })
        })
        it('test ident keyword if', () => {
            const input = 'if'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'if' })
        })

        it('test ident keyword then', () => {
            const input = 'then'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'then' })
        })

        it('test ident keyword else', () => {
            const input = 'else'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'else' })
        })

        it('test ident keyword lambda', () => {
            const input = 'lambda'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'lambda' })
        })

        it('test ident keyword true', () => {
            const input = 'true'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'true' })
        })

        it('test ident keyword false', () => {
            const input = 'false'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'false' })
        })

        it('test ident keyword λ', () => {
            const input = 'λ'
            const stream = inputStream(input)
            const tokStream = tokenStream(stream)
            assert.deepEqual(tokStream.next(), { type: 'kw', value: 'λ' })
        })
    })

    it('test op', () => {
        const input = '*123'
        const stream = inputStream(input)
        const tokStream = tokenStream(stream)
        assert.deepEqual(tokStream.next(), { type: 'op', value: '*' })
    })

    it('test op mul', () => {
        const tokenStream = createTokStream('+= 1')
        assert.deepEqual(tokenStream.next(), { type: 'op', value: '+=' })
    })

})