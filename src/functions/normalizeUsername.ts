export default function normalizeUsername(username: string) {
    return username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, '')
}