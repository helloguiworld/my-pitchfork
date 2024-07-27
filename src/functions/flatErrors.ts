export default function flatFilterErrors(...errors: (string[] | undefined)[]) {
    const flatErrors = errors.filter(error => error != undefined).flat()
    return flatErrors
}