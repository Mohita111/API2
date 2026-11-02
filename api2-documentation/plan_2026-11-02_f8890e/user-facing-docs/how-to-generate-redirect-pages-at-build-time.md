# How to generate redirect pages at build time

> [!IMPORTANT]
> The source code for this product does not include a redirect page generator. The production build is run through`vite build`, which bundles the application but does not create static redirect pages. If you need redirect pages, they are not produced by the build described in this guide.

This guide walks through the production build command that is available in the code. Use it to understand what the build process actually generates and where redirect handling would need to be added separately.

## Expected result

The`build` command completes and a production-ready application bundle is generated. No redirect pages are created as part of this process, because the source does not define any redirect entries.

## Related

- [Client-Side Redirects](doc:900eb6c2-0c16-406d-a9d9-c4a4a600b85c)
- [Build production site](doc:23e09652-4772-4f32-a5b7-0121a8bc4853)
- [Site Building & Bundling](doc:0fcd8337-ee59-484f-bda3-4db080caa340)
- [Handle page renames without 404s](doc:3bba0cd8-b2ff-4a98-b4b7-c1569009a038)
