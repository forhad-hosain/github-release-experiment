function greet(name) {
  return `Hello, ${name}! Welcome to github-release-consumer.`;
}
function formatDate(date = /* @__PURE__ */ new Date(), format = "long") {
  switch (format) {
    case "short":
      return date.toLocaleDateString();
    case "iso":
      return date.toISOString();
    case "long":
    default:
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
  }
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

export { Calculator, index as default, formatDate, greet };
//# sourceMappingURL=index.js.map
