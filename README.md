# SilkCraft - Premium Silk Saree Management System

A comprehensive web application for managing premium silk saree inventory, sales, and customer relationships. Built with modern React technologies and featuring both e-commerce frontend and administrative backend functionality.

## 🌟 Features

### Customer Features
- **Product Catalog**: Browse beautiful silk sarees with detailed product information
- **Shopping Cart**: Add items to cart and manage quantities
- **User Authentication**: Secure login and registration system
- **Order Tracking**: Track order status and delivery updates
- **Product Detail Views**: High-quality images and detailed product descriptions

### Administrative Features
- **Inventory Management**: Track stock levels, add new products, manage variants
- **Order Management**: Process orders, update status, handle fulfillment
- **User Management**: Manage customer accounts and permissions
- **Reports & Analytics**: Sales reports, inventory reports, and business insights
- **Admin Dashboard**: Comprehensive overview of business metrics

### Point of Sale (POS)
- **POS Dashboard**: Quick access to sales functionality
- **POS Checkout**: Streamlined checkout process for in-store sales

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS for responsive design
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Routing**: React Router for navigation
- **Icons**: Lucide React icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShivamPatel145/SilkCraft.git
   cd SilkCraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── admin/      # Admin-specific components
│   ├── shared/     # Shared components
│   └── ui/         # shadcn/ui components
├── contexts/        # React context providers
├── data/           # Static data and configurations
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── pages/          # Page components
    ├── admin/      # Admin panel pages
    ├── auth/       # Authentication pages
    └── pos/        # Point of sale pages
```

## 🎨 UI Components

This project uses shadcn/ui components built on top of Radix UI primitives, providing:
- Accessible components out of the box
- Customizable with Tailwind CSS
- Type-safe with TypeScript
- Modern design patterns

## 🔒 Authentication

The application includes a complete authentication system with:
- User registration and login
- Password reset functionality
- Protected routes for admin areas
- Role-based access control

## 📱 Responsive Design

SilkCraft is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

The application can be deployed to various platforms:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Traditional web hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Shivam Patel**
- GitHub: [@ShivamPatel145](https://github.com/ShivamPatel145)

---

Built with ❤️ for the silk saree industry
