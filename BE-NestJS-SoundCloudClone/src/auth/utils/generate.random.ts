export function generateRandomSixDigitString() {
    const randomNum = Math.floor(Math.random() * 1000000);
    return randomNum.toString().padStart(6, '0');
}
