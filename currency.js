"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
function convertCurrency(amount, fromCurrency, toCurrency) {
    const conversionRates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.73,
        'PKR': 225.5, // Pakistani Rupee
    };
    if (!(fromCurrency in conversionRates) || !(toCurrency in conversionRates)) {
        throw new Error('Invalid currency codes');
    }
    const convertedAmount = amount * (conversionRates[toCurrency] / conversionRates[fromCurrency]);
    return convertedAmount;
}
// Main function to take user input and perform conversion
async function main() {
    let continueConversion = true;
    while (continueConversion) {
        const questions = [
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to convert:',
                validate: (value) => !isNaN(parseFloat(value)) || 'Please enter a valid number.',
            },
            {
                type: 'input',
                name: 'fromCurrency',
                message: 'Enter the currency code to convert from (e.g., USD):',
                validate: (value) => /^[A-Z]{3}$/.test(value) || 'Please enter a valid currency code (e.g., USD).',
            },
            {
                type: 'input',
                name: 'toCurrency',
                message: 'Enter the currency code to convert to (e.g., EUR):',
                validate: (value) => /^[A-Z]{3}$/.test(value) || 'Please enter a valid currency code (e.g., EUR).',
            },
            {
                type: 'confirm',
                name: 'anotherConversion',
                message: 'Do you want to perform another conversion?',
                default: false,
            },
        ];
        const answers = await inquirer_1.default.prompt(questions);
        const amount = parseFloat(answers.amount);
        const fromCurrency = answers.fromCurrency.toUpperCase();
        const toCurrency = answers.toCurrency.toUpperCase();
        try {
            const result = convertCurrency(amount, fromCurrency, toCurrency);
            console.log(`${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}`);
        }
        catch (error) {
            console.error(error.message);
        }
        continueConversion = answers.anotherConversion;
    }
}
main();
