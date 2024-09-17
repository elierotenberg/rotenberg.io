---
slug: typescript-curry-howard
title: "TypeScript and the Curry-Howard Correspondence: Unveiling the Logic in Your Code"
date: "2024-09-17T08:15:46.391Z"
status: published
lang: en
tags:
  - typescript
  - logic
abstract: >
  TypeScript, with its robust static type system, has become an indispensable tool for developers seeking to bring clarity and safety to JavaScript applications. But beyond catching typos and ensuring interface compliance, there's a fascinating theoretical foundation that connects programming with logic: the Curry-Howard correspondence.
cover: /media/blog/typescript-curry-howard/curry-howard.jpg
---

TypeScript, with its robust static type system, has become an indispensable tool for developers seeking to bring clarity and safety to JavaScript applications. But beyond catching typos and ensuring interface compliance, there's a fascinating theoretical foundation that connects programming with logic: the [Curry-Howard correspondence](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence). This profound concept reveals that when you write well-typed programs, you're engaging in a form of logical reasoning.

In this post, we'll delve into the Curry-Howard correspondence, explore how it manifests in TypeScript, and illustrate it with simple mathematical examples. We'll see how utilizing types effectively can help "prove" aspects of your code's correctness—even though [TypeScript's type system isn't sound](https://github.com/Microsoft/TypeScript/wiki/FAQ#type-system-behavior).

---

## The Essence of the Curry-Howard Correspondence

At its core, the Curry-Howard correspondence establishes a deep relationship between logic and computation. It posits a direct analogy:

- **Types are Propositions**: Types represent logical assertions or propositions about the values in your program.
- **Programs are Proofs**: Implementations of functions serve as proofs of the propositions declared by their types.

In other words, writing code that adheres to type definitions is akin to constructing a logical proof. This concept bridges mathematical logic and programming, offering a powerful lens through which to understand software development.

---

## Applying Curry-Howard in TypeScript: Simple Mathematical Examples

While languages like Haskell or Idris are often highlighted in discussions about Curry-Howard due to their strong, sound type systems, TypeScript provides enough features to appreciate and utilize this correspondence. By thoughtfully designing your types and functions, you can encode logical assertions into your code.

Let's explore this with simple mathematical examples.

### Example 1: Safe Division (Preventing Division by Zero)

#### Mathematical Proposition

In arithmetic, division by zero is undefined. We can express the proposition:

- **Proposition**: Given a non-zero number `b`, the division `a / b` is defined.

#### TypeScript Analogue

We can represent this proposition using TypeScript's types to ensure that division by zero cannot occur.

**Defining a NonZeroNumber Type**

```ts
type NonZeroNumber = number & { readonly __nonZero__: unique symbol };
```

Here, `NonZeroNumber` is a branded type that extends `number`, but with an additional unique symbol to distinguish it. This prevents any regular `number` from being used where a `NonZeroNumber` is required.

**Creating a Function to "Prove" a Number is Non-Zero**

```ts
function makeNonZeroNumber(n: number): NonZeroNumber {
  if (n !== 0) {
    return n as NonZeroNumber;
  } else {
    throw new Error("Number must not be zero");
  }
}
```

The `makeNonZeroNumber` function checks at runtime that the number is not zero. If it's not, it casts the number to `NonZeroNumber`, effectively serving as a proof that `n` is non-zero.

**Implementing Safe Division**

```ts
function divide(a: number, b: NonZeroNumber): number {
  return a / b;
}
```

By typing the `b` parameter as `NonZeroNumber`, we enforce that `divide` cannot be called with zero as the denominator.

**Usage**

```typescript
const numerator = 10;
const denominator = makeNonZeroNumber(2);

const result = divide(numerator, denominator); // Result is 5

// Attempting to create a NonZeroNumber with zero will throw an error
const zeroDenominator = makeNonZeroNumber(0); // Throws Error: Number must not be zero
```

**Curry-Howard Perspective**

- **Type (Proposition)**: `NonZeroNumber` represents the proposition "this number is not zero."
- **Function (Proof)**: `makeNonZeroNumber` is the proof that a given `number` is indeed non-zero.
- **Program Correctness**: By using `NonZeroNumber`, we ensure that `divide` cannot receive zero as the denominator, preventing a runtime error.

### Example 2: Positive Numbers and Square Roots

#### Mathematical Proposition

The square root function is defined for non-negative real numbers.

- **Proposition**: Given a non-negative number `n`, the square root `√n` is defined.

