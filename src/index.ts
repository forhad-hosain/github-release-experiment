/**
 * Main entry point for github-release-consumer
 * This module exports utilities and functions for testing deployment
 */

/**
 * Greet function - returns a greeting message
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  return `Hello, ${name}! Welcome to github-release-consumer.`
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
