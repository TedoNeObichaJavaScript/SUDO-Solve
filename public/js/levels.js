// ═══════════════════════════════════════════════════════════════
//  SUDO QUEST — Level Definitions
//  30 levels across 7 categories with 3-tier progressive hints
// ═══════════════════════════════════════════════════════════════

// ── Validation Helpers ──────────────────────────────────────────

function hasOutput(result, expected, caseSensitive = false) {
  const logs = result.consoleLogs || [];
  return logs.some(l =>
    caseSensitive ? l.includes(expected) : l.toLowerCase().includes(expected.toLowerCase())
  );
}

function outputEquals(result, expected) {
  const logs = result.consoleLogs || [];
  if (logs.length !== expected.length) return false;
  return expected.every((val, i) => String(logs[i]).trim() === String(val));
}

function hasVar(result, name, expected) {
  const v = result.variables;
  if (!(name in v)) return false;
  if (expected !== undefined) return v[name] === expected;
  return true;
}

function hasArrayVar(result, name, minLength) {
  const v = result.variables;
  if (!(name in v)) return false;
  if (!Array.isArray(v[name])) return false;
  if (minLength !== undefined && v[name].length < minLength) return false;
  return true;
}

function hasFunc(result, name) {
  return name in (result.functions || {});
}

function noErrors(result) {
  return !result.errors || result.errors.length === 0;
}

function codeIncludes(code, pattern) {
  if (typeof pattern === 'string') return code.includes(pattern);
  return pattern.test(code);
}

// ── Level Definitions ───────────────────────────────────────────

