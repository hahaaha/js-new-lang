import assert from "assert";
import { is_digit, is_id_start, is_id, is_punc } from "../src/util.js";

describe('util', () => {
    it('is digit', () => {
        const testNumber = 1
        assert.equal(is_digit(testNumber), true)
    })

    describe('id_start', () => {
        it('is id_start a-z', () => {
            const startPos = 'a'
            assert.equal(is_id_start(startPos), true)
        })
    
        it('is id_start _', () => {
            const startPos = '_'
            assert.equal(is_id_start(startPos), true)
        })
    
        it('is id_start λ', () => {
            const startPos = 'λ'
            assert.equal(is_id_start(startPos), true)
        })
    
        it('is id_start false', () => {
            const startPos = 1
            assert.equal(is_id_start(startPos), false)
        })
    })

   

    describe('is id', () => {
        it('is_id ?', () => {
            const id_ch = '?'
            assert.equal(is_id(id_ch), true)
        })

        it('is_id !', () => {
            const id_ch = '!'
            assert.equal(is_id(id_ch), true)
        })

        it('is id  >', () => {
            const id_ch = '>'
            assert.equal(is_id(id_ch), true)
        })

        it('is id  <', () => {
            const id_ch = '<'
            assert.equal(is_id(id_ch), true)
        })

        it('is id  =', () => {
            const id_ch = '='
            assert.equal(is_id(id_ch), true)
        })

        it('is id  -', () => {
            const id_ch = '-'
            assert.equal(is_id(id_ch), true)
        })

        it('is id  number', () => {
            const id_ch = 2
            assert.equal(is_id(id_ch), true)
        })

       

    })

    it('is punc', () => {
        const puncKeyword = "("
        assert.equal(is_punc(puncKeyword), true)
    })

})