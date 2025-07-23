# Fix Lint Errors with Biome

Run Biome lint check and automatically fix any errors that appear.

## Steps:
1. Run `npm run check:fix` to check for Biome lint errors
2. If errors are found, analyze the output
3. Automatically fix each error by editing the affected files
4. Re-run the check to confirm all errors are resolved

## Process:
- Parse Biome error output to identify file paths and error types
- Apply appropriate fixes based on error messages
- Handle common Biome issues like:
  - Import sorting and organization
  - Formatting issues (indentation, spacing)
  - Unused variables and imports
  - Type errors
  - Biome rule violations (complexity, naming conventions, etc.)

## Common Biome Errors:
- `lint/correctness/noUnusedVariables`: Remove unused variables
- `lint/style/useImportType`: Convert to type imports
- `lint/complexity/noForEach`: Replace forEach with for...of
- `lint/suspicious/noExplicitAny`: Replace any with proper types
- Format errors: Apply Biome formatting rules

## Confirmation:
After fixing, run `npm run check:fix` again to ensure all errors are resolved.