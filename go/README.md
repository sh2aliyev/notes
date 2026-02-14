<p align="center">
  <img src="./logo.png" height="150">
</p>

<h1 align="center">Go</h1>

<p align="center">
  Go is a high-level general purpose programming language that is statically typed and compiled.
</p>

<p align="right">
  <a href="../#tech-stack">Main Page ↖</a>
</p>

### Contents

1. [Understanding Go](#-understanding-go)
   - [Essentials](#-essentials)
     - [Packages](#-packages)
     - [Modules](#-modules)
   - [Go CLI](#-go-cli)
     - [Module and Dependency Management](#-module-and-dependency-management)
     - [Running & Building](#-running--building)
   - [Project Structure Examples](#-project-structure-examples)
     - [#1. An executable Go project with no extra packages.](#-1-an-executable-go-project-with-no-extra-packages)
     - [#2. An executable Go project with extra nested packages.](#-2-an-executable-go-project-with-extra-nested-packages)
     - [#3. A separate non-executable Go library project.](#-3-a-separate-non-executable-go-library-project)
2. [Methods](#-methods)
3. [Generics](#-generics)
4. [Interfaces](#-interfaces)
   - [Interface Composition](#-interface-composition)
5. [Concurrency](#-concurrency)
   - [Goroutines](#-goroutines)
     - [`WaitGroup`](#-waitgroup)
   - [Channels](#-channels)
     - [Buffered Channels](#-buffered-channels)
     - [Channel Status](#-channel-status)
     - [The `select` Statement](#-the-select-statement)
     - [Read-Only and Write-Only Channels](#-read-only-and-write-only-channels)
     - [The "Done Channel" Pattern](#-the-done-channel-pattern)

<br>

---

## 🔶 Understanding Go

### 🔷 Essentials

#### 🔻 Packages

In Go, code is organized into packages. A package is a collection of Go files in the same directory that are compiled together. Each Go file starts with a package statement that defines the package it belongs to.

There are two types of packages:

- Main package:
  > Files with the `package main` statement define a main package. The main package must contain a `main()` function, which is the starting point of the application.
- Library package:
  > Files with a package statement other than `main` define a library package. Library packages can be imported and used by other packages. These packages are used to organize code into reusable components.

> [!NOTE]
> Only the main package can be executed directly as a standalone program. Library packages can not run on their own. They are meant to be imported and used by other packages.

<br>

#### 🔻 Modules

A module is a collection of related Go packages. It is defined by a go.mod file, which specifies the module's name/path and its dependencies.

<br>

### 🔷 Go CLI

#### 🔻 Module and Dependency Management

- `go mod init <module-name>`: Initialize a new Go module.
  > Creates a `go.mod` file to manage dependencies.
  >
  > The module name should match the intended import path. Usually, it is the URL of the repository where the module is being hosted (`go mod init github.com/user/repo`).
- `go mod tidy`: Clean and verify dependencies.
  > Adds missing dependencies required by the code and removes unused ones.
  >
  > Updates `go.mod` and `go.sum` to accurately reflect the actual imports in use.
- `go get <module>@version`: Update a dependency.
  > Downloads a module and updates it to the specified version.
  >
  > Updates `go.mod` and `go.sum` accordingly.
- `go clean -modcache`: Clear the local module cache.
  > Deletes all downloaded modules from the module cache directory (`$GOPATH/pkg/mod`).

<br>

#### 🔻 Running & Building

- `go run <file>...`: Compile and execute code directly.
  > Compiles and runs the specified Go files.
- `go build`: Compile code into a binary.
  > Builds the Go source files in the current directory and produces an executable.
  >
  > If the package does not include a `main()` function, no binary will be created.
- `go install <module>`: Install a binary.
  > Installs the specified module as a binary in the `$GOPATH/bin` directory.

<br>

### 🔷 Project Structure Examples

#### 🔻 #1. An executable Go project with no extra packages.

1. Create a directory called `myapp`.
2. Initialize a project (module):
   ```sh
   go mod init github.com/username/myapp
   ```
3. Create a `main.go` file:

   ```go
   package main

   import "fmt"

   func main() {
   	fmt.Println("Hello, World!")
   }
   ```

4. Create a different Go file (called `calculate.go`) under the same package:

   ```go
   package main

   func add(a, b int) int {
   	return a + b
   }

   func subtract(a, b int) int {
   	return a - b
   }
   ```

5. Update the `main.go` file to use the functions defined in `calculate.go`:

   > You don't need to import the functions if they are defined in the same package. They are already part of the package.

   ```go
   package main

   import "fmt"

   func main() {
   	fmt.Println(add(1, 2))      // 3
   	fmt.Println(subtract(5, 3)) // 2
   }
   ```

> Overall directory structure:
>
> ```sh
> myapp/
>   ├── go.mod
>   ├── main.go
>   └── calculate.go
> ```

> [!NOTE]
> A folder can only have files that belong to the same package.

> [!NOTE]
> You cannot have multiple functions with the same name under a single package, even if they are in different files.

<br>

#### 🔻 #2. An executable Go project with extra nested packages.

> Overall directory structure:
>
> ```sh
> myapp/
>   ├── go.mod
>   ├── main.go
>   └── calculate/
>           ├── basic.go
>           └── advanced.go
> ```
>
> The `go.mod` file remains in the root directory and handles the dependencies for the entire project. You don't need separate `go.mod` files for nested packages.

1. main.go:

   > You need to import the nested packages because they are not part of the importing package (`main` in this case).

   > When you import nested packages, you need to use their full paths relative to the module path. `github.com/username/myapp` -> `/calculate` = `github.com/username/myapp/calculate`.

   ```go
   package main

   import (
   	"fmt"

   	"github.com/username/myapp/calculate"
   )

   func main() {
   	fmt.Println(calculate.Add(1, 2))      // 3
   	fmt.Println(calculate.Subtract(5, 3)) // 2

   	fmt.Println(calculate.Square(5))      // 25
   	fmt.Println(calculate.SquareRoot(25)) // 5
   }
   ```

2. calculate/
   - basic.go:

     ```go
     package calculate

     func Add(a, b int) int {
     	return a + b
     }

     func Subtract(a, b int) int {
     	return a - b
     }
     ```

   - advanced.go:

     ```go
     package calculate

     import "math"

     func Square(x int) int {
     	return x * x
     }

     func SquareRoot(x int) float64 {
     	return math.Sqrt(float64(x))
     }
     ```

> [!IMPORTANT]
> In Go, only identifiers (variables, fields, functions, types etc.) that start with an uppercase letter are exported and can be accessed from other packages.

<br>

#### 🔻 #3. A separate non-executable Go library project.

> Overall directory structure:
>
> ```sh
> mylib/
>   ├── go.mod
>   ├── mylib.go
>   └── generate/
>           ├── name.go
>           └── surname.go
> ```

1. Create a directory called `mylib` for the library project.
2. Initializing a library module:
   ```sh
   go mod init github.com/username/mylib
   ```
3. mylib.go:

   ```go
   package mylib

   import (
   	"fmt"

   	"github.com/username/mylib/generate"
   )

   func SayHi() {
   	fmt.Printf("Hi %s!\n", generate.Name())
   }

   func SayBye() {
   	fmt.Printf("Bye %s!\n", generate.Surname())
   }

   func GetFullName() string {
   	return fmt.Sprintf("%s %s", generate.Name(), generate.Surname())
   }
   ```

4. generate/:
   - name.go:

     ```go
     package generate

     func Name() string {
     	return "John"
     }
     ```

   - surname.go:

     ```go
     package generate

     func Surname() string {
     	return "Doe"
     }
     ```

<br>

---

Todo:

> #4. Using an external library/package in a Go project.

<p align="right">
    <a href="#go">back to top ⬆</a>
</p>

<br>
<br>

## 🔶 Methods

In Go, methods are functions that are associated with a specific type. This means that you can attach methods to a named type and call them on instances of that type.

> [!NOTE]
> You can only define methods on named types. Defining methods directly on unnamed or literal types like `[]int` or `map[string]int` is not allowed.
>
> A named type is any type that you define using the `type` keyword and assign an explicit name to.
>
> ```go
> type MyInt int
> ```
>
> ```go
> type Person struct {
>  name string
>  age  int
> }
> ```

<br>

Syntax:

> ```go
> func (receiver TypeName) MethodName(parameters) returnType {
>    // method body
> }
> ```
>
> - `receiver`: The variable name that represents the instance the method is being called on.
> - `TypeName`: The type the method is attached to.
> - `MethodName`: The name of the method being defined.
> - `parameters`: Optional arguments the method accepts.
> - `returnType`: The type of value the method returns.

<br>

- Defining a method:

  ```go
  type person struct {
  	name string
  	age  int
  }

  func (p person) sayHello() {
  	fmt.Println("Hello, my name is " + p.name)
  }
  ```

- Calling a method:
  ```go
  user := person{name: "John", age: 35}
  user.sayHello() // Hello, my name is John
  ```

<br>

> [!NOTE]
> When manipulating data through a method, we need to use pointers because of the `pass-by-value` rule.
>
> ```go
> func (p *person) changeName(name string) {
> 	p.name = name
> 	// (*p).name = name // This is also valid, but unnecessary in Go.
> 	// Go simplifies pointer access for structs by dereferencing p behind the scenes.
> }
>
> func main() {
> 	user := person{name: "John", age: 35}
>
> 	user.sayHello() // Hello, my name is John
>
> 	user.changeName("Sha'an")
>
> 	user.sayHello() // Hello, my name is Sha'an
> }
> ```
>
> Another example (not a struct):
>
> ```go
> type myCounter int
>
> func (mc *myCounter) increment() {
> 	*mc++
> }
>
> func main() {
> 	count := myCounter(0)
>
> 	count.increment()
> 	count.increment()
>
> 	fmt.Printf("count: %v\n", count) // count: 2
> }
> ```

<p align="right">
    <a href="#go">back to top ⬆</a>
</p>

<br>
<br>

## 🔶 Generics

Generics in Go are a way to write reusable code that can work with different types. Instead of writing multiple versions of a function for different data types, you can write one generic function that works with any type.

> Generics maintain type safety by allowing the compiler to check types at compile-time. This prevents many types of runtime errors.

Syntax:

> ```go
> func myFunc[T any](input T) T {
> 	return input
> }
> ```
>
> The type parameters are enclosed in square brackets `[]` and come after the function name.
>
> - Type Parameter:
>   > `T` is a type parameter that can represent any type. You can name it anything, but `T` is commonly used.
> - Constraint:
>   > The `any` constraint means that `T` can be any type (`any` is a shorthand for `interface{}`).

<br>

Example 1:

- Without Generics:

  ```go
  func main() {
  	fmt.Println(addInts(1, 2))       // 3
  	fmt.Println(addFloats(1.5, 2.3)) // 3.8

  }

  func addInts(a, b int) int {
  	return a + b
  }

  func addFloats(a, b float64) float64 {
  	return a + b
  }
  ```

- With Generics:

  ```go
  func main() {
  	fmt.Println(add(1, 2))     // 3
  	fmt.Println(add(1.5, 2.3)) // 3.8

  }

  // Using | specifies a union of the two types, meaning that this constraint allows either type.
  func add[T int | float64](a T, b T) T {
  	return a + b
  }
  ```

<br>

Example 2:

```go
func main() {
	fmt.Println(swap(5, 10))            // 10, 5
	fmt.Println(swap(2.5, 5.2))         // 5.2, 2.5
	fmt.Println(swap("Hello", "World")) // "World", "Hello"
}

func swap[T any](a, b T) (T, T) {
	return b, a
}
```

<br>

Example 3:

```go
func main() {
	fmt.Println(swap(2.5, 5))      // 5, 2.5
	fmt.Println(swap("Hello", 99)) // 99, "Hello"
}

func swap[T any, U any](a T, b U) (U, T) {
	return b, a
}
```

<br>

Example 4:

```go
type Number interface {
	int | float64
}

func multiply[T Number](a, b T) T {
	return a * b
}

func main() {
	fmt.Println(multiply(5, 6))             // 30
	fmt.Println(multiply(3.2, 4.1))         // 13.12
	fmt.Println(multiply("Hello", "World")) // string does not satisfy Number (string missing in int | float64) compiler(InvalidTypeArg)
}
```

> [!NOTE]
> Go does not support direct union types. you cannot do something like:
>
> ```go
> type Number int | float64
> ```
>
> Instead, you can use an interface to define a set of types that satisfy a certain behavior:
>
> ```go
> type Number interface {
> 	int | float64
> }
> ```

<br>

Example 5:

> Generics with structs.

```go
type gasEngine struct {
	hp int
}

type electricEngine struct {
	kWh int
}

type car[T gasEngine | electricEngine] struct {
	model  string
	year   int
	engine T
}

func main() {
	gCar := car[gasEngine]{
		model: "Audi",
		year:  2018,
		engine: gasEngine{
			hp: 385,
		},
	}

	eCar := car[electricEngine]{
		model: "Tesla",
		year:  2022,
		engine: electricEngine{
			kWh: 60,
		},
	}
}
```

<p align="right">
    <a href="#go">back to top ⬆</a>
</p>

<br>
<br>

## 🔶 Interfaces

In Go, an interface is a type that specifies a set of method signatures. If a type implements all the methods of an interface, it is said to satisfy that interface.

Interfaces enable flexible and decoupled code, allowing you to define functions that can work with any type that implements the interface.

> A type can implement multiple interfaces, and an interface can be satisfied by multiple types.

- Defining an interface:

  ```go
  type shape interface {
  	area() float64
  	perimeter() float64
  }
  ```

  > Here, the `shape` interface defines two methods: `area()` and `perimeter()`. Any type that implements these methods can be considered a `shape`.

- Implementing an interface

  > Both `circle` and `rect` satisfy the `shape` interface because they implement all required methods. The implementation happens automatically, no explicit declaration is needed.

  ```go
  type circle struct {
  	radius float64
  }

  func (c circle) area() float64 {
  	return math.Pi * c.radius * c.radius
  }

  func (c circle) perimeter() float64 {
  	return 2 * math.Pi * c.radius
  }
  ```

  ```go
  type rect struct {
  	width  float64
  	height float64
  }

  func (r rect) area() float64 {
  	return r.width * r.height
  }

  func (r rect) perimeter() float64 {
  	return 2*r.width + 2*r.height
  }
  ```

- Using the interface:

  > Functions can accept interface types as parameters, allowing them to work with any type that satisfies the interface.

  ```go
  func printArea(s shape) {
    fmt.Println("Area:", s.area())
    fmt.Println("Perimeter:", s.perimeter())
  }

  func main() {
    myCircle := circle{radius: 3}
    printArea(myCircle)
    // Area: 28.274333882308138
    // Perimeter: 18.84955592153876

    myRect := rect{width: 3, height: 4}
    printArea(myRect)
    // Area: 12
    // Perimeter: 14
  }
  ```

<br>

> [!NOTE]
> An empty interface (`interface{}`) require zero methods, so every type satisfies it. Also, you can use the alias `any` instead of `interface{}`.
>
> ```go
> var x interface{}
>
> func main() {
> 	x = 5
> 	x = "hello"
> 	x = true
>
> 	fmt.Println(x) // true
> }
> ```
>
> You can use empty interfaces with type switches to handle values of different types at runtime:
>
> ```go
> func describe(i interface{}) {
> 	switch v := i.(type) {
> 	case string:
> 		fmt.Println("It's a string:", v)
> 	case int:
> 		fmt.Println("It's an integer:", v)
> 	default:
> 		fmt.Println("Unknown type")
> 	}
> }
>
> func main() {
> 	x := 5
> 	describe(x) // It's an integer: 5
> }
> ```
>
> The `x.(T)` syntax is known as a "type assertion". It can be used directly with any type, including named types and pointer types:
>
> ```go
> func main() {
> 	var x interface{} = "Hello"
>
> 	val, ok := x.(string)
> 	if ok {
> 		fmt.Println("It's a string:", val)
> 	} else {
> 		fmt.Println("Not a string")
> 		// val is zero value here
> 	}
> }
> ```
>
> The `ok` variable is `true` if the type assertion succeeds, and `false` if it fails. When `ok` is `false`, `val` will have the zero-value.
>
> > Here is another example showing usage with the `shape` interface defined above in the "Defining an interface" section:
> >
> > ```go
> > // ...
> >
> > func identifyShape(s shape) {
> > 	val, ok := s.(circle)
> > 	if ok {
> > 		fmt.Println("Shape is a circle, val:", val)
> > 	} else {
> > 		fmt.Println("Shape is not a circle")
> > 		// val is zero value here
> > 	}
> > }
> >
> > func main() {
> > 	// ...
> >
> > 	identifyShape(myCircle) // Shape is a circle, val: {3}
> > }
> > ```

<br>

### 🔷 Interface Composition

Interface composition allows you to create new interfaces by combining existing ones.

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}

type Writer interface {
	Write(p []byte) (n int, err error)
}

type ReadWriter interface {
	Reader
	Writer
}
```

> The `ReadWriter` interface requires both `Read` and `Write` methods. Any type that implements both automatically satisfies the `ReadWriter` interface.

> [!NOTE]
> If multiple interfaces are composed and they contain methods with the same name, those methods must have identical signatures in all interfaces.

<p align="right">
    <a href="#go">back to top ⬆</a>
</p>

<br>
<br>

## 🔶 Concurrency

### 🔷 Goroutines

Goroutines are a feature in Go that allows you to run functions concurrently.

In general, we can split the execution of a program into two types of routines:

- Main Routine:
  > The main routine is the initial goroutine that starts when a Go program begins execution. It's the entry point of the program, defined by the main function in the main package. When the main function exits, the program terminates, so any running goroutines will also be stopped.
- Child Routines:
  > A child routine is any goroutine that is spawned by the main routine or other goroutines. These are created using the `go` keyword followed by a function call. Child routines run concurrently with the main routine and each other.

<br>

```go
func main() {
	go expensiveFunc("Hello")

	fmt.Println("Main")

	time.Sleep(1700 * time.Millisecond)
}

func expensiveFunc(text string) {
	for i := 0; i < 4; i++ {
		time.Sleep(500 * time.Millisecond)
		fmt.Println(text, i)
	}
}
```

> Output:
>
> ```sh
> Main
> Hello 0
> Hello 1
> Hello 2
> ```

> The `time.Sleep` inside the main function is used to give enough time for the goroutines to finish before the main function exits. Without this, the program would exit immediately after the main routine has done its job.
>
> The output shows results for only 3 iterations, not 4 as specified in the for loop. This is because we have a `time.Sleep` of 1.7 seconds (1700 milliseconds), which is less than the minimum of 2 seconds (2000 milliseconds) needed for 4 iterations (4 \* 500 ms = 2000 ms) in the `expensiveFunc` function.
>
> Btw, using `time.Sleep` to wait for goroutines to finish is not a good practice.

<br>

#### 🔻 `WaitGroup`

A `WaitGroup` is a part of the `sync` package that's used to wait for a collection of goroutines to finish executing.

> When you launch goroutines, they run concurrently, and the main function might exit before the goroutines finish. `WaitGroup` ensures that the program waits until all the work is done before exiting or moving on.

- `wg.Add(n)`: Tells the `WaitGroup` to wait for `n` additional operations.
- `wg.Done()`: Decrements the counter (`-1`). Usually deferred at the start of each goroutine.
- `wg.Wait()`: Blocks until the counter goes back to 0.

<br>

```go
func main() {
	var wg sync.WaitGroup

	wg.Add(1)
	go expensiveFunc("Hello", &wg)

	fmt.Println("Main")

	wg.Wait()

	fmt.Println("End")
}

func expensiveFunc(text string, wg *sync.WaitGroup) {
	defer wg.Done()

	for i := range 4 {
		time.Sleep(500 * time.Millisecond)
		fmt.Println(text, i)
	}
}
```

> Output:
>
> ```sh
> Main
> Hello 0
> Hello 1
> Hello 2
> Hello 3
> End
> ```

<br>

We can also put the business logic function inside an anonymous function to keep the business logic itself clean:

> ```go
> func main() {
> 	var wg sync.WaitGroup
>
> 	wg.Add(1)
> 	go func(wg *sync.WaitGroup) {
> 		defer wg.Done()
> 		expensiveFunc("Hello")
> 	}(&wg)
>
> 	fmt.Println("Main")
>
> 	wg.Wait()
>
> 	fmt.Println("End")
> }
>
> func expensiveFunc(text string) {
> 	for i := range 4 {
> 		time.Sleep(500 * time.Millisecond)
> 		fmt.Println(text, i)
> 	}
> }
> ```
>
> This way, we keep the `expensiveFunc` function clean and focused on its own logic, while the goroutine management is handled separately.

<br>

### 🔷 Channels

Channels in Go are a way to communicate between goroutines. They are used to send and receive values between goroutines.

- Declaring a channel:
  > The type of a channel specifies what kind of data it can carry.
  ```go
  ch := make(chan int)
  ```
- Sending values to a channel:
  ```go
  ch <- 10
  ```
- Receiving values from a channel:
  ```go
  myVar := <-ch
  ```
- Closing a channel:
  > Closing a channel is a way to signal to the receiving goroutine that it should stop waiting for values to be sent to it. It's important to close a channel when you're done sending values to avoid a `deadlock`.
  ```go
  close(ch)
  ```

> [!NOTE]
> Channel synchronization ensures that communication between goroutines is properly coordinated. It guarantees that data sent between goroutines is not lost and that goroutines wait for each other when necessary, maintaining the correct order and timing of operations.
>
> - Send Operation: `ch <- value`
>   > When a goroutine sends a value into a channel, it will block (pause execution) until another goroutine is ready to receive that value from the channel.
> - Receive Operation: `value := <-ch`
>   > When a goroutine tries to receive a value from a channel, it will block until a value is available to be received.

<br>

Example:

```go
func main() {
	ch := make(chan string)

	go expensiveFunc("Hello", ch)

	fmt.Println("Main")

	for range 4 {
		fmt.Println(<-ch)
	}

  fmt.Println("End")
}

func expensiveFunc(text string, ch chan string) {
	for i := range 4 {
		time.Sleep(500 * time.Millisecond)
		ch <- text + " " + fmt.Sprint(i)
	}
}
```

> Output:
>
> ```sh
> Main
> Hello 0
> Hello 1
> Hello 2
> Hello 3
> End
> ```

> Here, we don't need any additional mechanism in the `main` function to wait for the goroutine to finish. The `<-ch` operation in the main function blocks until there is a value to receive from the channel. This blocking behavior synchronizes the main function with the `expensiveFunc` goroutine. Each iteration of the loop in the main function waits for a corresponding send operation from `expensiveFunc`. Btw, we are not forced to use a loop here. We can use `fmt.Println(<-ch)` directly 4 times, one after the other, it does the same thing.
>
> In this specific example, we don't strictly need to close the channel because the main function will only receive a fixed number of messages (4 in this case) and then it stops.

> Here is a modified version of it that needs to be closed explicitly:
>
> ```go
> func main() {
> 	ch := make(chan string)
>
> 	go expensiveFunc("Hello", ch)
>
> 	fmt.Println("Main")
>
> 	for msg := range ch {
> 		fmt.Println(msg)
> 	}
>
> 	fmt.Println("Done.")
> }
>
> func expensiveFunc(text string, ch chan string) {
> 	defer close(ch)
>
> 	for i := range 4 {
> 		time.Sleep(500 * time.Millisecond)
> 		ch <- text + " " + fmt.Sprint(i)
> 	}
> }
> ```
>
> > The `for msg := range ch { ... }` syntax essentially performs a `msg := <-ch` operation under the hood, which is where the blocking behavior occurs.
>
> `range` doesn't know how many values a channel will receive, it can be infinite. To stop the loop, we must explicitly close the channel to indicate that no more values are coming.

<br>

#### 🔻 Buffered Channels

Buffered channels in Go are channels that have a specific capacity, allowing them to hold a certain number of values before blocking.

- Declaring a buffered channel:
  ```go
  ch := make(chan int, 3)
  ```

> Buffered channel only blocks sending when the buffer is full.

> Receiving removes a value from the buffer. If the buffer is empty, it will block until a value is available.

> You can still receive remaining values from a closed buffered channel until it’s empty.

```go
func main() {
	ch := make(chan string, 4)

	go myFunc("Hello", ch)

	fmt.Println("Main")

	for range 8 {
		time.Sleep(1000 * time.Millisecond)
		fmt.Println(<-ch)
	}

	fmt.Println("End")
}

func myFunc(text string, ch chan string) {
	for i := range 8 {
		ch <- text + " " + fmt.Sprint(i)
		fmt.Println("myFunc loop.", i)
	}

	close(ch)

	fmt.Println("myFunc End")
}
```

> Output:
>
> ```sh
> Main
> myFunc loop. 0
> myFunc loop. 1
> myFunc loop. 2
> myFunc loop. 3
> Hello 0
> myFunc loop. 4
> Hello 1
> myFunc loop. 5
> Hello 2
> myFunc loop. 6
> Hello 3
> myFunc loop. 7
> myFunc End
> Hello 4
> Hello 5
> Hello 6
> Hello 7
> End
> ```

<br>

#### 🔻 Channel Status

The receiver of a channel can check the status of the channel using the second return value of the receive operation.

```go
val, ok := <-ch
```

The second return value (`ok`) is a boolean that indicates whether the channel is closed or not.

- `true`: The channel is closed and no more values can be sent to it.
- `false`: The channel is open and values can be sent to it.

```go
func main() {
	ch := make(chan int)

	go func(ch chan int) {
		ch <- 1
		ch <- 2
		close(ch)
	}(ch)

	for {
		val, ok := <-ch
		if !ok {
			fmt.Println("Channel is closed.")
			break
		}
		fmt.Println("Received:", val)
	}
}
```

> When you `range` over a channel, the loop will automatically break when the channel is closed. But if you're using a manual receive loop, checking `ok` helps you know when to stop receiving.

<br>

#### 🔻 The `select` Statement

The `select` statement in Go is a control structure that allows you to work with multiple channels simultaneously. It's similar to a `switch` statement but is specifically designed for channel operations.

- The `select` statement listens to several channels.
- It runs the first case that's ready to proceed.
- If multiple cases are ready, Go randomly picks one to execute.
- If there's no `default` case, it will block and wait until a case becomes ready.
- If a `default` case is present and no other cases are ready, it executes the `default` case immediately without blocking.

```go
func main() {
	// Preparation:
	ch1 := make(chan int)
	ch2 := make(chan int)
	ch3 := make(chan int)

	go func(ch chan int) {
		time.Sleep(time.Second)
		ch <- 1
	}(ch1)

	go func(ch chan int) {
		time.Sleep(time.Second * 3)
		ch <- 2
	}(ch2)

	go func(ch chan int) {
		time.Sleep(time.Second * 2)
		ch <- 3
	}(ch3)

	time.Sleep(time.Second * 5)

	// Usage:
	select {
	case val1 := <-ch1:
		fmt.Println(val1)
	case val2 := <-ch2:
		fmt.Println(val2)
	case val3 := <-ch3:
		fmt.Println(val3)
	default:
		fmt.Println("No channels are ready.")
	}

	fmt.Println("Done.")
}
```

> [!NOTE]
> The `select` statement is not a loop, it executes only one case even if multiple are ready, and then breaks the `select` statement.

<br>

#### 🔻 Read-Only and Write-Only Channels

In Go, channels can be restricted to be either `read-only` or `write-only`. This is useful for defining clear communication patterns between goroutines and helps in maintaining code safety and clarity.

- Read-only channels:
  > A read-only channel can only be used to receive values. You cannot send values into a read-only channel.
- Write-only channels:
  > A write-only channel can only be used to send values. You cannot receive values from a write-only channel.

```go
func sendData(ch chan<- int) { // ch is write-only
	ch <- 42
	// can't do: <- ch
	close(ch)
}

func receiveData(ch <-chan int) { // ch is read-only
	fmt.Println(<-ch)
	// can't do: ch <- 24
}

func main() {
	ch := make(chan int)

	go sendData(ch)
	receiveData(ch)
}
```

<br>

#### 🔻 The "Done Channel" Pattern

The "Done Channel" pattern is a technique used to signal the completion/termination of a goroutine. The technique involves using a separate helper channel to indicate when a goroutine should stop its execution.

- Without Done Channel:

  ```go
  func myFunc() {
    for {
      fmt.Println("MyFunc")
    }
  }

  func main() {
    go myFunc()

    time.Sleep(1 * time.Hour)
  }
  ```

  > The `myFunc` goroutine will print "MyFunc" until the main program exits.

- With Done Channel:

  ```go
  func myFunc(doneCh <-chan struct{}) {
    for {
      select {
      case <-doneCh:
        return
      default:
        fmt.Println("MyFunc")
      }
    }
  }

  func main() {
    doneCh := make(chan struct{})

    go myFunc(doneCh)

    time.Sleep(5 * time.Second)
    close(doneCh)

    time.Sleep(1 * time.Hour)
  }
  ```

  > The `myFunc` goroutine will print "MyFunc" for 5 seconds and then return, even though the main program continues to run for an hour.

> [!NOTE]
> The `struct{}` type represents an empty struct in Go. It consumes zero bytes of memory, making it ideal for signaling and control purposes without causing any memory overhead.

<p align="right">
    <a href="#go">back to top ⬆</a>
</p>

<br>
<br>
