export interface Example {
  name: string
  description: string
  json: string
}

const s = (data: unknown) => JSON.stringify(data, null, 2)

export const EXAMPLES: Example[] = [
  {
    name: 'React App',
    description: 'Vite + React + TypeScript',
    json: s({
      name: 'my-react-app',
      type: 'folder',
      children: [
        {
          name: 'src',
          type: 'folder',
          children: [
            { name: 'main.tsx', type: 'file', size: 1024 },
            { name: 'App.tsx', type: 'file', size: 2048 },
            { name: 'index.css', type: 'file', size: 512 },
            {
              name: 'components',
              type: 'folder',
              children: [
                { name: 'Button.tsx', type: 'file', size: 768 },
                { name: 'Modal.tsx', type: 'file', size: 1536 },
                { name: 'NavBar.tsx', type: 'file', size: 2048 },
              ],
            },
            {
              name: 'pages',
              type: 'folder',
              children: [
                { name: 'Home.tsx', type: 'file', size: 3072 },
                { name: 'About.tsx', type: 'file', size: 1024 },
              ],
            },
            {
              name: 'hooks',
              type: 'folder',
              children: [
                { name: 'useAuth.ts', type: 'file', size: 1024 },
                { name: 'useFetch.ts', type: 'file', size: 768 },
              ],
            },
            {
              name: 'utils',
              type: 'folder',
              children: [
                { name: 'api.ts', type: 'file', size: 2048 },
                { name: 'formatters.ts', type: 'file', size: 512 },
              ],
            },
          ],
        },
        {
          name: 'public',
          type: 'folder',
          children: [
            { name: 'favicon.ico', type: 'file', size: 1150 },
            { name: 'robots.txt', type: 'file', size: 67 },
          ],
        },
        { name: 'index.html', type: 'file', size: 512 },
        { name: 'package.json', type: 'file', size: 1024 },
        { name: 'tsconfig.json', type: 'file', size: 256 },
        { name: 'vite.config.ts', type: 'file', size: 512 },
      ],
    }),
  },
  {
    name: 'Python API',
    description: 'FastAPI backend',
    json: s({
      name: 'api',
      type: 'folder',
      children: [
        {
          name: 'app',
          type: 'folder',
          children: [
            { name: '__init__.py', type: 'file', size: 0 },
            { name: 'main.py', type: 'file', size: 3072 },
            { name: 'config.py', type: 'file', size: 1024 },
            {
              name: 'models',
              type: 'folder',
              children: [
                { name: '__init__.py', type: 'file', size: 0 },
                { name: 'user.py', type: 'file', size: 2048 },
                { name: 'post.py', type: 'file', size: 1536 },
              ],
            },
            {
              name: 'routes',
              type: 'folder',
              children: [
                { name: '__init__.py', type: 'file', size: 0 },
                { name: 'auth.py', type: 'file', size: 4096 },
                { name: 'posts.py', type: 'file', size: 2048 },
                { name: 'users.py', type: 'file', size: 1536 },
              ],
            },
            {
              name: 'services',
              type: 'folder',
              children: [
                { name: '__init__.py', type: 'file', size: 0 },
                { name: 'auth_service.py', type: 'file', size: 3072 },
                { name: 'post_service.py', type: 'file', size: 2048 },
              ],
            },
            {
              name: 'db',
              type: 'folder',
              children: [
                { name: '__init__.py', type: 'file', size: 0 },
                { name: 'database.py', type: 'file', size: 1536 },
                { name: 'migrations', type: 'folder', children: [] },
              ],
            },
          ],
        },
        {
          name: 'tests',
          type: 'folder',
          children: [
            { name: '__init__.py', type: 'file', size: 0 },
            { name: 'test_auth.py', type: 'file', size: 2048 },
            { name: 'test_posts.py', type: 'file', size: 1536 },
          ],
        },
        { name: 'requirements.txt', type: 'file', size: 512 },
        { name: '.env.example', type: 'file', size: 256 },
        { name: 'Dockerfile', type: 'file', size: 1024 },
        { name: 'docker-compose.yml', type: 'file', size: 768 },
        { name: 'README.md', type: 'file', size: 4096 },
      ],
    }),
  },
  {
    name: 'Monorepo',
    description: 'Turborepo with apps & packages',
    json: s({
      name: 'monorepo',
      type: 'folder',
      children: [
        {
          name: 'apps',
          type: 'folder',
          children: [
            {
              name: 'web',
              type: 'folder',
              children: [
                {
                  name: 'app',
                  type: 'folder',
                  children: [
                    { name: 'layout.tsx', type: 'file', size: 1024 },
                    { name: 'page.tsx', type: 'file', size: 2048 },
                    { name: 'globals.css', type: 'file', size: 512 },
                    {
                      name: 'dashboard',
                      type: 'folder',
                      children: [
                        { name: 'page.tsx', type: 'file', size: 3072 },
                        {
                          name: 'settings',
                          type: 'folder',
                          children: [{ name: 'page.tsx', type: 'file', size: 2048 }],
                        },
                      ],
                    },
                  ],
                },
                { name: 'package.json', type: 'file', size: 512 },
                { name: 'next.config.mjs', type: 'file', size: 256 },
              ],
            },
            {
              name: 'docs',
              type: 'folder',
              children: [
                {
                  name: 'pages',
                  type: 'folder',
                  children: [
                    { name: 'index.mdx', type: 'file', size: 4096 },
                    { name: 'getting-started.mdx', type: 'file', size: 3072 },
                  ],
                },
                { name: 'package.json', type: 'file', size: 512 },
              ],
            },
          ],
        },
        {
          name: 'packages',
          type: 'folder',
          children: [
            {
              name: 'ui',
              type: 'folder',
              children: [
                {
                  name: 'src',
                  type: 'folder',
                  children: [
                    { name: 'Button.tsx', type: 'file', size: 768 },
                    { name: 'Card.tsx', type: 'file', size: 1024 },
                    { name: 'Dialog.tsx', type: 'file', size: 2048 },
                    { name: 'index.ts', type: 'file', size: 256 },
                  ],
                },
                { name: 'package.json', type: 'file', size: 512 },
              ],
            },
            {
              name: 'utils',
              type: 'folder',
              children: [
                {
                  name: 'src',
                  type: 'folder',
                  children: [
                    { name: 'format.ts', type: 'file', size: 1024 },
                    { name: 'validate.ts', type: 'file', size: 768 },
                    { name: 'index.ts', type: 'file', size: 128 },
                  ],
                },
                { name: 'package.json', type: 'file', size: 512 },
              ],
            },
            {
              name: 'config',
              type: 'folder',
              children: [
                { name: 'eslint.js', type: 'file', size: 512 },
                { name: 'tsconfig.json', type: 'file', size: 256 },
                { name: 'package.json', type: 'file', size: 256 },
              ],
            },
          ],
        },
        { name: 'turbo.json', type: 'file', size: 512 },
        { name: 'package.json', type: 'file', size: 1024 },
        { name: 'pnpm-workspace.yaml', type: 'file', size: 128 },
      ],
    }),
  },
  {
    name: 'iOS App',
    description: 'Swift / Xcode project',
    json: s({
      name: 'MyApp',
      type: 'folder',
      children: [
        {
          name: 'MyApp',
          type: 'folder',
          children: [
            { name: 'MyAppApp.swift', type: 'file', size: 512 },
            { name: 'ContentView.swift', type: 'file', size: 2048 },
            { name: 'Info.plist', type: 'file', size: 2048 },
            {
              name: 'Models',
              type: 'folder',
              children: [
                { name: 'User.swift', type: 'file', size: 1536 },
                { name: 'Post.swift', type: 'file', size: 1024 },
                { name: 'APIResponse.swift', type: 'file', size: 768 },
              ],
            },
            {
              name: 'Views',
              type: 'folder',
              children: [
                { name: 'HomeView.swift', type: 'file', size: 3072 },
                { name: 'ProfileView.swift', type: 'file', size: 2048 },
                { name: 'LoginView.swift', type: 'file', size: 1536 },
                {
                  name: 'Components',
                  type: 'folder',
                  children: [
                    { name: 'AvatarView.swift', type: 'file', size: 768 },
                    { name: 'PostCard.swift', type: 'file', size: 1024 },
                    { name: 'LoadingView.swift', type: 'file', size: 512 },
                  ],
                },
              ],
            },
            {
              name: 'Services',
              type: 'folder',
              children: [
                { name: 'APIService.swift', type: 'file', size: 4096 },
                { name: 'AuthService.swift', type: 'file', size: 2048 },
                { name: 'CacheService.swift', type: 'file', size: 1024 },
              ],
            },
            {
              name: 'Resources',
              type: 'folder',
              children: [
                { name: 'Localizable.strings', type: 'file', size: 2048 },
                { name: 'LaunchScreen.storyboard', type: 'file', size: 3072 },
              ],
            },
          ],
        },
        {
          name: 'MyAppTests',
          type: 'folder',
          children: [
            { name: 'MyAppTests.swift', type: 'file', size: 1024 },
            { name: 'MockAPIService.swift', type: 'file', size: 2048 },
            { name: 'UserModelTests.swift', type: 'file', size: 1536 },
          ],
        },
        {
          name: 'MyAppUITests',
          type: 'folder',
          children: [
            { name: 'MyAppUITests.swift', type: 'file', size: 1024 },
            { name: 'MyAppUITestsLaunchTests.swift', type: 'file', size: 512 },
          ],
        },
      ],
    }),
  },
]
