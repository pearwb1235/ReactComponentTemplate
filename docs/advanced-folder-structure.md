# Advanced Folder Structure

[![](https://github.com/pearwb1235/ReactComponentTemplate/blob/a722f2cc59b5939f37e54696cc2e11203d418ebe/docs/advanced-folder-structure.png?raw=true)](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)

## features

The massive change between these two structures is the `features` folder. This folder works very similarly to the `pages` folder from the intermediate structure, but instead of grouping by page we are instead grouping by feature. Already this is easier to understand as a developer since in 90% of cases when you are going to add new code to a project you are either going to implement a new feature, such as adding user accounts, or you are going to modify an existing feature, such as adding the ability to edit todos. This makes working with the code easier since all the code for each feature is collocated in the same place making it easy to update and add to.

The actual structure of this folder follows the `pages` structure in that there are individual folders for each feature (authentication, todos, projects, etc.) and inside those folders are all the files for that feature. The biggest difference you will notice between the `pages` folder and the `features` folder, though, is that within each feature you have another set of folders. This folder structure for each feature is a complete copy of all the folders inside the `src` folder (other than the `features` folder obviously) and an `index.js` file. This means that within your feature all your code can be organized by type (context, hook, etc.) while still be collocated together.

The `index.js` file is then used as a way to expose a public API for everything that is usable outside the feature folder for that given feature. It is common that you will want to have a bunch of code that is private to the specific feature you are working on, but with JS if you create an export in a file it can be used in any other file you want. In larger projects this can become a problem if we only want to expose a few components/methods for our feature which is where the `index.js` file comes in. This file should export only the code you want to be accessible outside the feature and then every time you use code for this feature in your application you should import it from the `index.js` file. Doing this is really nice since your global code footprint is much smaller this way and using the features becomes easier since you have a limited API to work with. This can even be enforced by an ESLint rule which disallows any import from a `feature` folder that doesn't come from `index.js`.

    {
      "rules": {
        "no-restricted-imports": [
          "error", { "patterns": ["@/features/*/*"] }
        ]
      }
    }

_Above code from [Bullet Proof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)._

This import rules utilizes absolute imports (which I recommend using on larger projects). You can set this up by using a .jsconfig or .tsconfig file with the following code.

    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@features/*": ["src/features/*"],
        }
      }
    }

## pages

The other major change with this new structure is the `pages` folder. This folder now only contains one file per page and the reason for this is that all the logic for the features on the pages are in the `features` folder. This means that the files in the `pages` folder are actually quite simple since they just glue together a few feature components and some general components.

## layouts

The first new folder is the `layouts` folder and this one is really simple. This is just a special folder for placing any layout based components. This would be things like a sidebar, navbar, container, etc. If you application only has a handful of layouts then this folder really isn't needed and you can just place the layout components in the `components` folder, but if you have multiple different layouts used across your application this is a great place to store them.

## lib

The `lib` folder is another fairly simple folder. This folder contains facades for the various different libraries you use in your project. For example, if you use the `axios` library then this folder would contain a file for that `axios` library that creates your own API overtop of the `axios` API which you then use in your application. This means that instead of importing `axios` directly in your project you would import the file from this folder associated with `axios`.

Doing this makes is much easier to update, and replace libraries since all the library specific code is in one place in your application. It also makes it easier to customize third party libraries to your own need. _This pattern is called the Facade Pattern which you can learn more about in my [Ultimate Facade Pattern Guide](https://blog.webdevsimplified.com/2022-07/facade-pattern)._

## services

The final new folder is the `services` folder. This folder contains all your code for interfacing with any external API. Generally, on larger projects you will have many different APIs you need to access and this folder is the place to put the code that interacts with those APIs. Again this helps clean up your code since instead of littering a bunch of API interaction code in your application it is all within this one folder.

# Pros

The biggest pro by far of this structure is the ease of adding/updating code. Since the bulk of the code is broken down into different features it is easy to add new features or update existing features. This separation also simplifies the codebase since now files can be considered private which helps with understanding the codebase.

Another benefit is that the code outside the `features` folder is generally pretty simple to understand since most of the business logic is wrapped up inside the `features` folder. This again makes understanding and working with the code that much easier.

# Cons

The biggest con of this structure is the complexity. If you are working on a larger scale application then this added complexity is no big deal since it ends up reducing the overall complexity of the project, but if you only have a handful of features/pages this system can end up being overkill with many of the folders being completely unused or only containing a few files. Because of this, I only recommend using this folder structure on more advanced larger projects that need the extra separation.

# Conclusion

No matter the scale of your project, folder structure is crucial. With these 3 folder structure templates you should be able to take any size project you have and adapt one of these structures to fit your exact needs which will help you to write better and cleaner code.
