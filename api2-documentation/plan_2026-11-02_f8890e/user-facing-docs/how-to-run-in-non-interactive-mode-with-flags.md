# How to run in non-interactive mode with flags

Create a new documentation site without answering prompts. Instead of stepping through an interactive questionnaire, you supply each choice up front as a command-line flag so the generator can run to completion on its own.

## Prerequisites

- You have Node.js 16 or later installed
- You can open a terminal in the parent folder where you want the new project created
- You have decided on a name for your new site

## Steps

1. Open your terminal and navigate to the folder where the new project should live

2. Run the site generator with the site name and the flags that select your options in one command

3. Let the generator finish. Because every choice is already supplied, no prompts appear

4. Move into the newly created project folder

5. Start the local development server to confirm the generated site opens

## Expected result

The generator creates a complete documentation site folder under the name you supplied. The folder appears without any interactive question-and-answer flow, and the site can be opened immediately in your browser.

## Common issues

The source files provided for this page do not include the scaffolding command implementation, so the exact flag names and values could not be verified against code. Before following the steps, check the site generator's own help output for the flags accepted in your installed version.

## Next steps

- Learn more about what Site Scaffolding generates in [Site Scaffolding](doc:cb56afd7-fb3b-479a-a949-9217fe23e0e4)
- Build the generated site for production by following [How to build production site](doc:23e09652-4772-4f32-a5b7-0121a8bc4853)
