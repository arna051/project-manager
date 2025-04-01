
export function generateRandomArray() {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1); // [1,2,...,10]

    // Fisher–Yates shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, 5);
}



export const fCurrency = (amount: number): string => new Intl.NumberFormat('en').format(amount);


export const replacePersianArabicNumbers = (input: string): number => {
    const persianNumbers = [/[\u06F0-\u06F9]/g]; // Persian numbers ۰-۹
    const arabicNumbers = [/[\u0660-\u0669]/g];  // Arabic numbers ٠-٩

    // Replace Persian numbers
    input = input.replace(persianNumbers[0], (digit) => String.fromCharCode(digit.charCodeAt(0) - 0x06F0 + 48));

    // Replace Arabic numbers
    input = input.replace(arabicNumbers[0], (digit) => String.fromCharCode(digit.charCodeAt(0) - 0x0660 + 48));

    // Remove any remaining non-numeric characters
    return Number(input.replace(/\D/g, '') || "0");
};
