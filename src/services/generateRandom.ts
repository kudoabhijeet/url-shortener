export default function generateRandom() {
    const randomShortCode = Math.random().toString(36).substring(2,7);
    return randomShortCode;
}