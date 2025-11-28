# Graphical Password Authentication System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

A cutting-edge graphical password authentication system implementing two innovative authentication methods: **Cued Click Points** and **Image Sequence**. This system enhances security and usability by replacing traditional text-based passwords with intuitive visual interactions.

**Live Demo: https://graphical-password-authentication-tau.vercel.app/

## 🌟 Features

### Two Authentication Methods

#### 1. Cued Click Points
- Users select 5 specific points on a single background image during registration
- During login, users reproduce the same click sequence on the same image
- Tolerance-based validation accepts clicks within a small radius of original points
- Spatial memory makes passwords easier to remember than complex character combinations

#### 2. Image Sequence
- Users select 4 images from a grid of 12 images in a specific order during registration
- During login, the same images are presented in a randomized arrangement
- Users must select the same images in the correct sequence
- Randomization prevents shoulder surfing attacks

### Security Benefits
- **Shoulder Surfing Resistant:** Visual interactions are harder to observe and replicate
- **Enhanced Memorability:** Leverages human spatial memory for better recall
- **Complexity Without Complexity:** Creates high-entropy passwords without complex character requirements
- **IEEE-Inspired Implementation:** Based on academic research in graphical authentication

### Technical Features
- **Responsive Design:** Works seamlessly across desktop and mobile devices
- **Visual Feedback:** Real-time indicators for successful interactions
- **Modern Tech Stack:** Built with React.js, TypeScript, and TailwindCSS
- **Clean UI/UX:** Intuitive interface optimized for user testing and research

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/graphical-password-authentication.git
cd graphical-password-authentication
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready application
- `npm run preview` - Previews the built application locally
- `npm run lint` - Runs ESLint to check for code issues

## 🛠️ Architecture

### Core Components
- **CuedClickPoints**: Implements the cued click points authentication method
- **ImageSequenceAuth**: Handles the image sequence authentication flow
- **ImageClickArea**: Interactive component for capturing user clicks on images
- **AuthContext**: Centralized authentication state management

### Data Management
- **Local Storage**: User credentials and authentication data are stored in browser localStorage
- **In-Memory Validation**: Authentication checks are performed client-side for demonstration purposes

### Technical Stack
- **Frontend**: React.js with TypeScript
- **Styling**: TailwindCSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

## 🔧 How It Works

### Cued Click Points Method
1. **Registration Phase**:
   - User selects a username and chooses the "Cued Click Points" method
   - System displays a background image
   - User clicks 5 distinct points on the image in a chosen sequence
   - System stores the coordinates of these points with tolerance values

2. **Authentication Phase**:
   - User enters their username
   - System displays the same background image
   - User reproduces the same click sequence
   - System validates each click against stored coordinates within tolerance radius

### Image Sequence Method
1. **Registration Phase**:
   - User selects a username and chooses the "Image Sequence" method
   - System displays a 3x4 grid of 12 distinct images
   - User selects 4 images in a specific order
   - System stores the selected image IDs and their sequence

2. **Authentication Phase**:
   - User enters their username
   - System displays the same 12 images in a randomized arrangement
   - User selects the same 4 images in the correct sequence
   - System validates the sequence matches the registered pattern

## 📊 Research Context

This implementation is inspired by academic research in graphical authentication systems, particularly:
- **Cued Click Points Model**: Based on techniques that leverage human spatial memory
- **Image Sequence Recognition**: Utilizes cognitive recognition patterns for authentication

The system is designed for educational purposes, research demonstrations, and as a foundation for more advanced authentication implementations.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests for improvements, bug fixes, or new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Images sourced from [Pexels](https://www.pexels.com/) for demonstration purposes
- Inspired by academic research in graphical authentication systems
- Built with modern web technologies for optimal performance and user experience
