# How to minify CSS assets for production

This guide shows how to produce smaller, production-ready CSS files when you build the project for deployment. The minification happens automatically as part of the standard production build. No extra setup is required.

## Prerequisites

- The project is installed locally and its dependencies are available.
- You can run commands from a terminal in the project folder.
- If you haven't installed the project yet, start with the installation instructions in [System Requirements and Installation](doc:1016cd5f-d53c-46d7-a74a-15b623ef5387).

## Steps

1. Open a terminal window in the project folder.
2. Run the production build command:

```sh
   npm run build
   ```

   This is the production command. It processes and minifies the site's CSS along with the rest of the build.

   > [!NOTE]
   > Do not use`npm run build:dev` for production CSS minification. That command creates a development-mode build and is not intended for production deployment.

3. Wait for the build to finish. The terminal shows progress messages, and a successful build ends with a completion message.
4. Find the generated production files. The terminal output indicates where the build tool placed the finished assets.
5. Confirm the CSS was processed. In the production output, the generated CSS files should be smaller than the original source CSS, with unnecessary spaces and unneeded characters removed.

Figure: Production CSS minification flow

```mermaid
graph LR
    A[Open terminal in project] --> B[Run production build]
    B --> C[Build tool processes CSS]
    C --> D[Minified CSS output generated]
    D --> E[Production files ready to deploy]
```

## Expected result

- The production build completes without errors.
- The generated production files include minified CSS ready to upload to your web host.

## Related

- [How to build production site](doc:23e09652-4772-4f32-a5b7-0121a8bc4853)
- [How to optimize CSS bundle size](doc:2d848518-523f-4344-b3fb-b15f92a93dff)
- [CSS Optimization](doc:9c358234-bd9b-41b5-8c0e-dc1b8be5ce61)
- [System Requirements and Installation](doc:1016cd5f-d53c-46d7-a74a-15b623ef5387)
