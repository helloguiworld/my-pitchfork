export default function normalizeUsername(username: string) {
    return username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '')

    // username = username.normalize('NFD')
    // console.log("normalize", username)
    // username = username.replace(/[\u0300-\u036f]/g, '')
    // console.log("replace", username)
    // username = username.toLowerCase()
    // console.log("toLowerCase", username)
    // username = username.replace(/[^a-z0-9._-]/g, '')
    // console.log("replace", username)
}