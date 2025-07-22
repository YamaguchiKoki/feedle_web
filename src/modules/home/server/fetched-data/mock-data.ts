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
				"# React 19 Major Updates\n\nReact 19 introduces several groundbreaking features that will revolutionize how we build web applications.\n\n## Key Features\n\n### 1. Server Components Evolution\nThe new server components architecture provides better performance and SEO benefits.\n\n### 2. Improved Concurrent Features\nBetter handling of concurrent operations with enhanced Suspense boundaries.\n\n### 3. Enhanced TypeScript Integration\nNative TypeScript support with improved type inference.\n\n## Code Examples\n\n```jsx\n// Server Component Example\nfunction UserProfile({ userId }) {\n  const user = await fetchUser(userId);\n  return <div>{user.name}</div>;\n}\n```\n\n## Performance Benchmarks\n\nThe new features show significant improvements:\n\n- 40% faster initial page loads\n- 25% reduction in bundle size\n- Improved development experience",
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
		// 非常に長いタイトルの記事
		{
			id: "550e8400-e29b-41d4-a716-446655440002",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "reddit_post_124",
			title:
				"Understanding TypeScript 5.3 Advanced Patterns and Complex Generic Types for Enterprise-Scale Applications with Deep Inheritance Hierarchies and Complex Data Structures",
			content:
				'# TypeScript 5.3 Deep Dive: Advanced Patterns for Enterprise Applications\n\n## Introduction\n\nTypeScript 5.3 introduces revolutionary features that transform how we handle complex type systems in large-scale enterprise applications.\n\n## Chapter 1: Generic Type Improvements\n\n### 1.1 Conditional Types Enhancement\n\nThe new conditional type system allows for more precise type inference:\n\n```typescript\ntype DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];\n};\n```\n\n### 1.2 Template Literal Types\n\nTemplate literal types now support complex pattern matching:\n\n```typescript\ntype CSSProperty<T extends string> = `--${T}`;\ntype Colors = "red" | "blue" | "green";\ntype CSSColorVars = CSSProperty<Colors>; // "--red" | "--blue" | "--green"\n```\n\n## Chapter 2: Performance Optimizations\n\n### 2.1 Compilation Speed\n\nThe TypeScript compiler now includes:\n\n- **Incremental compilation**: 60% faster rebuild times\n- **Memory optimization**: 35% reduced memory usage\n- **Parallel processing**: Multi-threaded type checking\n\n### 2.2 IDE Integration\n\nImproved IDE support includes:\n\n1. Faster IntelliSense responses\n2. Better error messaging\n3. Enhanced refactoring capabilities\n4. Improved debugging experience\n\n## Chapter 3: Real-World Examples\n\n### 3.1 Database Integration\n\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  createdAt: Date;\n}\n\ntype UserCreate = Omit<User, \'id\' | \'createdAt\'>;\ntype UserUpdate = Partial<UserCreate> & { id: number };\n```\n\n### 3.2 API Response Handling\n\n```typescript\ntype ApiResponse<T> = \n  | { success: true; data: T }\n  | { success: false; error: string };\n\nfunction processApiResponse<T>(response: ApiResponse<T>): T {\n  if (response.success) {\n    return response.data;\n  }\n  throw new Error(response.error);\n}\n```\n\n## Conclusion\n\nTypeScript 5.3 represents a significant leap forward in type safety and developer productivity.',
			url: "https://reddit.com/r/typescript/post/124",
			authorName: "typescript_guru_with_very_long_username",
			authorId: "user_67890",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=typescript_master",
			publishedAt: new Date(`${date}T14:15:00Z`),
			engagement: { likes: 1892, comments: 456, shares: 123 },
			media: [],
			tags: [
				"typescript",
				"javascript",
				"types",
				"enterprise",
				"advanced",
				"generics",
				"conditional-types",
			],
			rawData: {},
			fetchedAt: new Date(),
		},
		// 多くのタグを持つ記事
		{
			id: "550e8400-e29b-41d4-a716-446655440003",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "hackernews_post_456",
			title: "Complete Guide to Full-Stack Development in 2025",
			content:
				"# The Ultimate Full-Stack Development Guide for 2025\n\n## Table of Contents\n\n1. [Frontend Technologies](#frontend)\n2. [Backend Frameworks](#backend)\n3. [Database Solutions](#database)\n4. [DevOps and Deployment](#devops)\n5. [Best Practices](#best-practices)\n6. [Security Considerations](#security)\n7. [Performance Optimization](#performance)\n8. [Testing Strategies](#testing)\n\n## Frontend Technologies {#frontend}\n\n### React Ecosystem\n\nReact continues to dominate the frontend landscape with new features:\n\n- **Server Components**: Revolutionary approach to SSR\n- **Concurrent Rendering**: Better user experience\n- **Suspense Improvements**: Enhanced loading states\n\n### Vue.js 3.4\n\nVue.js has introduced significant improvements:\n\n```vue\n<template>\n  <div>{{ computedValue }}</div>\n</template>\n\n<script setup>\nimport { computed, ref } from 'vue'\n\nconst count = ref(0)\nconst computedValue = computed(() => count.value * 2)\n</script>\n```\n\n### Svelte 5\n\nSvelte's new runes system:\n\n```svelte\n<script>\n  let count = $state(0);\n  let doubled = $derived(count * 2);\n</script>\n```\n\n## Backend Frameworks {#backend}\n\n### Node.js Ecosystem\n\n#### Express.js\n\nStill the most popular choice:\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/api/users', async (req, res) => {\n  const users = await User.findAll();\n  res.json(users);\n});\n```\n\n#### Fastify\n\nHigh-performance alternative:\n\n```javascript\nconst fastify = require('fastify')({ logger: true });\n\nfastify.get('/api/users', async (request, reply) => {\n  const users = await User.findAll();\n  return users;\n});\n```\n\n### Python Frameworks\n\n#### FastAPI\n\nModern, fast web framework:\n\n```python\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass User(BaseModel):\n    id: int\n    name: str\n    email: str\n\n@app.get(\"/users/{user_id}\")\nasync def read_user(user_id: int) -> User:\n    return User(id=user_id, name=\"John\", email=\"john@example.com\")\n```\n\n## Database Solutions {#database}\n\n### SQL Databases\n\n- **PostgreSQL**: Advanced features and performance\n- **MySQL**: Wide adoption and reliability\n- **SQLite**: Lightweight for smaller applications\n\n### NoSQL Databases\n\n- **MongoDB**: Document-based storage\n- **Redis**: In-memory caching and data structures\n- **Elasticsearch**: Search and analytics\n\n## Best Practices {#best-practices}\n\n1. **Code Organization**: Maintain clean architecture\n2. **Error Handling**: Implement comprehensive error handling\n3. **Security**: Follow security best practices\n4. **Performance**: Optimize for speed and efficiency\n5. **Testing**: Write comprehensive tests\n6. **Documentation**: Maintain up-to-date documentation",
			url: "https://news.ycombinator.com/item?id=456",
			authorName: "fullstack_developer_2025",
			authorId: "user_future_001",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=web_futurist",
			publishedAt: new Date(`${date}T09:00:00Z`),
			engagement: { likes: 3120, comments: 892, shares: 345 },
			media: [
				"https://example.com/diagram1.png",
				"https://example.com/architecture.jpg",
			],
			tags: [
				"fullstack",
				"react",
				"vue",
				"svelte",
				"nodejs",
				"python",
				"fastapi",
				"express",
				"postgresql",
				"mongodb",
				"redis",
				"devops",
				"security",
				"performance",
				"testing",
				"frontend",
				"backend",
				"database",
				"webdev",
				"programming",
				"development",
			],
			rawData: {},
			fetchedAt: new Date(),
		},
		// 短いコンテンツの記事
		{
			id: "550e8400-e29b-41d4-a716-446655440004",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "twitter_post_789",
			title: "CSS Grid Layout Tips",
			content:
				"# Quick CSS Grid Tips\n\n## Basic Grid\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n```\n\nThat's it! Simple but powerful.",
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
		// 極めて長いコンテンツの記事（スクロールテスト用）
		{
			id: "550e8400-e29b-41d4-a716-446655440008",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "super_long_post_888",
			title:
				"Complete React Native Development Course: From Zero to Production App Store Deployment",
			content: `# The Ultimate React Native Development Course: From Zero to Production

## Table of Contents

1. [Introduction to React Native](#introduction)
2. [Development Environment Setup](#setup)
3. [Core Concepts and Components](#core-concepts)
4. [Navigation and Routing](#navigation)
5. [State Management](#state-management)
6. [API Integration and Networking](#api-integration)
7. [Device Features and Native Modules](#device-features)
8. [Performance Optimization](#performance)
9. [Testing Strategies](#testing)
10. [Deployment and Distribution](#deployment)
11. [Troubleshooting Common Issues](#troubleshooting)
12. [Advanced Topics](#advanced)
13. [Conclusion and Next Steps](#conclusion)

## Introduction to React Native {#introduction}

React Native has revolutionized mobile app development by allowing developers to build native mobile applications using JavaScript and React. This comprehensive guide will take you through every aspect of React Native development, from basic concepts to advanced production deployment strategies.

### What is React Native?

React Native is an open-source framework developed by Facebook that enables developers to create mobile applications for iOS and Android using a single codebase. Unlike hybrid frameworks that render web components in a WebView, React Native compiles to native platform components, providing true native performance and look-and-feel.

### Key Benefits

- **Code Reusability**: Write once, run on both iOS and Android
- **Performance**: Near-native performance with native components
- **Developer Experience**: Hot reloading and familiar React concepts
- **Community**: Large ecosystem and community support
- **Cost-Effective**: Single team can develop for both platforms

### Prerequisites

Before diving into React Native development, you should have:

- Basic JavaScript knowledge
- Understanding of React concepts (JSX, components, hooks)
- Familiarity with mobile app concepts
- Node.js installed on your system

## Development Environment Setup {#setup}

Setting up your development environment correctly is crucial for a smooth React Native development experience.

### Installing Node.js and npm

\`\`\`bash
# Download and install Node.js from nodejs.org
# Verify installation
node --version
npm --version
\`\`\`

### React Native CLI Installation

\`\`\`bash
# Install React Native CLI globally
npm install -g react-native-cli

# Alternative: Use npx (recommended)
npx react-native init MyAwesomeApp
\`\`\`

### Platform-Specific Setup

#### iOS Development Setup

For iOS development on macOS:

\`\`\`bash
# Install Xcode from Mac App Store
# Install Xcode Command Line Tools
xcode-select --install

# Install CocoaPods
sudo gem install cocoapods
\`\`\`

#### Android Development Setup

\`\`\`bash
# Download and install Android Studio
# Set up Android SDK
# Configure environment variables

export ANDROID_HOME=/Users/username/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
\`\`\`

### Creating Your First Project

\`\`\`bash
# Create a new React Native project
npx react-native init AwesomeProject

# Navigate to project directory
cd AwesomeProject

# Start Metro bundler
npx react-native start

# Run on iOS (in another terminal)
npx react-native run-ios

# Run on Android (in another terminal)
npx react-native run-android
\`\`\`

## Core Concepts and Components {#core-concepts}

Understanding React Native's core concepts is essential for building robust applications.

### JSX in React Native

React Native uses JSX, but instead of HTML elements, you use React Native components:

\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default MyComponent;
\`\`\`

### Core Components

#### View Component

The \`View\` component is the fundamental building block:

\`\`\`jsx
import { View } from 'react-native';

const ContainerExample = () => (
  <View style={{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  }}>
    <View style={{ backgroundColor: 'red', height: 50 }} />
    <View style={{ backgroundColor: 'blue', height: 50 }} />
    <View style={{ backgroundColor: 'green', height: 50 }} />
  </View>
);
\`\`\`

#### Text Component

All text must be wrapped in \`Text\` components:

\`\`\`jsx
import { Text } from 'react-native';

const TextExample = () => (
  <View>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
      This is bold text
    </Text>
    <Text style={{ fontSize: 14, color: 'gray' }}>
      This is gray text
    </Text>
    <Text numberOfLines={2} ellipsizeMode="tail">
      This is a very long text that will be truncated after two lines
      and show ellipsis at the end to indicate there's more content
    </Text>
  </View>
);
\`\`\`

#### TextInput Component

For user input:

\`\`\`jsx
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const InputExample = () => {
  const [text, setText] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        placeholder="Enter your text here"
        value={text}
        onChangeText={setText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};
\`\`\`

#### ScrollView Component

For scrollable content:

\`\`\`jsx
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const ScrollExample = () => (
  <ScrollView
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ padding: 20 }}
  >
    {Array.from({ length: 50 }, (_, index) => (
      <View
        key={index}
        style={{
          height: 50,
          backgroundColor: index % 2 ? '#f0f0f0' : '#e0e0e0',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <Text>Item {index + 1}</Text>
      </View>
    ))}
  </ScrollView>
);
\`\`\`

### Styling with StyleSheet

React Native uses a JavaScript object-based styling system:

\`\`\`jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
\`\`\`

### Flexbox Layout

React Native uses Flexbox for layout:

\`\`\`jsx
const FlexboxExample = () => (
  <View style={{ flex: 1, padding: 20 }}>
    {/* Row layout */}
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#f0f0f0',
      marginBottom: 20,
    }}>
      <Text>Left</Text>
      <Text>Center</Text>
      <Text>Right</Text>
    </View>

    {/* Column layout with flex distribution */}
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 2, backgroundColor: 'red' }}>
        <Text style={{ color: 'white', padding: 10 }}>Flex: 2</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <Text style={{ color: 'white', padding: 10 }}>Flex: 1</Text>
      </View>
      <View style={{ flex: 3, backgroundColor: 'green' }}>
        <Text style={{ color: 'white', padding: 10 }}>Flex: 3</Text>
      </View>
    </View>
  </View>
);
\`\`\`

## Navigation and Routing {#navigation}

Navigation is crucial for mobile apps. React Navigation is the most popular navigation library for React Native.

### Installing React Navigation

\`\`\`bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

# For iOS
cd ios && pod install

# Additional navigators
npm install @react-navigation/stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer
\`\`\`

### Basic Navigation Setup

\`\`\`jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details', {
        itemId: 86,
        otherParam: 'anything you want here',
      })}
    />
  </View>
);

const DetailsScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My Home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({ title: \`Details \${route.params.itemId}\` })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
\`\`\`

### Tab Navigation

\`\`\`jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
\`\`\`

## State Management {#state-management}

Effective state management is crucial for complex applications.

### Local State with Hooks

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const CounterWithInput = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Count: {count}
      </Text>

      <Button
        title="Increment"
        onPress={() => setCount(count + 1)}
      />

      <Button
        title="Decrement"
        onPress={() => setCount(count - 1)}
      />

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 20,
        }}
        placeholder="Enter a number"
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
      />

      <Button
        title="Set Count"
        onPress={() => {
          const num = parseInt(inputValue);
          if (!isNaN(num)) {
            setCount(num);
            setInputValue('');
          }
        }}
      />
    </View>
  );
};
\`\`\`

### Context API for Global State

\`\`\`jsx
import React, { createContext, useContext, useReducer } from 'react';

// Actions
const SET_USER = 'SET_USER';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setUser,
      setLoading,
      setError,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Usage in component
const UserProfile = () => {
  const { user, loading, setUser, setLoading } = useApp();

  const loadUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {user ? (
        <Text>Welcome, {user.name}!</Text>
      ) : (
        <Button title="Load User" onPress={loadUser} />
      )}
    </View>
  );
};
\`\`\`

## API Integration and Networking {#api-integration}

Most mobile apps need to communicate with backend services.

### Fetch API

\`\`\`jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchUsers} />
      </View>
    );
  }

  const renderUser = ({ item }) => (
    <View style={{
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>{item.email}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.company.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        refreshing={loading}
        onRefresh={fetchUsers}
      />
    </View>
  );
};
\`\`\`

### Using Axios for HTTP Requests

\`\`\`bash
npm install axios
\`\`\`

\`\`\`jsx
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      logout();
    }
    return Promise.reject(error);
  }
);

// API service functions
export const userService = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(\`/users/\${id}\`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(\`/users/\${id}\`, userData),
  deleteUser: (id) => api.delete(\`/users/\${id}\`),
};

// Usage in component
const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Component render logic...
};
\`\`\`

## Performance Optimization {#performance}

Performance optimization is crucial for smooth user experience.

### Image Optimization

\`\`\`jsx
import React from 'react';
import { Image, View, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const OptimizedImage = ({ source, aspectRatio = 1 }) => {
  const imageWidth = screenWidth - 40; // Account for padding
  const imageHeight = imageWidth / aspectRatio;

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={source}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
        resizeMode="cover"
        // Optimize for performance
        progressiveRenderingEnabled
        fadeDuration={300}
      />
    </View>
  );
};
\`\`\`

### FlatList Optimization

\`\`\`jsx
import React, { memo } from 'react';
import { FlatList, View, Text } from 'react-native';

const ListItem = memo(({ item }) => (
  <View style={{
    height: 80,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
  }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
    <Text style={{ fontSize: 14, color: '#666' }}>{item.subtitle}</Text>
  </View>
));

const OptimizedList = ({ data }) => {
  const getItemLayout = (data, index) => ({
    length: 80,
    offset: 80 * index,
    index,
  });

  const keyExtractor = (item) => item.id.toString();

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => <ListItem item={item} />}
      // Performance optimizations
      getItemLayout={getItemLayout}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={15}
      windowSize={10}
      legacyImplementation={false}
    />
  );
};
\`\`\`

This is just the beginning of our comprehensive React Native guide. The content continues with detailed sections on testing, deployment, troubleshooting, and advanced topics. Each section includes practical examples, code snippets, and real-world scenarios to help you master React Native development.

## Testing Strategies {#testing}

Testing is crucial for maintaining code quality and preventing regressions.

### Unit Testing with Jest

\`\`\`jsx
// utils.js
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
\`\`\`

\`\`\`jsx
// utils.test.js
import { formatCurrency, validateEmail } from './utils';

describe('formatCurrency', () => {
  test('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  test('formats EUR currency correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });
});

describe('validateEmail', () => {
  test('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  test('rejects invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });
});
\`\`\`

### Component Testing with React Native Testing Library

\`\`\`bash
npm install --save-dev @testing-library/react-native
\`\`\`

\`\`\`jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  test('renders user information correctly', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    const { getByText, getByTestId } = render(<UserProfile user={mockUser} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
    expect(getByTestId('user-avatar')).toBeTruthy();
  });

  test('handles edit button press', async () => {
    const mockOnEdit = jest.fn();
    const mockUser = { name: 'John Doe', email: 'john@example.com' };

    const { getByText } = render(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    );

    fireEvent.press(getByText('Edit'));

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
    });
  });
});
\`\`\`

## Deployment and Distribution {#deployment}

Getting your app ready for production and distribution.

### Building for Production

\`\`\`bash
# iOS
npx react-native build-ios --configuration Release

# Android
cd android
./gradlew assembleRelease
\`\`\`

### App Store Deployment

\`\`\`bash
# iOS - using Fastlane
gem install fastlane

# Create Fastfile
fastlane init

# Build and upload to TestFlight
fastlane beta
\`\`\`

### Google Play Deployment

\`\`\`bash
# Generate signed APK
cd android
./gradlew assembleRelease

# Generate AAB (Android App Bundle) - recommended
./gradlew bundleRelease
\`\`\`

This comprehensive guide covers everything you need to know about React Native development. From basic concepts to advanced deployment strategies, you now have the knowledge to build, test, and deploy professional mobile applications.

Remember to keep learning and stay updated with the latest React Native developments, as the framework continues to evolve rapidly.`,
			url: "https://reactnative.dev/blog/comprehensive-guide",
			authorName: "react_native_master_teacher",
			authorId: "user_rn_teacher",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=rn_teacher",
			publishedAt: new Date(`${date}T12:00:00Z`),
			engagement: { likes: 8954, comments: 567, shares: 1234 },
			media: [
				"https://example.com/rn-architecture.png",
				"https://example.com/deployment-flow.jpg",
			],
			tags: [
				"react-native",
				"mobile",
				"ios",
				"android",
				"javascript",
				"tutorial",
				"course",
				"beginner",
				"advanced",
			],
			rawData: {},
			fetchedAt: new Date(),
		},

		// GitHub Trending の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440101",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "github_repo_001",
			title: "🔥 Trending: Next.js 15 with Turbopack",
			content:
				"# Next.js 15 with Turbopack\n\nThe latest Next.js release brings Turbopack to production, offering 700x faster updates than Webpack.\n\n## Key Features\n\n- **Turbopack**: Lightning-fast bundler\n- **App Router**: Stable and production-ready\n- **Server Actions**: Simplified data mutations\n\n## Performance Benefits\n\n- 700x faster than Webpack for updates\n- 10x faster cold starts\n- Incremental compilation\n\n```bash\nnpx create-next-app@latest my-app --turbopack\n```",
			url: "https://github.com/vercel/next.js",
			authorName: "vercel_team",
			authorId: "vercel",
			authorAvatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=vercel",
			publishedAt: new Date(`${date}T11:00:00Z`),
			engagement: { likes: 3456, comments: 234, shares: 89 },
			media: [],
			tags: ["nextjs", "turbopack", "performance", "bundler"],
			rawData: {},
			fetchedAt: new Date(),
		},
		{
			id: "550e8400-e29b-41d4-a716-446655440102",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "github_repo_002",
			title: "🚀 AI-Powered Code Assistant: Copilot X",
			content:
				'# GitHub Copilot X: The Future of Coding\n\nCopilot X brings AI-powered assistance directly to your IDE with enhanced capabilities.\n\n## New Features\n\n- **Chat Integration**: Natural language coding\n- **Pull Request Summaries**: AI-generated descriptions\n- **Documentation**: Auto-generated docs\n\n## Usage\n\n```javascript\n// Just describe what you want\n// "Create a function that validates email addresses"\nfunction validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}\n```',
			url: "https://github.com/features/copilot",
			authorName: "github_copilot",
			authorId: "github",
			authorAvatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=github",
			publishedAt: new Date(`${date}T09:30:00Z`),
			engagement: { likes: 2876, comments: 156, shares: 67 },
			media: [],
			tags: ["ai", "copilot", "coding-assistant", "github"],
			rawData: {},
			fetchedAt: new Date(),
		},

		// Hacker News の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440201",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "hackernews_post_001",
			title: "Ask HN: Best Practices for Scaling Node.js Applications",
			content:
				"# Scaling Node.js: Lessons Learned\n\n## The Challenge\n\nAs our startup grew from 1K to 1M users, we learned hard lessons about scaling Node.js applications.\n\n## Key Strategies\n\n### 1. Clustering\n\n```javascript\nconst cluster = require('cluster');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isMaster) {\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n} else {\n  require('./app.js');\n}\n```\n\n### 2. Database Connection Pooling\n\n### 3. Caching Strategy\n\n### 4. Load Balancing\n\n## Results\n\n- 10x improvement in response times\n- 99.9% uptime achieved\n- Cost reduced by 40%",
			url: "https://news.ycombinator.com/item?id=123456",
			authorName: "startup_cto",
			authorId: "user_cto_001",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=startup_cto",
			publishedAt: new Date(`${date}T13:45:00Z`),
			engagement: { likes: 456, comments: 78, shares: 34 },
			media: [],
			tags: ["nodejs", "scaling", "performance", "infrastructure"],
			rawData: {},
			fetchedAt: new Date(),
		},

		// Paper Summarizer の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440301",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "paper_arxiv_001",
			title: "Attention Is All You Need - Transformer Architecture Explained",
			content:
				'# The Transformer: Revolutionizing Deep Learning\n\n## Abstract Summary\n\nThe paper "Attention Is All You Need" introduced the Transformer architecture, which has become the foundation for modern NLP models like GPT and BERT.\n\n## Key Contributions\n\n### 1. Self-Attention Mechanism\n\nThe core innovation is the self-attention mechanism that allows models to weigh the importance of different words in a sequence.\n\n### 2. Positional Encoding\n\nSince Transformers don\'t have inherent sequential processing, positional encoding provides sequence information.\n\n### 3. Multi-Head Attention\n\nMultiple attention heads allow the model to attend to information from different representation subspaces.\n\n## Architecture\n\n```\nEncoder → Self-Attention → Feed Forward → Output\nDecoder → Self-Attention → Cross-Attention → Feed Forward → Output\n```\n\n## Impact\n\n- Foundation for GPT, BERT, T5\n- Enabled large language models\n- Revolutionized natural language processing\n\n## Mathematical Formulation\n\nAttention(Q,K,V) = softmax(QK^T/√d_k)V',
			url: "https://arxiv.org/abs/1706.03762",
			authorName: "vaswani_et_al",
			authorId: "google_brain",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=google_research",
			publishedAt: new Date(`${date}T08:15:00Z`),
			engagement: { likes: 1234, comments: 89, shares: 156 },
			media: [],
			tags: ["transformer", "attention", "nlp", "deep-learning", "arxiv"],
			rawData: {},
			fetchedAt: new Date(),
		},

		// Tech Feed の記事
		{
			id: "550e8400-e29b-41d4-a716-446655440401",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "tech_news_001",
			title: "Apple Announces M4 Chip: 40% Faster Than M3",
			content:
				"# Apple M4 Chip: Next-Generation Performance\n\n## Breakthrough Performance\n\nApple's new M4 chip delivers unprecedented performance for professional workflows.\n\n## Key Specifications\n\n- **CPU**: 12-core (8 performance, 4 efficiency)\n- **GPU**: 32-core with ray tracing\n- **Neural Engine**: 40 TOPS AI performance\n- **Memory**: Up to 128GB unified memory\n\n## Performance Gains\n\n- 40% faster CPU than M3\n- 35% faster GPU rendering\n- 2x AI/ML performance\n- 50% better power efficiency\n\n## Applications\n\n### Video Editing\n- 8K ProRes playback\n- Real-time color grading\n- Multiple stream editing\n\n### 3D Rendering\n- Ray tracing acceleration\n- Metal 3 optimization\n- Blender performance boost\n\n### Machine Learning\n- Core ML optimizations\n- TensorFlow acceleration\n- PyTorch native support\n\n## Availability\n\nM4 MacBook Pro and iMac models available Q2 2025.",
			url: "https://www.apple.com/newsroom/m4-chip",
			authorName: "apple_newsroom",
			authorId: "apple_official",
			authorAvatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=apple",
			publishedAt: new Date(`${date}T15:20:00Z`),
			engagement: { likes: 2345, comments: 167, shares: 234 },
			media: [],
			tags: ["apple", "m4-chip", "performance", "hardware", "mac"],
			rawData: {},
			fetchedAt: new Date(),
		},

		// プレーンテキストの記事例（Tech Feed）
		{
			id: "550e8400-e29b-41d4-a716-446655440402",
			configId: "440e8400-e29b-41d4-a716-446655440001",
			externalId: "tech_news_002",
			title: "Google Announces Breakthrough in Quantum Computing",
			content:
				"Google today announced a major breakthrough in quantum computing with their new quantum processor achieving quantum supremacy in complex mathematical calculations.\n\nThe new quantum processor, code-named 'Willow', demonstrated the ability to perform certain calculations exponentially faster than the world's most powerful supercomputers.\n\nKey achievements:\n\n• Performed a specific calculation in 200 seconds that would take classical computers 10,000 years\n• Achieved 99.9% fidelity in quantum operations\n• Demonstrated error correction at the quantum level\n• Scaled to 70 quantum bits (qubits)\n\nThis breakthrough represents a significant step toward practical quantum computing applications in:\n\n- Cryptography and cybersecurity\n- Drug discovery and molecular simulation\n- Financial modeling and risk analysis\n- Climate modeling and optimization problems\n- Machine learning and AI acceleration\n\nWhile practical quantum computers for everyday use are still years away, this advancement brings us closer to solving complex real-world problems that are currently impossible with classical computing.\n\nThe research paper detailing the breakthrough has been published in Nature and peer-reviewed by leading quantum physicists worldwide.\n\nGoogle's quantum computing team, led by Dr. John Martinez, emphasized that this is just the beginning of the quantum computing revolution.",
			url: "https://blog.google/technology/ai/quantum-computing-breakthrough",
			authorName: "google_quantum_team",
			authorId: "google_research",
			authorAvatarUrl:
				"https://api.dicebear.com/7.x/avataaars/svg?seed=google_quantum",
			publishedAt: new Date(`${date}T10:15:00Z`),
			engagement: { likes: 5678, comments: 432, shares: 891 },
			media: [],
			tags: [
				"quantum-computing",
				"google",
				"breakthrough",
				"research",
				"technology",
			],
			rawData: {},
			fetchedAt: new Date(),
		},
	];
}
