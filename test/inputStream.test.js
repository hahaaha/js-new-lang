import { inputStream } from "../src/inputStream.js"
import assert from 'assert'

describe('test inputStream', () => {
    it('test stream next', () => {
        const a = `12233 abc`
        const stream = inputStream(a)
        stream.next()
        stream.next()
        stream.next()
        assert.equal(stream.next(), '3')
    })

    it('test stream peek one', () => {
        const a = `12233 abc`
        const stream = inputStream(a) 
        assert.equal(stream.peek(), '1')
    })

    it('test stream peek two', () => {
        const a = `12233 abc`
        const stream = inputStream(a) 
        stream.next()
        assert.equal(stream.peek(), '2')
    })

    it('test next new line case', () => {
        const a = `1
abc`
        const stream = inputStream(a)
        stream.next()
        stream.next()
        assert.equal(stream.next(), 'a') 
    })

    // it('test cro', () => {
    //     const a = '123'
    //     const stream = inputStream(a)
    //     stream.next()
    //     stream.next()
    //     stream.next()
    //     stream.croak('test')
    // })
})
