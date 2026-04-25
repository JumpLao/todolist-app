# TodoList Web Application

A simple, fast, and privacy-focused todo application built with Next.js 15, TypeScript, and Tailwind CSS. All data is stored locally in your browser using localStorage — no accounts, no cloud sync, no tracking.

## Features

- ✅ Add tasks with text input (Enter key or button)
- ✅ Mark tasks as complete/incomplete
- ✅ Delete individual tasks
- ✅ Data persists in localStorage
- ✅ Works offline
- ✅ Mobile-responsive design
- ✅ Keyboard navigation support
- ✅ WCAG 2.1 Level AA accessible
- ✅ Auto-focus input on page load
- ✅ Empty state message
- ✅ Error handling for storage issues

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Storage:** localStorage API
- **Testing:** Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todolist-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
todolist-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── AddButton.tsx
│   ├── Checkbox.tsx
│   ├── DeleteButton.tsx
│   ├── EmptyState.tsx
│   ├── ErrorBanner.tsx
│   ├── TaskInput.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── hooks/                  # Custom React hooks
│   └── use-tasks.ts       # Task state management hook
├── lib/                    # Utility libraries
│   ├── storage.ts         # localStorage service
│   └── types.ts           # TypeScript types
├── __tests__/             # Unit tests
│   └── lib/
│       └── storage.test.ts
└── public/                # Static assets
```

## Data Model

### Task Object

```typescript
interface Task {
  id: string;        // UUID v4
  text: string;      // Max 500 characters
  completed: boolean;
  createdAt: string; // ISO 8601 timestamp
}
```

### localStorage Schema

| Key | Value |
|-----|-------|
| `todolist_tasks` | JSON array of Task objects |

## Accessibility

This application follows WCAG 2.1 Level AA guidelines:

- All interactive elements have `aria-label` attributes
- Keyboard navigation via Tab and Enter/Space keys
- Visible focus indicators on all controls
- Touch targets ≥ 44px × 44px on mobile
- Color contrast ratio ≥ 4.5:1
- Screen reader compatible with ARIA roles

## Performance

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s
- **Bundle Size:** < 100KB (gzipped)
- Static export for optimal CDN performance

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Limitations

- **No cross-device sync:** Data is stored locally on each device
- **Storage limit:** ~5-10MB depending on browser (roughly 5,000-10,000 tasks)
- **No account system:** Cannot recover data if browser storage is cleared
- **No undo:** Deleted tasks cannot be recovered

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Deploy with default settings

The app uses static export (`output: 'export'`) for optimal performance.

### Other Platforms

Any static hosting service works:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- localStorage operations (load, save, validation)
- Error handling (unavailable storage, quota exceeded)
- Task creation (UUID generation, timestamp formatting)
- Input validation (empty, max length)

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
