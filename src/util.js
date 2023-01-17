export function is_whitespace(ch) {
    return " \t\n".indexOf(ch) >= 0
}

export function is_digit(ch) {
    return /[0-9]/i.test(ch)
}

export function is_id_start(ch) {
    return /[a-zλ_]/i.test(ch);
}

export function is_id(ch) {
    return is_id_start(ch) || '?!-<>=0123456789'.indexOf(ch) >= 0
}

export function is_punc(ch) {
    return ",;(){}[]".indexOf(ch) >= 0
}

export function is_op_char(ch) {
    return "+-*/%=&|<>!" .indexOf(ch) >= 0
}