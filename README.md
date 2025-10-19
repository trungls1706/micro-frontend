# Micro Frontend Architecture Demo

This project demonstrates a micro frontend architecture with shared state management across independent applications.
https://micro-frontend-sigma.vercel.app

## Architecture Overview

The project consists of three applications:

1. **Host App** (Port 5173) - Main application container
2. **Products Remote** (Port 5001) - Product catalog micro frontend
3. **Cart Remote** (Port 5002) - Shopping cart micro frontend

## Shared State Management

All applications share state through a centralized store (`SharedStore.ts`) that:
- Manages product catalog
- Handles shopping cart operations
- Synchronizes state across all micro frontends
- Provides real-time updates using observer pattern

## Project Structure

```
project/
├── src/                          # Host application
│   ├── store/
│   │   └── SharedStore.ts       # Shared state store
│   ├── hooks/
│   │   └── useSharedStore.ts    # React hook for store
│   ├── components/
│   │   ├── ProductsRemote.tsx   # Local products component
│   │   └── CartRemote.tsx       # Local cart component
│   └── App.tsx                  # Host app entry
│
└── remote-apps/
    ├── products-app/            # Products micro frontend
    │   └── src/
    │       └── ProductsApp.tsx  # Standalone products app
    └── cart-app/                # Cart micro frontend
        └── src/
            └── CartApp.tsx      # Standalone cart app
```

## Setup & Installation

### 1. Install Dependencies for All Apps

```bash
# Install host app dependencies
npm install

# Install products remote app dependencies
cd remote-apps/products-app
npm install
cd ../..

# Install cart remote app dependencies
cd remote-apps/cart-app
npm install
cd ../..
```

### 2. Run All Applications

You need to run three separate dev servers in different terminals:

**Terminal 1 - Products Remote (Port 5001):**
```bash
cd remote-apps/products-app
npm run dev
```

**Terminal 2 - Cart Remote (Port 5002):**
```bash
cd remote-apps/cart-app
npm run dev
```

**Terminal 3 - Host App (Port 5173):**
```bash
npm run dev
```

### 3. Access the Application

Open your browser and navigate to:
- Host Application: http://localhost:5173
- Products Remote (standalone): http://localhost:5001
- Cart Remote (standalone): http://localhost:5002

## How It Works

### Module Federation

The project uses Vite Module Federation to enable runtime sharing of components:

- Remote apps expose their components via `remoteEntry.js`
- Host app consumes remote components dynamically
- React and React-DOM are shared across all apps to prevent duplication

### State Synchronization

1. **Shared Store**: A singleton store instance manages global state
2. **Observer Pattern**: Components subscribe to store changes
3. **React Hook**: `useSharedStore` provides React bindings
4. **Real-time Updates**: All components automatically re-render on state changes

### Example Flow

1. User browses products in the Products micro frontend
2. User clicks "Add to Cart"
3. Shared store updates cart state
4. Cart micro frontend automatically updates to show new items
5. Cart badge in header updates with item count

## Features

- Independent deployment of micro frontends
- Shared state across all applications
- Real-time synchronization
- Lazy loading of remote components
- Production-ready architecture

## Development Notes

- Each micro frontend can be developed and tested independently
- Changes to remote apps require their dev server to be running
- Hot Module Replacement (HMR) works for all applications
- Shared dependencies (React, React-DOM) are loaded only once

## Building for Production

Build all applications:

```bash
# Build host app
npm run build

# Build products remote
cd remote-apps/products-app
npm run build

# Build cart remote
cd remote-apps/cart-app
npm run build
```

Deploy each built application to separate servers/CDNs, ensuring the remote entry URLs in the host app's vite.config.ts point to the correct production URLs.
