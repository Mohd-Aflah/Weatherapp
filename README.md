# Weather Dashboard

A modern, interactive weather dashboard application that provides current weather information and 5-day forecasts for cities worldwide.

**Version:** 1.0.0  
**Year:** 2025  
**Live Demo:** https://mohd-aflah.github.io/Weatherapp/

## 👥 Authors

- **Mohammed Aflah** - Full-Stack Development (Frontend, Backend & UI/UX)
- **Ayra Riyaz** - Full-Stack Development (Frontend, Backend & UI/UX)

*Both developers collaborated on all aspects of the project including frontend, backend, design, and deployment.*

## 📋 Description

Weather Dashboard is a full-stack web application that allows users to search for weather information for any city in the world. The application features a clean, responsive interface with real-time weather data and extended forecasts, delivering a seamless user experience across all devices.

## 🚀 Key Features

- 🌤️ **Real-time Weather Data** - Current conditions from OpenWeatherMap API
- 📅 **5-Day Forecast** - Extended weather predictions with daily summaries
- 🔍 **Smart Search** - Instant weather lookup by city name
- 🎨 **Beautiful UI** - Sky-blue gradients with smooth animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized API calls with efficient data handling
- 🌐 **Secure Backend** - CORS-enabled REST API architecture

## 🛠️ Technology Stack

### **Frontend Technologies**
- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with:
  - CSS Grid & Flexbox layouts
  - Custom animations and transitions
  - Responsive design with media queries
  - Gradient backgrounds and modern UI effects
- **JavaScript (ES6+)** - Modern JavaScript featuring:
  - Async/await for API calls
  - Fetch API for HTTP requests
  - DOM manipulation and event handling
  - Dynamic content rendering

### **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **Axios** - Promise-based HTTP client for API requests
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### **APIs & External Services**
- **OpenWeatherMap API** - Weather data provider
  - Current Weather Data API (v2.5)
  - 5-Day Weather Forecast API (v2.5)
  - Weather icons and condition codes
  - Metric unit system (Celsius, m/s)

### **Deployment Platforms**
- **Frontend Hosting:** GitHub Pages
- **Backend Hosting:** Render (Cloud Platform)

### **Development Tools**
- **Nodemon** - Auto-restart development server
- **Git** - Version control
- **GitHub** - Code repository and collaboration

## 📁 Project Architecture

```
Weatherapp/
├── backend/
│   ├── server.js          # Express REST API server
│   ├── package.json       # Backend dependencies & scripts
│   └── .env              # Environment configuration (API keys)
├── docs/                  # Frontend application
│   ├── index.html        # Main HTML structure
│   ├── script.js         # Frontend logic & API integration
│   ├── style.css         # Complete styling & animations
│   └── images/
│       └── image.png     # Background imagery
├── LICENSE               # MIT License
└── README.md            # Project documentation
```

## � API Architecture

### **Backend Endpoints**

#### Get Current Weather
```
GET /api/weather?city={cityName}
```
**Returns:** Temperature, humidity, wind speed, weather conditions, and icon

#### Get 5-Day Forecast
```
GET /api/forecast?city={cityName}
```
**Returns:** Weather predictions at 3-hour intervals for 5 days

### **Data Flow**
```
User Input → Frontend (JS) → Backend API → OpenWeatherMap → Backend → Frontend → UI Update
```

## 🎨 Design Elements

### **Color Scheme**
- Primary Gradient: Sky blue (#cceeff → #a3d8f4)
- Accent Color: Green (#04c65c)
- Background: Dark overlay on custom image
- Text: Neutral grays for readability

### **Animations**
- Fade-in effects on page load
- Card entrance animations
- Hover transformations on interactive elements
- Smooth tab transitions

### **Responsive Breakpoints**
- Desktop: 500px and above
- Mobile: Below 500px with stacked layouts

## 🌐 Live Deployment

- **Frontend URL:** https://mohd-aflah.github.io/Weatherapp/
- **Backend API:** https://weatherapp-jh3a.onrender.com

## 📝 Usage

1. Visit the live demo or run locally
2. Enter any city name in the search bar
3. Click the refresh button or press Enter
4. View current weather conditions
5. Switch to "5-Day Forecast" tab for extended predictions

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.

### MIT License

```
MIT License

Copyright (c) 2025 Mohammed Aflah and Ayra Riyaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📧 Contact

- **Mohammed Aflah** - [GitHub Profile](https://github.com/mohd-aflah)
- **Ayra Riyaz** - [GitHub Profile](https://github.com/AyraRiyaz)

## 🙏 Acknowledgments

- OpenWeatherMap for providing the weather API
- Icons from OpenWeatherMap
- Background image resources

---

**Made with ❤️ by Mohammed Aflah and Ayra Riyaz | Version 1.0.0 | © 2025**
