function greet(name) {
  return `Hello, ${name}! Welcome to github-release-consumer.`;
}
class Calculator {
  /**
   * Add two numbers
   */
  add(a, b) {
    return a + b;
  }
  /**
   * Subtract two numbers
   */
  subtract(a, b) {
    return a - b;
  }
  /**
   * Multiply two numbers
   */
  multiply(a, b) {
    return a * b;
  }
  /**
   * Divide two numbers
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return a / b;
  }
}
var index = new Calculator();

export { Calculator, index as default, greet };
//# sourceMappingURL=index.js.map
