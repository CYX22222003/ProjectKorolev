export function usernameValidator(username : string) : boolean {
    const reg : RegExp = /^[a-z0-9][a-z0-9_]+$/;
    return reg.test(username);
}

export function passwordValidator(password : string) : boolean {
    const reg : RegExp = /^(?=.*[\W_]+).{6,}$/
    return reg.test(password);
}