#### TypeScript Analogue

We can define a type for non-negative numbers and ensure that only such numbers are passed to the `sqrt` function.

**Defining a NonNegativeNumber Type**

```typescript
type NonNegativeNumber = number & { readonly __nonNegative__: unique symbol };
```

**Creating a Function to "Prove" a Number is Non-Negative**

```typescript
function makeNonNegativeNumber(n: number): NonNegativeNumber {
  if (n >= 0) {
    return n as NonNegativeNumber;
  } else {
    throw new Error("Number must be non-negative");
  }
}
```

**Implementing Safe Square Root**

```typescript
function sqrt(n: NonNegativeNumber): number {
  return Math.sqrt(n);
}
```

**Usage**

```typescript
const positiveNumber = makeNonNegativeNumber(9);
const result = sqrt(positiveNumber); // Result is 3

const negativeNumber = -4;
// const invalidNumber = makeNonNegativeNumber(negativeNumber); // Throws Error: Number must be non-negative
```

**Curry-Howard Perspective**

- **Type (Proposition)**: `NonNegativeNumber` represents the proposition "this number is non-negative."
- **Function (Proof)**: `makeNonNegativeNumber` is the proof that a given `number` is non-negative.
- **Program Correctness**: By enforcing the use of `NonNegativeNumber`, we prevent invalid inputs to `sqrt`, ensuring correctness.

### Example 3: The Associative Property of Addition

#### Mathematical Theorem

Addition of numbers is associative.

- **Theorem**: For all numbers `a`, `b`, `c`, the equation `(a + b) + c = a + (b + c)` holds.

#### TypeScript Analogue

While we can't enforce numerical equality at the type level, we can use TypeScript to model this property with arrays and concatenation, where types can represent the lengths of arrays.

**Defining Length-Encoded Tuples**

TypeScript allows us to define tuple types of specific lengths.

```typescript
type TupleOfLength<
  N extends number,
  T extends any[] = [],
> = T["length"] extends N ? T : TupleOfLength<N, [...T, any]>;
```

This recursive type creates a tuple of length `N`.

**Demonstrating Associativity with Tuples**

Consider tuples representing numbers through their lengths.

```typescript
type Two = TupleOfLength<2>; // [any, any]
type Three = TupleOfLength<3>; // [any, any, any]
```

**Defining Addition as Concatenation**

```typescript
type Add<A extends any[], B extends any[]> = [...A, ...B];
```

**Associative Property Implementation**

```typescript
type LeftAssociative = Add<Add<Two, Three>, TupleOfLength<4>>; // [(5 items)...]
type RightAssociative = Add<Two, Add<Three, TupleOfLength<4>>>; // [(5 items)...]

type AssociativeEquality = LeftAssociative extends RightAssociative
  ? RightAssociative extends LeftAssociative
    ? true
    : false
  : false;
```

**Result**

```typescript
type IsAssociative = AssociativeEquality; // true
```

**Curry-Howard Perspective**

- **Types (Propositions)**: Tuples with specific lengths represent numbers; operations on them represent arithmetic properties.
- **Type Equality (Proof)**: The fact that `LeftAssociative` and `RightAssociative` are the same type proves the associativity of addition at the type level.
- **Program Correctness**: By modeling arithmetic properties with types, we can leverage the compiler to verify these properties.

**Limitations**

This approach is limited by TypeScript's ability to handle recursive types and the depth of type computations. However, it illustrates how types can represent mathematical properties.

---

## Using Types to Ensure Correctness

By leveraging TypeScript's type system, you can encode invariants and constraints directly into your code, allowing the compiler to enforce correctness.

### Type Guards and Refinements

Type guards are functions that refine types at runtime, enabling safer code.

```typescript
function isNonNegativeNumber(value: number): value is NonNegativeNumber {
  return value >= 0;
}

function safeSqrt(value: number): number {
  if (isNonNegativeNumber(value)) {
    return sqrt(value); // `value` is now of type `NonNegativeNumber`
  }
  throw new Error("Value must be non-negative");
}
```

Here, `isNonNegativeNumber` serves as a predicate that, if true, refines the type of `value` to `NonNegativeNumber`.

### Encoding Business Rules

You can use types to encode business logic constraints, ensuring that only valid states are representable.

**Example: Order Processing Workflow**

