# ✨ AnimeVerse - Ghibli-Inspired Anime Search

A beautiful, Ghibli-inspired anime search application with Apple's Liquid design concept. Built with React, TypeScript, Redux, and Material UI featuring glass morphism, smooth animations, and a dreamy aesthetic.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The application will start on **http://localhost:4000**

## 📋 Features

### Core Features
- **Instant Search**: Real-time search with 250ms debouncing
- **Server-Side Pagination**: Efficient data loading with pagination controls
- **Detailed Anime Information**: View comprehensive details for each anime
- **Redux State Management**: Centralized state management using Redux Toolkit
- **React Router Navigation**: Seamless navigation between search and detail pages

### Bonus Implementation

#### User Experience Enhancements
- **Ghibli-Inspired Liquid Theme**: Dreamy Apple Liquid design with Studio Ghibli color palette
- **Glass Morphism UI**: Frosted glass effect with backdrop blur and transparency
- **Smart Navbar**: Search bar in navbar that hides app name when focused
- **Anime Suggestions**: Curated collections of top-rated and trending anime on home page
- **Genre Filtering**: 11 genre categories for refined searching
- **Skeleton Loaders**: Smooth loading states that maintain layout consistency  
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Liquid Animations**: Smooth card transforms with cubic-bezier easing
- **Search Result Counter**: Shows the number of results found (24 per page)

#### Technical Excellence
- **Request Cancellation**: Automatically cancels previous API requests when typing
- **Race Condition Handling**: Prevents stale data from appearing in search results
- **Error Handling**: Comprehensive error handling for network failures and API errors
- **TypeScript Throughout**: Strict typing with minimal use of 'any' types
- **Clean Code Organization**: Logical folder structure with reusable components

## 🛠️ Tech Stack

- **React 19.2.0** - UI library with hooks-only implementation
- **TypeScript 4.9.5** - Static typing
- **Redux Toolkit 2.9.2** - State management
- **React Router 7.9.4** - Client-side routing
- **Material UI 7.3.4** - UI component library
- **Axios 1.12.2** - HTTP client with request cancellation
- **Jikan API v4** - Anime data source (no authentication required)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimeCard.tsx           # Card displaying anime preview
│   ├── AnimeCardSkeleton.tsx   # Loading skeleton for cards
│   ├── SearchBar.tsx           # Search input component
│   ├── EmptyState.tsx          # Empty state message
│   └── ErrorMessage.tsx        # Error display component
├── pages/              # Page components
│   ├── SearchPage.tsx          # Main search page
│   └── DetailPage.tsx          # Anime detail page
├── store/              # Redux store configuration
│   ├── index.ts                # Store setup
│   ├── hooks.ts                # Typed hooks
│   └── slices/
│       ├── searchSlice.ts      # Search state management
│       └── detailSlice.ts      # Detail state management
├── services/           # API services
│   └── api.ts                  # Jikan API integration
├── hooks/              # Custom React hooks
│   └── useDebounce.ts          # Debounce hook
├── types/              # TypeScript definitions
│   └── anime.ts                # Anime type definitions
├── theme/              # Material UI theme
│   └── theme.ts                # Custom theme configuration
├── App.tsx             # Main app component with routing
└── index.tsx           # App entry point with Redux Provider
```

## 🎨 Design Features

### Ghibli-Inspired Apple Liquid Design
- **Glass Morphism**: Frosted glass cards with backdrop blur and transparency
- **Liquid Animations**: Smooth cubic-bezier transitions inspired by Apple's fluid design
- **Gradient Backgrounds**: Soft, dreamy gradients inspired by Studio Ghibli films
- **Custom Scrollbar**: Gradient scrollbar with Ghibli colors
- **Responsive Grid**: 1-2-3-4 column layout based on screen size

### Color Palette
- **Sky Blue** (#87CEEB) - Howl's Moving Castle skies
- **Forest Green** (#4A7C59) - Princess Mononoke forests
- **Deep Teal** (#2C5F5D) - Ocean depth
- **Sunset Orange** (#FFB347) - Warm twilight
- **Soft Pink** (#FFB6C1) - Ponyo's gentle spirit

### Responsive Breakpoints
- **Mobile (xs)**: 1 column - Perfect for on-the-go browsing
- **Tablet (sm)**: 2 columns - Comfortable two-column view
- **Desktop (md)**: 3 columns - Balanced grid layout
- **Large Desktop (lg)**: 4 columns - Maximum content visibility

## 🔧 API Integration

The app uses the [Jikan API v4](https://docs.api.jikan.moe/) which provides:
- Free access with no authentication required
- Comprehensive anime database from MyAnimeList
- Server-side pagination support
- Detailed anime information including genres, studios, and trailers

### API Features Implemented
- Search with query and pagination parameters
- Request cancellation for instant search
- Error handling for rate limiting and network failures
- Proper TypeScript typing for all API responses

## 💡 Key Implementation Details

### Instant Search with Debouncing
```typescript
// Custom debounce hook delays API calls by 250ms
const debouncedQuery = useDebounce(query, 250);

