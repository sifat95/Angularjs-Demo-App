# Angularjs-Demo-App

[Angular](https://angular.io/) is a development platform, built on [TypeScript](https://www.typescriptlang.org/)
## Setup
Angular requires an active [LTS or maintenance LTS version](https://nodejs.org/about/releases) of Node.js.
### Angular CLI
```
# Install angular command line interface
npm install -g @angular/cli

# create new app with name my-app
ng new my-app

cd my-app

ng serve --open
```
```ng serve``` command launches the server, watches for any new file change and ```--open``` (or just -o) option automatically opens your browser to http://localhost:4200/.

## Core Ideas
- [Components]() are the main building block for Angular Applications. It mainly includes

    1.  ```Class``` handles data and functionality
    2. ```HTML Template``` detemines UI
    3. ```CSS Styles``` to define UI
    4. ```CSS Selector``` defines how the component is used in a template
    ```
    # ProductListComponent from Sample Project

    @Component({
        selector: 'app-product-list',
        templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css'],
    })
    export class ProductListComponent {
        
    }
    ```
- [Template]() is a form of HTML that tells Angular how to render the component.
- [Dependency Injection]()

## Build a Sample Project

This is [demo app in Stackblitz](https://stackblitz.com/edit/angular-8iursv). 

See [this link](https://angular.io/start#take-a-tour-of-the-example-application) for all the steps to build this app. This will walk you through the app that will help to clarify corresponding Angular concepts.

## Reference

- https://angular.io/