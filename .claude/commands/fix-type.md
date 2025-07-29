# Fix TypeScript type errors

## Goal

Check and fix all TypeScript type errors in the project

## Steps (obey strictly)

Type check scope:

Step 1: Run TypeScript compiler to detect all type errors
   npx tsc --noEmit
   Analyze the error output and understand each type error.

Step 2: Fix the errors systematically. Use `context7` and  MCP tools to understand TypeScript patterns and solutions.
   - Add explicit type annotations where missing
   - Implement prop・er type guards for runtime checks
   - Define interfaces or type aliases as needed
   - Use type assertions only as last resort
   These MCP tool searches should be done by multiple subagents. Also use native Web search subagent for TypeScript best practices.

Step 3: If new type errors appear after fixes, always repeat this debugging process from Step 1 and Step 2.
   npx tsc --noEmit

Step 4: Format the fixed code and report all resolved type errors.
   npm run check:fix

## Important Notes

- Never use `any` type unless absolutely necessary
- Avoid `@ts-ignore` comments
- Ensure type safety without changing runtime behavior
- Fix root causes, not symptoms
