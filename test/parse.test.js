import { inputStream } from "../src/inputStream.js"
import { parse } from "../src/parse.js"
import { tokenStream } from "../src/tokenStream.js"
import assert from 'assert'


describe('parse function test', () => {
    it('test num', () => {
        const input = 'sum = lambda(x, y) x + y'
        const inpStream = inputStream(input)        
        const tokStream = tokenStream(inpStream) 
        const ast = parse(tokStream)
        assert.deepEqual(ast, [{ 
            "type": "assign",
            "operator": "=", 
            "left": { 
                "type": "var",
                "value": "sum"
            },
            "right": { 
                "type": "lambda", 
                "vars": ["x", "y"],
                "body": { 
                    "type": "binary", 
                    "operator": "+", 
                    "left": { 
                        "type": "var",
                        "value": "x"
                    },
                    "right": { 
                        "type": "var", 
                        "value": "y"
                    }
                }
            }
        }])
    })
})