// Effect triggers search when debounced value changes
useEffect(() => {
  if (debouncedQuery.trim()) {
    dispatch(fetchAnimeSearch({ query: debouncedQuery, page: currentPage }));
  }
}, [debouncedQuery, currentPage, dispatch]);
```

### Request Cancellation
```typescript
// Previous requests are cancelled when new search is initiated
if (searchCancelToken) {
  searchCancelToken.cancel('New search initiated');
}
searchCancelToken = axios.CancelToken.source();
```

### Redux State Management
- **searchSlice**: Manages search query, results, pagination, and loading state
- **detailSlice**: Manages anime detail data and loading state
- **Typed Hooks**: Custom `useAppDispatch` and `useAppSelector` for type safety

## 🚢 Deployment

The application is ready to be deployed to any static hosting service:

### Netlify (Recommended)
```bash
npm run build
# Deploy the build folder to Netlify
```

### Other Platforms
- Vercel
- GitHub Pages
- Render
- Firebase Hosting

## 📝 Scripts

- `npm run dev` - Start development server on port 4000
- `npm start` - Start development server (default port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests

### Note on Webpack Deprecation Warnings
You may see webpack deprecation warnings about `onAfterSetupMiddleware` and `onBeforeSetupMiddleware`. These are informational warnings from Create React App and do not affect functionality. They will be resolved when CRA updates to webpack 5's new API.

## 🎯 Requirements Met

✅ React 18+ with hooks-only implementation  
✅ TypeScript with proper typing throughout  
✅ React Router for navigation  
✅ Redux Toolkit for state management  
✅ Material UI component library  
✅ Server-side pagination  
✅ Instant search with 250ms debouncing  
✅ Request cancellation for in-flight requests  
✅ npm package manager only  
✅ Runs on port 4000 with `npm run dev`  
✅ No environment variables required  
✅ Netflix-inspired responsive layout  

## 🎁 Bonus Features Implemented

✅ Skeleton loading states  
✅ Empty state handling with helpful messages  
✅ Comprehensive error handling  
✅ Race condition handling  
✅ Mobile responsive design  
✅ Creative Netflix-inspired UI  
✅ Smooth animations and transitions  
✅ Custom scrollbar styling  
✅ Search result counter  
✅ Organized and maintainable code structure  

## 🚀 Live Demo

Once deployed, the live site will be available here:

- https://yoprint-animeverse.netlify.app/

Update this link after Netlify deployment.

## ⏱️ Real-Time Debounce Indicator

- Displays a spinner and "250ms" label while typing to indicate the debounce window.
- Disappears when debounce completes and the search request is fired.
- Implemented in `src/components/Navbar.tsx` and powered by `useDebounce()` in `src/hooks/useDebounce.ts`.

## 💾 Caching and Cross-Tab Sync

- Client-side cache with TTL via `localStorage` to reduce API calls and speed up repeated searches.
- Cache keys cover search results, top anime, season now, and anime details.
- Cross-tab synchronization with `storage` events to refresh data when cache updates in another tab.
- Files:
  - `src/utils/cache.ts` – cache set/get/clear with TTL and `onCacheChange()` listener.
  - `src/services/api.ts` – integrates caching for all major endpoints.
  - `src/pages/SearchPage.tsx` – listens for cache changes and refreshes results.
- UI widget `CacheStatus` shows cache size and allows clearing cache.

## 📄 License

This project is created for assessment purposes.
