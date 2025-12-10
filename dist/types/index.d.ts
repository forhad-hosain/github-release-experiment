/**
 * Main entry point for github-release-consumer
 * This module exports utilities and functions for testing deployment
 */
/**
 * Greet function - returns a greeting message
 * @param name - The name to greet
 * @returns A greeting message
 */
export declare function greet(name: string): string;
/**
 * Format a date object to a readable string
 * @param date - The date to format (defaults to current date)
 * @param format - The format type: 'short', 'long', or 'iso' (default: 'long')
 * @returns A formatted date string
 */
export declare function formatDate(date?: Date, format?: "short" | "long" | "iso"): string;
/**
 * Calculator class for basic math operations
 */
export declare class Calculator {
    /**
     * Add two numbers
     */
    add(a: number, b: number): number;
    /**
     * Subtract two numbers
     */
    subtract(a: number, b: number): number;
    /**
     * Multiply two numbers
     */
    multiply(a: number, b: number): number;
    /**
     * Divide two numbers
     */
    divide(a: number, b: number): number;
}
/**
 * Default export - Calculator instance
 */
declare const _default: Calculator;
export default _default;
//# sourceMappingURL=index.d.ts.map