export const LEVELS = [

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: JavaScript Basics (1-5)  ║
  // ╚═══════════════════════════════════════╝

  {
    id: 1,
    title: 'Hello, World!',
    category: 'Basics',
    question: 'Use console.log() to print "Hello, World!" to the console.',
    hints: [
      'console.log() is a built-in function that prints output to the console.',
      'Put a string (text in quotes) inside the parentheses: console.log("...")',
      'console.log("Hello, World!")'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasOutput(result, 'Hello, World!')) return { passed: true };
      if (hasOutput(result, 'hello')) return { passed: false, feedback: 'Close! Make sure you print exactly "Hello, World!" with the comma and exclamation mark.' };
      return { passed: false, feedback: 'Use console.log() to print "Hello, World!" to the console.' };
    },
    successMessage: 'You just printed your first message! console.log() is one of the most useful tools in JavaScript.'
  },

  {
    id: 2,
    title: 'Declare a Variable',
    category: 'Basics',
    question: 'Create a variable called "hero" and set it to the string "Ada".',
    hints: [
      'Use the "let" keyword to declare a variable.',
      'Syntax: let variableName = "value"',
      'let hero = "Ada"'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasVar(result, 'hero', 'Ada')) return { passed: true };
      if (hasVar(result, 'hero')) return { passed: false, feedback: `Variable "hero" exists but its value should be "Ada", got "${result.variables.hero}".` };
      return { passed: false, feedback: 'Create a variable named "hero" and assign it the string "Ada".' };
    },
    successMessage: 'Variables store data for later use. "let" declares a variable that can be reassigned.'
  },

  {
    id: 3,
    title: 'Number Variable',
    category: 'Basics',
    question: 'Create a variable called "score" and set it to the number 100.',
    hints: [
      'Numbers don\'t need quotes — just assign the number directly.',
      'Syntax: let variableName = number',
      'let score = 100'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasVar(result, 'score', 100)) return { passed: true };
      if (hasVar(result, 'score')) return { passed: false, feedback: `Variable "score" should be the number 100, got ${result.variables.score}.` };
      return { passed: false, feedback: 'Create a variable named "score" set to the number 100.' };
    },
    successMessage: 'Numbers in JavaScript are written without quotes. "100" (string) is different from 100 (number).'
  },

  {
    id: 4,
    title: 'Basic Math',
    category: 'Basics',
    question: 'Calculate 42 * 2 and store the result in a variable called "result".',
    hints: [
      'Use the * operator for multiplication.',
      'Store the answer: let result = number * number',
      'let result = 42 * 2'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasVar(result, 'result', 84)) return { passed: true };
      if (hasVar(result, 'result')) return { passed: false, feedback: `Variable "result" should be 84, got ${result.variables.result}.` };
      return { passed: false, feedback: 'Create a variable "result" that stores the value of 42 * 2.' };
    },
    successMessage: 'JavaScript supports +, -, *, /, and % (modulo) for math operations.'
  },

  {
    id: 5,
    title: 'String Concatenation',
    category: 'Basics',
    question: 'Create a variable "greeting" by joining "Hello, " and "World!" using the + operator.',
    hints: [
      'Use the + operator to join (concatenate) strings together.',
      'let greeting = "first part" + "second part"',
      'let greeting = "Hello, " + "World!"'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      const g = result.variables.greeting;
      if (g && g.includes('Hello') && g.includes('World')) return { passed: true };
      if (hasVar(result, 'greeting')) return { passed: false, feedback: `Your greeting should contain "Hello" and "World". Got: "${g}"` };
      return { passed: false, feedback: 'Create a variable "greeting" using string concatenation with +.' };
    },
    successMessage: 'The + operator joins strings together. You can also use template literals (backticks) for more complex strings.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Conditions (6-9)         ║
  // ╚═══════════════════════════════════════╝

  {
    id: 6,
    title: 'If Statement',
    category: 'Conditions',
    question: 'Write an if statement that checks if 100 > 50, and if true, logs "victory".',
    hints: [
      'An if statement runs code only when a condition is true.',
      'Syntax: if (condition) { console.log("...") }',
      'if (100 > 50) { console.log("victory") }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, 'if')) return { passed: false, feedback: 'You need to use an if statement.' };
      if (hasOutput(result, 'victory')) return { passed: true };
      return { passed: false, feedback: 'Your if statement should log "victory" when the condition is true.' };
    },
    successMessage: 'If statements let your code make decisions. The code inside { } only runs when the condition is true.'
  },

  {
    id: 7,
    title: 'If-Else',
    category: 'Conditions',
    question: 'Write an if-else: if 3 > 10, log "yes", otherwise log "no".',
    hints: [
      'The "else" block runs when the if condition is false.',
      'Syntax: if (condition) { ... } else { ... }',
      'if (3 > 10) { console.log("yes") } else { console.log("no") }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, 'else')) return { passed: false, feedback: 'You need to use an else block.' };
      if (hasOutput(result, 'no')) return { passed: true };
      return { passed: false, feedback: 'Since 3 is NOT greater than 10, the else block should run and log "no".' };
    },
    successMessage: 'The else block is your fallback — it runs when the if condition is false.'
  },

  {
    id: 8,
    title: 'Strict Equality',
    category: 'Conditions',
    question: 'Check if "code" === "code" and if true, log "match".',
    hints: [
      'Use === (triple equals) to check if two values are exactly equal.',
      'Syntax: if (value1 === value2) { console.log("...") }',
      'if ("code" === "code") { console.log("match") }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '===')) return { passed: false, feedback: 'Use === (strict equality) for the comparison.' };
      if (hasOutput(result, 'match')) return { passed: true };
      return { passed: false, feedback: 'Compare "code" === "code" and log "match" when they are equal.' };
    },
    successMessage: 'Always prefer === over ==. Triple equals checks both value AND type, preventing subtle bugs.'
  },

  {
    id: 9,
    title: 'Logical AND',
    category: 'Conditions',
    question: 'Check if (true && true) is truthy, and log "both true".',
    hints: [
      'The && (AND) operator returns true only when BOTH sides are true.',
      'Syntax: if (condition1 && condition2) { ... }',
      'if (true && true) { console.log("both true") }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '&&')) return { passed: false, feedback: 'Use the && (AND) operator in your condition.' };
      if (hasOutput(result, 'both true')) return { passed: true };
      return { passed: false, feedback: 'Log "both true" when the AND condition is satisfied.' };
    },
    successMessage: 'Logical operators: && (AND), || (OR), ! (NOT). They combine conditions for complex logic.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Loops (10-13)            ║
  // ╚═══════════════════════════════════════╝

  {
    id: 10,
    title: 'For Loop',
    category: 'Loops',
    question: 'Write a for loop that prints numbers 1 through 5 using console.log().',
    hints: [
      'A for loop repeats code a specific number of times.',
      'Syntax: for (let i = start; i <= end; i++) { console.log(i) }',
      'for (let i = 1; i <= 5; i++) { console.log(i) }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, /for\s*\(/)) return { passed: false, feedback: 'You need to use a for loop.' };
      if (outputEquals(result, ['1', '2', '3', '4', '5'])) return { passed: true };
      const logs = result.consoleLogs || [];
      if (logs.length === 0) return { passed: false, feedback: 'Your loop didn\'t produce any output. Use console.log(i) inside the loop.' };
      return { passed: false, feedback: `Expected output: 1, 2, 3, 4, 5. Got: ${logs.join(', ')}` };
    },
    successMessage: 'For loops are perfect when you know exactly how many times to repeat. The three parts: init, condition, update.'
  },

  {
    id: 11,
    title: 'While Loop',
    category: 'Loops',
    question: 'Use a while loop to print numbers 1 through 3.',
    hints: [
      'A while loop repeats as long as its condition is true.',
      'Declare a counter first, then loop: let i = 1; while (i <= 3) { ...; i++ }',
      'let i = 1; while (i <= 3) { console.log(i); i++ }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, /while\s*\(/)) return { passed: false, feedback: 'You need to use a while loop.' };
      if (outputEquals(result, ['1', '2', '3'])) return { passed: true };
      const logs = result.consoleLogs || [];
      if (logs.length === 0) return { passed: false, feedback: 'Your loop didn\'t print anything. Use console.log() inside the loop.' };
      return { passed: false, feedback: `Expected output: 1, 2, 3. Got: ${logs.join(', ')}` };
    },
    successMessage: 'While loops are great when you don\'t know how many iterations you need. Don\'t forget to update the counter!'
  },

  {
    id: 12,
    title: 'Countdown',
    category: 'Loops',
    question: 'Use a for loop to count DOWN from 5 to 1 and print each number.',
    hints: [
      'Use i-- to decrease the counter each iteration.',
      'Start high, end low: for (let i = 5; i >= 1; i--)',
      'for (let i = 5; i >= 1; i--) { console.log(i) }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, /for\s*\(/)) return { passed: false, feedback: 'Use a for loop for this challenge.' };
      if (outputEquals(result, ['5', '4', '3', '2', '1'])) return { passed: true };
      const logs = result.consoleLogs || [];
      return { passed: false, feedback: `Expected countdown: 5, 4, 3, 2, 1. Got: ${logs.join(', ')}` };
    },
    successMessage: 'Loops can go in any direction! i++ counts up, i-- counts down.'
  },

  {
    id: 13,
    title: 'Loop Through Array',
    category: 'Loops',
    question: 'Create an array ["a", "b", "c"] and use a for...of loop to log each element.',
    hints: [
      'for...of loops through each element in an array directly.',
      'Syntax: for (let item of array) { console.log(item) }',
      'let arr = ["a", "b", "c"]; for (let x of arr) { console.log(x) }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (outputEquals(result, ['a', 'b', 'c'])) return { passed: true };
      const logs = result.consoleLogs || [];
      if (logs.length === 3) return { passed: false, feedback: `Expected: a, b, c. Got: ${logs.join(', ')}` };
      return { passed: false, feedback: 'Loop through the array ["a", "b", "c"] and log each element.' };
    },
    successMessage: 'for...of is the cleanest way to loop through arrays. Use for...in for object keys.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Arrays (14-17)           ║
  // ╚═══════════════════════════════════════╝

  {
    id: 14,
    title: 'Create an Array',
    category: 'Arrays',
    question: 'Create an array called "fruits" with three strings: "apple", "banana", "cherry".',
    hints: [
      'Arrays are created with square brackets and comma-separated values.',
      'Syntax: let arrayName = ["value1", "value2", "value3"]',
      'let fruits = ["apple", "banana", "cherry"]'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      const f = result.variables.fruits;
      if (Array.isArray(f) && f.length === 3 && f.includes('apple') && f.includes('banana') && f.includes('cherry')) {
        return { passed: true };
      }
      if (Array.isArray(f)) return { passed: false, feedback: `Your array should contain "apple", "banana", and "cherry". Got: [${f.join(', ')}]` };
      if (f !== undefined) return { passed: false, feedback: '"fruits" should be an array (use square brackets []).' };
      return { passed: false, feedback: 'Create a variable called "fruits" as an array with 3 string elements.' };
    },
    successMessage: 'Arrays store ordered lists of values. They can hold any type: strings, numbers, objects, even other arrays!'
  },

  {
    id: 15,
    title: 'Access Array Element',
    category: 'Arrays',
    question: 'Create an array ["cat", "dog", "fish"] and log the FIRST element (index 0).',
    hints: [
      'Array elements are accessed by index, starting at 0 (not 1).',
      'First element: arrayName[0]',
      'let pets = ["cat", "dog", "fish"]; console.log(pets[0])'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasOutput(result, 'cat', true)) return { passed: true };
      if (!codeIncludes(code, '[0]')) return { passed: false, feedback: 'Use [0] to access the first element of the array.' };
      return { passed: false, feedback: 'Create the array and log the first element. Arrays start at index 0.' };
    },
    successMessage: 'Array indexing starts at 0. So [0] is first, [1] is second, and so on.'
  },

  {
    id: 16,
    title: 'Array Push',
    category: 'Arrays',
    question: 'Create an array with ["a", "b"] and use .push() to add "c" to the end.',
    hints: [
      '.push() adds a new element to the end of an array.',
      'Syntax: arrayName.push(newElement)',
      'let arr = ["a", "b"]; arr.push("c")'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '.push(')) return { passed: false, feedback: 'Use the .push() method to add an element.' };
      // Check any array variable has 3+ elements with "c"
      for (const v of Object.values(result.variables)) {
        if (Array.isArray(v) && v.includes('c') && v.length >= 3) return { passed: true };
      }
      return { passed: false, feedback: 'After push, your array should contain ["a", "b", "c"].' };
    },
    successMessage: '.push() adds to the end, .pop() removes from the end. .unshift() and .shift() work on the beginning.'
  },

  {
    id: 17,
    title: 'Array Length',
    category: 'Arrays',
    question: 'Create an array with 4 elements and log its .length property.',
    hints: [
      'The .length property tells you how many elements are in an array.',
      'Syntax: console.log(arrayName.length)',
      'let arr = [1, 2, 3, 4]; console.log(arr.length)'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '.length')) return { passed: false, feedback: 'Use the .length property to get the array size.' };
      if (hasOutput(result, '4', true)) return { passed: true };
      const logs = result.consoleLogs || [];
      if (logs.length > 0) {
        const num = parseInt(logs[0]);
        if (num >= 4) return { passed: true };
        return { passed: false, feedback: `Your array needs at least 4 elements. Length is ${logs[0]}.` };
      }
      return { passed: false, feedback: 'Create an array with 4 elements and log its .length.' };
    },
    successMessage: '.length works on arrays and strings! "hello".length is 5.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Objects (18-20)          ║
  // ╚═══════════════════════════════════════╝

  {
    id: 18,
    title: 'Create an Object',
    category: 'Objects',
    question: 'Create an object called "user" with properties: name set to "Alex" and level set to 1.',
    hints: [
      'Objects use curly braces with key: value pairs separated by commas.',
      'Syntax: let obj = { key1: value1, key2: value2 }',
      'let user = { name: "Alex", level: 1 }'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      const u = result.variables.user;
      if (u && u.name === 'Alex' && u.level === 1) return { passed: true };
      if (u && typeof u === 'object') return { passed: false, feedback: `Object needs name: "Alex" and level: 1. Got: ${JSON.stringify(u)}` };
      return { passed: false, feedback: 'Create an object called "user" with name and level properties.' };
    },
    successMessage: 'Objects store key-value pairs. They\'re perfect for representing real-world things like users, products, etc.'
  },

  {
    id: 19,
    title: 'Access Object Property',
    category: 'Objects',
    question: 'Create a user object with name: "Alex", then log user.name.',
    hints: [
      'Access object properties with dot notation: object.property',
      'Syntax: console.log(objectName.propertyName)',
      'let user = { name: "Alex" }; console.log(user.name)'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasOutput(result, 'Alex', true)) return { passed: true };
      if (!codeIncludes(code, '.name')) return { passed: false, feedback: 'Use dot notation (object.name) to access the property.' };
      return { passed: false, feedback: 'Create the object and log its "name" property.' };
    },
    successMessage: 'Dot notation (obj.key) is the most common way. Bracket notation (obj["key"]) works too.'
  },

  {
    id: 20,
    title: 'Nested Objects',
    category: 'Objects',
    question: 'Create an object with a nested address: { city: "Tokyo" }. Then log the city.',
    hints: [
      'Objects can contain other objects as values.',
      'Access nested properties with chained dots: object.outer.inner',
      'let person = { address: { city: "Tokyo" } }; console.log(person.address.city)'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (hasOutput(result, 'Tokyo', true)) return { passed: true };
      return { passed: false, feedback: 'Create a nested object with address.city = "Tokyo" and log it.' };
    },
    successMessage: 'Nested objects are everywhere in real code — API responses, configs, DOM structures.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Functions (21-24)        ║
  // ╚═══════════════════════════════════════╝

  {
    id: 21,
    title: 'Declare a Function',
    category: 'Functions',
    question: 'Create a function called "greet" that logs "Hello!" when called. Then call it.',
    hints: [
      'Functions are blocks of reusable code declared with the "function" keyword.',
      'Syntax: function name() { code } — then call with name()',
      'function greet() { console.log("Hello!") }; greet()'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, /greet\s*\(\s*\)/)) return { passed: false, feedback: 'Don\'t forget to call the function: greet()' };
      if (hasOutput(result, 'Hello!')) return { passed: true };
      if (hasOutput(result, 'hello')) return { passed: true };
      if (hasFunc(result, 'greet')) return { passed: false, feedback: 'Function exists but didn\'t log "Hello!". Make sure to call it and log inside it.' };
      return { passed: false, feedback: 'Declare a function "greet" and call it to print "Hello!".' };
    },
    successMessage: 'Functions are the building blocks of any program. Define once, use many times!'
  },

  {
    id: 22,
    title: 'Return Value',
    category: 'Functions',
    question: 'Create a function "add" that takes a and b, returns a + b. Then log add(3, 7).',
    hints: [
      'Use "return" to send a value back from a function.',
      'Syntax: function name(params) { return value }',
      'function add(a, b) { return a + b }; console.log(add(3, 7))'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, 'return')) return { passed: false, feedback: 'Use "return" to send back the result from the function.' };
      if (hasOutput(result, '10')) return { passed: true };
      if (hasFunc(result, 'add') || codeIncludes(code, 'function add')) {
        return { passed: false, feedback: 'Function exists but output should be 10. Call it: console.log(add(3, 7))' };
      }
      return { passed: false, feedback: 'Create function add(a, b) that returns a + b, then log the result of add(3, 7).' };
    },
    successMessage: 'Return values let functions produce output. Without "return", a function returns undefined.'
  },

  {
    id: 23,
    title: 'Arrow Function',
    category: 'Functions',
    question: 'Create an arrow function "double" that takes n and returns n * 2. Log double(5).',
    hints: [
      'Arrow functions are a shorter syntax using =>',
      'Syntax: const name = (params) => expression',
      'const double = (n) => n * 2; console.log(double(5))'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '=>')) return { passed: false, feedback: 'Use the arrow syntax => to create the function.' };
      if (hasOutput(result, '10')) return { passed: true };
      return { passed: false, feedback: 'Create "double" as an arrow function returning n * 2, and log double(5). Expected output: 10.' };
    },
    successMessage: 'Arrow functions are concise. For single expressions, you can skip { } and "return".'
  },

  {
    id: 24,
    title: 'Callback Function',
    category: 'Functions',
    question: 'Create a function "repeat" that takes a function and calls it 3 times. Use it to log "hi" 3 times.',
    hints: [
      'Functions can be passed as arguments to other functions — these are called callbacks.',
      'Define repeat(fn) that calls fn() three times inside its body.',
      'function repeat(fn) { fn(); fn(); fn() }; repeat(() => console.log("hi"))'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      const logs = result.consoleLogs || [];
      if (logs.length === 3 && logs.every(l => l.toLowerCase() === 'hi')) return { passed: true };
      if (logs.length === 3) return { passed: true }; // Accept any 3 repeated values
      return { passed: false, feedback: `Should log "hi" exactly 3 times. Got ${logs.length} output(s): ${logs.join(', ')}` };
    },
    successMessage: 'Callbacks are powerful! They\'re used everywhere: event handlers, array methods, async code.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Advanced (25-27)         ║
  // ╚═══════════════════════════════════════╝

  {
    id: 25,
    title: 'Array Map',
    category: 'Advanced',
    question: 'Use .map() on [1, 2, 3] to double each number. Store the result in "doubled".',
    hints: [
      '.map() creates a new array by transforming each element.',
      'Syntax: let newArr = arr.map(item => transformation)',
      'let doubled = [1, 2, 3].map(n => n * 2)'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '.map(')) return { passed: false, feedback: 'Use the .map() method to transform the array.' };
      const d = result.variables.doubled;
      if (Array.isArray(d) && d.length === 3 && d[0] === 2 && d[1] === 4 && d[2] === 6) return { passed: true };
      if (Array.isArray(d)) return { passed: false, feedback: `Expected [2, 4, 6]. Got [${d.join(', ')}]` };
      return { passed: false, feedback: 'Store the mapped result in a variable called "doubled".' };
    },
    successMessage: '.map() is pure — it returns a NEW array and doesn\'t modify the original.'
  },

  {
    id: 26,
    title: 'Array Filter',
    category: 'Advanced',
    question: 'Use .filter() on [1, 2, 3, 4, 5] to keep only even numbers. Store in "evens".',
    hints: [
      '.filter() creates a new array with only elements that pass a test.',
      'Even check: n % 2 === 0 (modulo returns 0 for even numbers)',
      'let evens = [1, 2, 3, 4, 5].filter(n => n % 2 === 0)'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '.filter(')) return { passed: false, feedback: 'Use the .filter() method.' };
      const e = result.variables.evens;
      if (Array.isArray(e) && e.length === 2 && e[0] === 2 && e[1] === 4) return { passed: true };
      if (Array.isArray(e)) return { passed: false, feedback: `Expected [2, 4]. Got [${e.join(', ')}]` };
      return { passed: false, feedback: 'Store the filtered result in a variable called "evens".' };
    },
    successMessage: '.filter() keeps elements that return true. Combined with .map(), you can transform any data.'
  },

  {
    id: 27,
    title: 'Ternary Operator',
    category: 'Advanced',
    question: 'Set score = 75. Use a ternary to set status: "pass" if score > 50, else "fail".',
    hints: [
      'The ternary operator is a one-line if-else: condition ? ifTrue : ifFalse',
      'Syntax: let variable = condition ? valueIfTrue : valueIfFalse',
      'let score = 75; let status = score > 50 ? "pass" : "fail"'
    ],
    type: 'js',
    validate: (code, result) => {
      if (!noErrors(result)) return { passed: false, feedback: `Error: ${result.errors[0]}` };
      if (!codeIncludes(code, '?')) return { passed: false, feedback: 'Use the ternary operator (?) for this challenge.' };
      if (hasVar(result, 'status', 'pass')) return { passed: true };
      if (hasVar(result, 'status', 'fail')) return { passed: false, feedback: 'Status is "fail" — make sure score is 75 (which IS > 50, so status should be "pass").' };
      if (hasVar(result, 'status')) return { passed: false, feedback: `Status should be "pass". Got: "${result.variables.status}"` };
      return { passed: false, feedback: 'Create variables "score" (75) and "status" (using ternary).' };
    },
    successMessage: 'Ternaries are great for simple conditional assignments. For complex logic, stick with if-else.'
  },

  // ╔═══════════════════════════════════════╗
  // ║   CATEGORY: Git (28-30)              ║
  // ╚═══════════════════════════════════════╝

  {
    id: 28,
    title: 'Git Init',
    category: 'Git',
    question: 'Initialize a new Git repository using the git init command.',
    hints: [
      'git init creates a new Git repository in the current directory.',
      'Type the command directly — no JavaScript needed here!',
      'git init'
    ],
    type: 'git',
    validate: (gitState) => {
      if (gitState.initialized) return { passed: true };
      return { passed: false, feedback: 'Type "git init" to initialize a Git repository.' };
    },
    successMessage: 'git init creates a hidden .git folder that tracks all your changes. Every project starts here!'
  },

  {
    id: 29,
    title: 'Git Commit',
    category: 'Git',
    question: 'Create a file "hello.txt", stage it with git add, and commit with message "first commit".',
    hints: [
      'This is a 3-step process: create file, stage it, then commit. Type one command at a time.',
      'Step 1: echo "hello" > hello.txt | Step 2: git add hello.txt | Step 3: git commit -m "first commit"',
      'Type each command one at a time: echo "hello" > hello.txt, then git add hello.txt, then git commit -m "first commit"'
    ],
    type: 'git',
    validate: (gitState) => {
      const checks = [];
      if (!gitState.initialized) checks.push('Initialize repo first: git init');
      if (!gitState._fileCreated) checks.push('Create a file: echo "hello" > hello.txt');
      if (!gitState._fileStaged) checks.push('Stage the file: git add hello.txt');
      if (!gitState._committed) checks.push('Commit: git commit -m "first commit"');

      if (checks.length === 0) return { passed: true };
      return { passed: false, feedback: checks[0] };
    },
    successMessage: 'The Git workflow: make changes → stage (git add) → commit (git commit). Repeat!'
  },

  {
    id: 30,
    title: 'Git Branch',
    category: 'Git',
    question: 'After committing, create a branch called "feature" and switch to it.',
    hints: [
      'Use "git branch name" to create a new branch, "git checkout name" to switch to it.',
      'Two steps: git branch feature, then git checkout feature. Or combine: git checkout -b feature',
      'git branch feature, then git checkout feature (or: git checkout -b feature)'
    ],
    type: 'git',
    validate: (gitState) => {
      if (!gitState.initialized) return { passed: false, feedback: 'Initialize repo first: git init' };
      if (!gitState._committed) return { passed: false, feedback: 'You need at least one commit before branching. Complete the previous steps first.' };
      if (!gitState.branches || !gitState.branches.feature) return { passed: false, feedback: 'Create the "feature" branch: git branch feature' };
      if (gitState.currentBranch !== 'feature') return { passed: false, feedback: 'Switch to the "feature" branch: git checkout feature' };
      return { passed: true };
    },
    successMessage: 'Branches let you work on features independently. Merge them back when done. This is how teams collaborate!'
  }
];

export function getLevelById(id) {
  return LEVELS.find(l => l.id === id) || null;
}

export function getCategories() {
  const cats = [];
  const seen = new Set();
  for (const level of LEVELS) {
    if (!seen.has(level.category)) {
      seen.add(level.category);
      cats.push(level.category);
    }
  }
  return cats;
}

export function getLevelsByCategory(category) {
  return LEVELS.filter(l => l.category === category);
}

export const TOTAL_LEVELS = LEVELS.length;
