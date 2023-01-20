export const parse = (tokenStream) => {
    const PRECEDENCE = {
        "=": 1,
        "||": 2,
        "&&": 3,
        "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
        "+": 10, "-": 10,
        "*": 20, "/": 20, "%": 20
    }
    return parse_toplevel()

    function parse_toplevel() {
        const prog = []
        while (!tokenStream.eof()) {
            prog.push(parse_expression())
            if (!tokenStream.eof()) skip_punc(";");
        }
        return prog 
    }

    function is_punc(ch) {
        const tok = tokenStream.peek()
        // 最后加token为了返回token
        return tok && tok.type == 'punc' && (!ch || tok.value == ch) && tok
    }

    function is_kw(kw) {
        const tok = tokenStream.peek()
        return tok && tok.type == 'kw' && (!kw || tok.value == kw) && tok
    }

    function is_op(op) {
        const tok = tokenStream.peek()
        return tok && tok.type == 'op' && (!op || tok.value == op) && tok
    }

    function parse_call(func) {
        return {
            type: 'call',
            func: func,
            args: delimited('(', ')', ",", parse_expression)
        }
    }

    function delimited(start, stop, separator, parser) {
        const a = []
        let first = true
        skip_punc(start)
        while (!tokenStream.eof()) {
            if (is_punc(stop)) break
            if (first)
                first = false
            else
                skip_punc(separator)
            if (is_punc(stop)) break
            a.push(parser())
        }
        skip_punc(stop);
        return a
    }

    function skip_punc(ch) {
        if (is_punc(ch))
            tokenStream.next()
        else
            tokenStream.croak('Expecting operator: "' + ch + '"')
    }

    function maybe_call(expr) {
        expr = expr()
        return is_punc("(") ? parse_call(expr) : expr
    }

    function maybe_binary(left, my_prec) {
        const tok = is_op()
        if (tok) {
            const his_prec = PRECEDENCE[tok.value]
            if (his_prec > my_prec) {
                tokenStream.next()
                return maybe_binary({
                    type: tok.value == "=" ? "assign" : "binary",
                    operator: tok.value,
                    left: left,
                    right: maybe_binary(parse_atom(), his_prec)
                })
            }
        }
        return left
    }

    function parse_expression() {
        const a = maybe_call(function () {
            return maybe_binary(parse_atom(), 0)
        })
        console.log(a)
        return a
    }

    function parse_atom() {
        return maybe_call(function () {
            console.log(tokenStream.peek())
            if (is_punc('(')) {
                tokenStream.next()
                const exp = parse_expression()
                skip_punc(')')
                return exp
            }
            if (is_punc("{")) parse_prog()
            if (is_kw("if")) return parse_if();
            if (is_kw("true") || is_kw("false")) return parse_bool();
            if (is_kw("lambda") || is_kw("λ")) {
                console.log('start lambda')
                tokenStream.next();
                return parse_lambda();
            }
            var tok = tokenStream.next();
            if (tok.type == "var" || tok.type == "num" || tok.type == "str") {
                console.log('normal')
                return tok
            };
            console.log(JSON.stringify(tokenStream.peek()) + 'parse atom end')
            unexpected()
        })
    }

    function parse_lambda() {
        return {
            type: "lambda",
            vars: delimited("(", ")", ",", parse_varname),
            body: parse_expression()
        };
    }

    function parse_varname() {
        var name = tokenStream.next();
        if (name.type != "var") tokenStream.croak("Expecting variable name");
        return name.value;
    }

    function skip_kw(kw) {
        if (is_kw(kw)) tokenStream.next();
        else tokenStream.croak("Expecting keyword: \"" + kw + "\"");
    }

    function parse_prog() {
        const prog = delimited('{', '}', ';', parse_expression)
        if (prog.length == 0) return FALSE;
        if (prog.length == 1) return prog[0];
        return { type: "prog", prog: prog };
    }

    function parse_bool() {
        return {
            type: 'bool',
            value: tokenStream.next().value == 'true'
        }
    }

    function parse_if() {
        skip_kw('if')
        const cond = parse_expression()
        if (!is_punc("{")) skip_kw('then')
        const then = parse_expression()
        const ret = {
            type: 'if',
            cond,
            then,
        }
        if (is_kw('else')) {
            tokenStream.next()
            ret.else = parse_expression()
        }
        return ret
    }

    function unexpected() {
        tokenStream.croak("Unexpected token: " + JSON.stringify(tokenStream.peek()));
    }

}