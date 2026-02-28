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