```typescript
type NewOrder = { state: "new"; items: string[] };
type PaidOrder = { state: "paid"; items: string[]; paymentDate: Date };
type ShippedOrder = { state: "shipped"; items: string[]; shipmentDate: Date };

type Order = NewOrder | PaidOrder | ShippedOrder;

function pay(order: NewOrder): PaidOrder {
  // Process payment
  return {
    ...order,
    state: "paid",
    paymentDate: new Date(),
  };
}

function ship(order: PaidOrder): ShippedOrder {
  // Arrange shipment
  return {
    ...order,
    state: "shipped",
    shipmentDate: new Date(),
  };
}
```

By defining specific types for each state, we prevent invalid transitions at compile time.

**Incorrect Usage Caught by TypeScript**

```typescript
const newOrder: NewOrder = { state: "new", items: ["item1", "item2"] };
// const invalidShipment = ship(newOrder); // Error: Argument of type 'NewOrder' is not assignable to parameter of type 'PaidOrder'

// Correct sequence
const paidOrder = pay(newOrder);
const shippedOrder = ship(paidOrder);
```

The type system enforces the correct sequence of operations, acting as a proof that only valid transitions are allowed.

---

## Recognizing TypeScript's Limitations

While the Curry-Howard correspondence offers a powerful perspective, it's important to acknowledge that TypeScript's type system is not [sound](https://en.wikipedia.org/wiki/Soundness). In fact, [soundness is an explicit non-goal of TypeScript](https://www.typescriptlang.org/play/?strictFunctionTypes=false).

This means that the type system accepts programs, or more precisely program typings, that are not provably correct.

This is especially true when using certain features that introduce inconsistencies between the type system and runtime behavior.

### Type Assertions and Unsoundness

Type assertions (`as`) and the `any` type allow you to override the compiler's type inference, potentially leading to runtime errors:

```typescript
function unsafeCast<T>(value: any): T {
  return value as T;
}

const value: number = unsafeCast<string>("not a number"); // Runtime error if used as a number
```

Using `unsafeCast`, you might assign a value of one type to an incompatible type without any compile-time errors, breaking the correspondence between types and logical propositions.

### Structural Typing and Excess Properties

TypeScript's structural typing system can also lead to scenarios where types behave in unexpected ways:

```typescript
interface Point {
  x: number;
  y: number;
}

const point3D = { x: 0, y: 0, z: 0 };

const point2D: Point = point3D; // Valid due to structural typing
```

While practical, this flexibility can complicate the direct mapping of types to logical propositions, as the extra properties are ignored by the type system.

---

## Embracing Type-Driven Development in TypeScript

Despite these limitations, adopting a type-driven approach can significantly improve your code quality.

- **Modeling Invariants**: Use types to represent the invariants and constraints in your domain. For instance, prefer more precise types over general ones when appropriate.

- **Avoiding `any` and Assertions**: Limit the use of `any` and type assertions to the boundaries of your system (e.g., interfacing with third-party libraries or APIs).

- **Using Type Guards**: Implement type guards to refine types at runtime safely.

- **Leveraging Advanced Types**: Explore advanced TypeScript features like conditional types, intersection types, and mapped types to capture complex relationships.

By considering types as propositions and your code as proofs, you foster a mindset that values correctness and clarity.

---

## Conclusion

Programming languages, including TypeScript and its type system, are built upon [Programming language theory](https://en.wikipedia.org/wiki/Programming_language_theory), a field that is at least as old, and to some extent even _predates_ programming and computers. As a matter of fact, the pioneers that envisionned and developed what would eventually become modern computers were mathematicians and more specifically _logicians_, like Turing, Gödel, and others. It is not by accident that their is a profound link between programming and mathematical proofs.

While it is unlikely that we would ever use the correspondence directly in practice, it highlights that type systems, including TypeScript's, are tools that try to "prove" some invariants about our code. It will not catch all bugs - even if TypeScript type system were sound, we would still hit the [undecidability](https://en.wikipedia.org/wiki/Undecidable_problem) and [halting problems](https://en.wikipedia.org/wiki/Halting_problem) (a topic for another blog post) - but it certainly tries very hard to detect many errors statically, giving us more confidence even before we hit the F5 button.

## Further reading

- [Howard on Curry-Howard](https://wadler.blogspot.com/2014/08/howard-on-curry-howard.html)
- [Entscheidungsproblem](https://en.wikipedia.org/wiki/Entscheidungsproblem)
- [TypeScript FAQ - Type System Behavior](https://github.com/Microsoft/TypeScript/wiki/FAQ#type-system-behavior)
