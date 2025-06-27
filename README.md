# 💼 HR Performance Dashboard

A comprehensive HR dashboard built with Next.js, React, and Tailwind CSS for tracking employee performance, managing bookmarks, and viewing detailed insights with full authentication system.

## 🚀 Features

### Core Features
- **🔐 Authentication System** - Secure login/logout with localStorage persistence
- **Employee Dashboard** - View and manage employee information with performance ratings
- **Search & Filter** - Advanced search and filtering by name, email, department, and performance rating
- **Employee Details** - Detailed employee profiles with tabs for Overview, Projects, and Feedback
- **Bookmark Management** - Save and manage favorite employees with quick actions
- **Analytics Dashboard** - Interactive charts showing department performance and bookmark trends
- **Protected Routes** - Automatic redirect to login for unauthenticated users
- **User Management** - User menu with profile info and logout functionality

### Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management with localStorage persistence
- **Chart.js** for data visualization
- **Lucide React** for icons
- **React Toastify** for notifications
- **Responsive Design** - Mobile-first approach
- **Custom Hooks** for reusable logic
- **Dark Mode Support** - Theme switching with persistence

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand with persistence
- **Authentication:** Custom auth system with localStorage
- **Charts:** Chart.js + react-chartjs-2
- **Icons:** Lucide React
- **Notifications:** React Toastify
- **Utilities:** clsx, framer-motion

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-dashboard
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

## 🔐 Authentication

### Demo Credentials
The application includes demo accounts for testing:

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Manager Account:**
- Email: `manager@example.com`
- Password: `manager123`

### Features
- **Persistent Login** - Stay logged in across browser sessions
- **Protected Routes** - Automatic redirect to login for unauthenticated users
- **User Menu** - Profile information and logout functionality
- **Toast Notifications** - Success/error messages for all auth actions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Login page
│   │   └── layout.tsx     # Auth layout
│   ├── page.tsx           # Dashboard homepage
│   ├── employee/[id]/     # Employee detail pages
│   ├── bookmarks/         # Bookmarks page
│   ├── analytics/         # Analytics page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   │   └── SignInForm.tsx # Login form
│   ├── common/           # Common components
│   │   ├── AppWrapper.tsx # Protected route wrapper
│   │   ├── ProtectedRoute.tsx # Route protection
│   │   ├── UserMenu.tsx  # User profile menu
│   │   └── AnimateElement.tsx # Animation wrapper
│   ├── ui/               # UI components (Button, Badge, Rating)
│   ├── EmployeeCard.tsx  # Employee card component
│   ├── SearchAndFilter.tsx # Search and filter component
│   └── Navigation.tsx    # Navigation component
├── hooks/                # Custom hooks
│   └── useInfiniteScroll.ts # Infinite scroll
├── lib/                  # Utilities and configurations
│   ├── store.ts          # HR Zustand store with persistence
│   ├── authStore.ts      # Authentication Zustand store
│   ├── api.ts            # API functions and mock data
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
    └── index.ts          # Type definitions
```

## 🎯 Key Features Explained

### 1. Authentication System
- **Sign-in Form** - Beautiful, responsive login form with validation
- **Protected Routes** - Automatic authentication checks
- **User Menu** - Profile display and logout functionality
- **Persistence** - Login state saved in localStorage

### 2. Dashboard Homepage (`/`)
- Fetches employee data from `https://dummyjson.com/users`
- Displays employee cards with performance ratings
- Real-time search and filtering
- Statistics cards showing key metrics
- **Persistent Data** - Employee data saved to localStorage

### 3. Employee Details (`/employee/[id]`)
- Comprehensive employee profile
- Tabbed interface (Overview, Projects, Feedback)
- Performance history with ratings
- Project assignments and status
- Feedback from managers and peers

### 4. Bookmarks (`/bookmarks`)
- Manage saved employees with persistence
- Quick actions (Promote, Assign to Project)
- Bulk operations (Clear All)
- Statistics for bookmarked employees
- **Real-time Badge Count** - Navigation shows bookmark count

### 5. Analytics (`/analytics`)
- Department performance charts
- Bookmark trends over time
- Detailed department breakdown table
- Interactive Chart.js visualizations
- **Persistent Charts** - Data available immediately on refresh

## 🔧 Customization

### Adding New Departments
Edit the `departments` array in `src/lib/api.ts`:
```typescript
const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Product',
  'Your New Department' // Add here
];
```

### Modifying Employee Data
Update the `generateMockEmployee` function in `src/lib/api.ts` to modify how employee data is generated.

### Authentication
Modify the dummy credentials in `src/lib/authStore.ts`:
```typescript
const DUMMY_ADMIN = {
  email: 'your-email@example.com',
  password: 'your-password',
  user: {
    id: '1',
    email: 'your-email@example.com',
    name: 'Your Name',
    role: 'admin' as const,
    avatar: 'your-avatar-url'
  }
};
```

### Styling
The project uses Tailwind CSS. You can customize the design by modifying the Tailwind classes or adding custom CSS in `src/app/globals.css`.

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🌙 Dark Mode

The dashboard includes a dark/light mode toggle that:
- Persists user preference in localStorage
- Automatically applies theme to all components
- Updates chart colors and styling
- Works seamlessly with authentication

## 🔒 Security Features

- **Protected Routes** - Automatic redirect for unauthenticated users
- **Persistent Authentication** - Login state maintained across sessions
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Proper loading indicators during auth checks

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project:
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Lucide](https://lucide.dev/) for the beautiful icons
- [DummyJSON](https://dummyjson.com/) for the mock API data
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications

---

Built with ❤️ using Next.js and modern web technologies.
Vaidik Singh Nirwan
