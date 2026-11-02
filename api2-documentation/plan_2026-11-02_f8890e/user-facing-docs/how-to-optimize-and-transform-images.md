# How to optimize and transform images

This guide explains how to optimize and transform images in your content. The current product version does not include a built-in image optimization or transformation feature, so this page describes what you can do today with standard Markdown image syntax and what to expect.

## Prerequisites

To insert images into content, you need:

- Access to the content editor
- **Markdown** selected as the editing language
- An image available at a public or internal URL

## What is currently available

The content editor supports **Markdown** as one of the selectable languages. You can write and format text, create links, and compose structured content. However, the following image capabilities are not yet available:

- Automatic resizing or cropping
- Compression or format conversion
- Lazy-loading or performance settings
- Any transformation applied at build time

There are no dedicated image settings, controls, or panels in the editor for these tasks. Any image optimization must be done in a separate image tool before you add the image to your content.

## Working with images today

The editor does not provide a dedicated image-insertion button, so images are added using standard Markdown image syntax. Follow these steps to include an image in your content:

1. Select **Markdown** as the language for your content in the editor.
2. Type the standard Markdown image syntax into the content area. Use square brackets for the alternate text and parentheses for the image URL. For example, an image with the alternate text`dashboard screenshot` and the URL`https://example.com/dashboard.png` would be written as`![dashboard screenshot](https://example.com/dashboard.png)`.
3. Replace the alternate text with a short description of the image so readers who cannot see it understand what it shows.
4. Replace the URL with the actual address where the image is hosted.
5. Preview or save your content to confirm the image appears as expected.

> [!NOTE]
> Images inserted this way display at their original size. If you need a smaller or optimized image, resize or compress the file in an image editor before adding it to your content.

## Expected result

After you add the standard Markdown image syntax and save your content, the image displays in the rendered content at its original size and format. No optimization or transformation is applied by the product.

## Common issues

- **Image does not appear**: Confirm the image URL is correct and accessible from the browser.
- **Image is too large or loads slowly**: Use an image editor to resize or compress the file before adding it to your content.
- **No image tools visible in the editor**: The product does not currently offer a dedicated image toolbar or optimization controls. Use standard Markdown syntax instead.

## Related pages

- [MDX & Markdown Authoring](doc:8c883a2a-ae26-48ef-9a37-c40061a922af)
- [Code Editor](doc:a1109ff6-5fe7-437a-99ec-4d0b442bb0fd)
- [Syntax Highlighting](doc:0cc5fd84-0d94-4faf-ab51-00f580e726a4)
- [Product Overview](doc:ca8f433d-53d1-475b-a3a5-29b24f1ba173)
