import type { FetchedData } from "@/db/schema";

export function getMockFetchedData(date: string): FetchedData[] {
	return [
		// Reddit Explorer の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440001",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "reddit_post_123",
			title: "New React 19 Features That Will Change Everything",
			content:
				"# React 19 Major Updates\n\nReact 19 introduces several groundbreaking features.\n\n## Key Features\n- Server Components Evolution\n- Improved Concurrent Features\n- Enhanced TypeScript Integration\n\n## Performance Benchmarks\n- 40% faster initial page loads\n- 25% reduction in bundle size",
			url: "https://reddit.com/r/reactjs/post/123",
			authorName: "react_dev_pro",
			authorId: "user_12345",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=react_dev_pro",
			publishedAt: new Date(`${date}T10:30:00Z`),
			engagement: { likes: 245, comments: 67, shares: 23 },
			media: [],
			tags: ["react", "javascript", "frontend", "development"],
			rawData: {},
			fetchedAt: new Date(),
		},
		// TypeScript の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440002",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "reddit_post_124",
			title: "TypeScript 5.3 Advanced Patterns",
			content:
				"# TypeScript 5.3 Updates\n\n## Key Features\n- Conditional Types Enhancement\n- Template Literal Types\n- Performance Optimizations\n\n## Example\n```typescript\ntype DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\n```",
			url: "https://reddit.com/r/typescript/post/124",
			authorName: "typescript_guru",
			authorId: "user_67890",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=typescript_master",
			publishedAt: new Date(`${date}T14:15:00Z`),
			engagement: { likes: 1892, comments: 456, shares: 123 },
			media: [],
			tags: ["typescript", "javascript", "types", "advanced"],
			rawData: {},
			fetchedAt: new Date(),
		},
		// HackerNews の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440003",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "hackernews_post_456",
			title: "Complete Guide to Full-Stack Development in 2025",
			content:
				"# Full-Stack Development Guide 2025\n\n## Frontend Technologies\n- React with Server Components\n- Vue.js 3.4\n- Svelte 5\n\n## Backend Frameworks\n- Express.js\n- Fastify\n- FastAPI\n\n## Databases\n- PostgreSQL\n- MongoDB\n- Redis",
			url: "https://news.ycombinator.com/item?id=456",
			authorName: "fullstack_dev",
			authorId: "user_future_001",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=web_futurist",
			publishedAt: new Date(`${date}T09:00:00Z`),
			engagement: { likes: 3120, comments: 892, shares: 345 },
			media: [],
			tags: ["fullstack", "react", "vue", "nodejs", "python", "webdev"],
			rawData: {},
			fetchedAt: new Date(),
		},
		// Twitter の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440004",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "twitter_post_789",
			title: "CSS Grid Layout Tips",
			content:
				"# Quick CSS Grid Tips\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n```\n\nSimple but powerful!",
			url: "https://twitter.com/css_tips/status/789",
			authorName: "css_wizard",
			authorId: "user_css_001",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=css_wizard",
			publishedAt: new Date(`${date}T16:45:00Z`),
			engagement: { likes: 89, comments: 12, shares: 5 },
			media: [],
			tags: ["css", "grid", "layout"],
			rawData: {},
			fetchedAt: new Date(),
		},
		// エンゲージメント数値が非常に高い記事
		{
			id: "550e8400-e29b-41d4-a716-446655440005",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "reddit_viral_999",
			title:
				"Breaking: Major Security Vulnerability Discovered in Popular JS Library",
			content:
				"# URGENT: Critical Security Alert\n\n## Summary\n\nA critical security vulnerability has been discovered in one of the most widely used JavaScript libraries.\n\n## Impact\n\n- **Affected users**: 10M+ websites\n- **Severity**: Critical (CVSS 9.8)\n- **Attack vector**: Remote code execution\n\n## Immediate Action Required\n\n### Step 1: Update Dependencies\n\n```bash\nnpm audit\nnpm audit fix\n```\n\n### Step 2: Check Your Code\n\nScan for vulnerable patterns:\n\n```javascript\n// Vulnerable pattern\neval(userInput); // DON'T DO THIS\n\n// Safe alternative\nJSON.parse(userInput);\n```\n\n### Step 3: Implement Security Headers\n\n```javascript\napp.use((req, res, next) => {\n  res.setHeader('X-Content-Type-Options', 'nosniff');\n  res.setHeader('X-Frame-Options', 'DENY');\n  res.setHeader('X-XSS-Protection', '1; mode=block');\n  next();\n});\n```\n\n## Timeline\n\n- **Day 1**: Vulnerability discovered by security researcher\n- **Day 2**: Library maintainers notified privately\n- **Day 7**: Patch released (version 2.1.4)\n- **Day 14**: Public disclosure (today)\n\n## Recommendations\n\n1. **Update immediately** to version 2.1.4 or later\n2. **Audit your dependencies** regularly\n3. **Implement security monitoring**\n4. **Follow security best practices**\n\nStay safe out there! 🛡️",
			url: "https://reddit.com/r/javascript/security_alert_999",
			authorName: "security_researcher_jane",
			authorId: "user_security_expert",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=security_jane",
			publishedAt: new Date(`${date}T08:00:00Z`),
			engagement: { likes: 45670, comments: 2341, shares: 8904 },
			media: [],
			tags: [
				"security",
				"vulnerability",
				"javascript",
				"urgent",
				"breaking",
				"npm",
			],
			rawData: {},
			fetchedAt: new Date(),
		},
		// 作者名がない記事
		{
			id: "550e8400-e29b-41d4-a716-446655440006",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "anonymous_post_111",
			title: "Anonymous Developer's Late Night Thoughts",
			content:
				'# 3 AM Coding Thoughts\n\n## Why Do We Do This?\n\nSitting here at 3 AM, debugging a race condition that only happens in production...\n\n## The Reality of Development\n\n- Coffee is life ☕\n- Stack Overflow is our best friend\n- "It works on my machine" is our motto\n- Git blame is scary\n\n## Random Code Snippet\n\n```javascript\n// TODO: Fix this later (written 2 years ago)\nfunction hackyFix() {\n  return "¯\\\\_(ツ)_/¯";\n}\n```\n\nAnyone else relate? 😴',
			url: "https://dev.to/anonymous/late-night-thoughts",
			authorName: null,
			authorId: null,
			authorAvatarUrl: null,
			publishedAt: new Date(`${date}T03:00:00Z`),
			engagement: { likes: 567, comments: 89, shares: 23 },
			media: [],
			tags: ["thoughts", "development", "lifestyle", "humor"],
			rawData: {},
			fetchedAt: new Date(),
		},
		// 古い記事（数日前）
		{
			id: "550e8400-e29b-41d4-a716-446655440007",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "old_post_222",
			title: "Legacy Code Migration Strategy",
			content:
				"# Migrating Legacy Codebases: A Survival Guide\n\n## The Challenge\n\nDealing with legacy code is like archaeology - you're never sure what you'll uncover.\n\n## Strategy 1: Strangler Fig Pattern\n\nGradually replace old code with new implementations.\n\n## Strategy 2: Big Bang Migration\n\nRisky but sometimes necessary.\n\n## Tools and Techniques\n\n- Automated testing\n- Feature flags\n- Incremental rollouts\n- Monitoring and observability",
			url: "https://medium.com/legacy-migration/strategy",
			authorName: "senior_architect_mike",
			authorId: "user_architect_mike",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=architect_mike",
			publishedAt: new Date(new Date(date).getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
			engagement: { likes: 234, comments: 45, shares: 12 },
			media: [],
			tags: ["legacy", "migration", "architecture", "strategy"],
			rawData: {},
			fetchedAt: new Date(),
		},

	];
}
