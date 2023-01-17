export const inputStream = (input) => {
    let col = 0, line = 0, pos = 0;
    return {
        peek,
        next,
        croak,
        eof, 
    }

    function next() {
        const ch = input.charAt(pos++)
        if(ch === '\n') {
            col = 0
            line ++
        } else {
            col ++
        }
        return ch
    }

     function peek() {
        return input.charAt(pos)
    }

    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }

    function eof() {
        const ch = peek()
        console.log(ch)
        return ch == "";
    }
}