/**
 * Main entry point for github-actions-exp
 * This module exports utilities and functions for testing deployment
 */

/**
 * Greet function - returns a greeting message
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to github-actions-exp.`
}

/**
 * Format a date object to a readable string
 * @param date - The date to format (defaults to current date)
 * @param format - The format type: 'short', 'long', or 'iso' (default: 'long')
 * @returns A formatted date string
 */
export function formatDate(
  date: Date = new Date(),
  format: "short" | "long" | "iso" = "long"
): string {
  switch (format) {
    case "short":
      return date.toLocaleDateString()
    case "iso":
      return date.toISOString()
    case "long":
    default:
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
  }
}

/**
 * Calculator class for basic math operations
 */
export class Calculator {
  /**
   * Add two numbers
   */
  add(a: number, b: number): number {
    return a + b
  }

  /**
   * Subtract two numbers
   */
  subtract(a: number, b: number): number {
    return a - b
  }

  /**
   * Multiply two numbers
   */
  multiply(a: number, b: number): number {
    return a * b
  }

  /**
   * Divide two numbers
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed")
    }
    return a / b
  }
}

/**
 * Default export - Calculator instance
 */
export default new Calculator()
