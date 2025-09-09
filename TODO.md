Microsoft Windows [Version 10.0.26100.4946]
(c) Microsoft Corporation. All rights reserved.

C:\Users\DELL\Downloads\nn\business-solution-project>npm run build

> my-app@0.1.0 build
> next build

▲ Next.js 15.3.2

Creating an optimized production build ...
✓ Compiled successfully in 4.0s

Failed to compile.

./src/app/campaign-request/page.tsx
231:47 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities
627:50 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities

./src/app/dashboard/page.tsx
7:10 Error: 'Label' is defined but never used. @typescript-eslint/no-unused-vars  
17:10 Error: 'selectedUser' is assigned a value but never used. @typescript-eslint/no-unused-vars
17:24 Error: 'setSelectedUser' is assigned a value but never used. @typescript-eslint/no-unused-vars
17:52 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
73:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars  
89:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars

./src/app/profile/page.tsx
38:60 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
119:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars  
147:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars  
178:14 Error: 'err' is defined but never used. @typescript-eslint/no-unused-vars  
240:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element
448:40 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities

./src/components/FileUpload.tsx
36:47 Warning: Image elements must have an alt prop, either with meaningful text, or an empty string for decorative images. jsx-a11y/alt-text
260:23 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element

./src/components/ProfileForm.tsx
253:19 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element

./src/components/RecommendationEngine.tsx
257:25 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element

./src/components/StripePaymentForm.tsx
89:45 Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities

./src/lib/stripe.ts
4:37 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any

info - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules# Deployment Setup Tasks

## Current Status

- [x] Analyze project structure and requirements
- [x] Confirm deployment platform (Vercel)
- [x] Create vercel.json configuration
- [x] Update README.md with deployment instructions
- [x] Create DEPLOYMENT.md with detailed guide
- [x] Test build process locally
- [ ] Provide final deployment instructions

## Next Steps

1. Create vercel.json for deployment configuration
2. Update README.md with deployment section
3. Create DEPLOYMENT.md with step-by-step guide
4. Test the build process
5. Provide final deployment instructions
