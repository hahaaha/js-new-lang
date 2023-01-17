import { is_whitespace, is_digit, is_id_start, is_id, is_punc, is_op_char } from "./util.js"

export const tokenStream = (inputStream) => {
    let current = null
    const keywords = " if then else lambda true false λ "
    return {
        next,
        peek,
        eof,
        croak: inputStream.croak
    }
    function next() {
        let tok = current
        current = null
        return tok || read_next()
    }

    function read_next() {
        read_while(is_whitespace)
        inputStream.peek()
        if (inputStream.eof()) return null
        let ch = inputStream.peek()
        if (ch === '#') {
            skip_comment()
            return read_next()
        }
        if (ch === '"') {
            return read_string()
        }

        if (is_digit(ch)) return read_number()

        // 变量/关键字
        if (is_id_start(ch)) return read_ident()

        if(is_punc(ch)) return {
            type: 'punc',
            value: inputStream.next()
        }
        
        if(is_op_char(ch)) return {
            type: 'op',
            value: read_while(is_op_char) 
        }

        inputStream.croak("can't handle character" + ch)

    }

    function is_keyword(word) {
        return keywords.indexOf(" " + word + " ") >= 0
    }

    function read_ident() {
        let id = read_while(is_id)
        return {
            type: is_keyword(id) ? 'kw' : 'var',
            value: id
        }
    }


    function read_number() {
        let has_dot = false
        const number = read_while((ch) => {
            if (ch === '.') {
                has_dot = true
                return true
            }
            return is_digit(ch)
        })
        return { type: 'num', value: parseFloat(number) }
    }

    function read_while(predicate) {
        let str = ""
        while (!inputStream.eof() && predicate(inputStream.peek())) {
            str += inputStream.next()
        }
        return str
    }

    function skip_comment() {
        read_while((ch) => ch !== '\n')
        inputStream.next()
    }

    function read_string() {
        return { type: 'str', value: read_escaped('"') }
    }

    function read_escaped(end) {
        let escaped = false, str = ''
        inputStream.next()
        while (!inputStream.eof()) {
            let ch = inputStream.next()
            if (escaped) {
                str += ch
                escaped = false
            } else if (ch === '\\') {
                // 特殊的情况处理掉 \+特殊内容 这样就不会被 ch === end break掉
                escaped = true
            } else if (ch === end) {
                break
            } else {
                str += ch
            }
        }
        return str
    }

    function peek() {
        return current || (current = read_next())
    }

    function eof() {
        return peek() == null
    }
}