# Projects Information Database

This file contains detailed information about all projects in the portfolio. This information is preserved for future updates and design revisions.

---

## 1. Network Proxy Server & QoS Testing System (Tubes)

### Project Overview
A comprehensive network testing system implementing a 3-device architecture (Web Server, Proxy Server, Client) for Quality of Service (QoS) analysis and HTTP caching.

### Technologies
- **Backend**: Python 3
- **Protocols**: TCP/HTTP, UDP
- **Tools**: Wireshark (packet analysis)
- **Architecture**: Multi-threaded server, Proxy caching, Client simulation

### Key Features
- **Web Server**: Multi-threaded HTTP server with UDP echo server
- **Proxy Server**: HTTP proxy with intelligent caching (HIT/MISS mechanism)
- **Client**: Multiple testing modes (Single HTTP, UDP QoS, Multi-client, Browser mode)
- **QoS Analysis**: Latency, Jitter, Packet Loss measurement
- **Network Testing**: Throughput analysis, connection logging

### Project Structure
```
Tubes/
├── Web_Server.py          # HTTP & UDP server
├── Proxy_Server.py        # HTTP proxy with cache
├── Client.py              # Testing client
├── setup_config.py        # IP configuration helper
├── www/                   # Web content directory
└── qos_results.csv       # QoS test results
```

### Testing Modes
1. Single Client - HTTP Test (throughput measurement)
2. Single Client - UDP QoS Test (latency, jitter, packet loss)
3. Multi-Client Simulation (5 concurrent users)
4. Browser Mode (visual HTML rendering)

### Achievements
- Implemented efficient HTTP caching mechanism
- Real-time QoS metrics collection and analysis
- Multi-threaded architecture for concurrent connections
- Comprehensive network performance testing suite

### Learning Outcomes
- Deep understanding of HTTP protocol and proxy architecture
- Network performance analysis and QoS metrics
- Socket programming in Python
- Multi-threading and concurrent request handling

---

## 2. Lost & Found Web Application (LostnFound)

### Project Overview
A full-stack web application for managing lost and found items, built with Spring Boot backend and vanilla JavaScript frontend.

### Technologies
- **Backend**: Java 21, Spring Boot 3.5.6
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Database**: MySQL
- **Security**: Spring Security, JWT Authentication
- **Build Tool**: Maven
- **API Testing**: Bruno (REST client)

### Key Features
- **User Management**: Registration, authentication, JWT-based security
- **Item Management**: Report lost items, browse found items
- **File Upload**: Image upload for lost/found items
- **RESTful API**: Complete CRUD operations
- **Responsive Frontend**: Mobile-friendly interface

### Project Structure
```
LostnFound/
├── LostnFound/              # Spring Boot backend
│   ├── src/main/java/       # Java source code
│   ├── pom.xml              # Maven dependencies
│   └── application.properties
├── LostnFound-FE/           # Frontend
│   ├── src/
│   │   ├── pages/           # HTML pages
│   │   └── assets/          # CSS & JS
│   └── package.json
└── bruno.json               # API collection
```

### API Endpoints
- `/api/auth/*` - Authentication endpoints
- `/api/users/*` - User management
- `/api/barang/*` - Lost/Found items management
- `/api/pelaporan/*` - Reporting endpoints

### Achievements
- Full-stack application with secure authentication
- RESTful API design and implementation
- File upload and storage system
- Responsive web interface

### Learning Outcomes
- Spring Boot framework and dependency injection
- JWT authentication and security implementation
- RESTful API design principles
- Frontend-backend integration

---

## 3. Realshyt Fashion E-Commerce Platform

### Project Overview
A modern e-commerce platform for streetwear fashion brand, featuring React TypeScript frontend and Spring Boot REST API backend.

### Technologies
- **Backend**: Java 24, Spring Boot 3.5.7, Spring Data JPA
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Database**: H2 (Development), MySQL (Production)
- **Build Tools**: Gradle (Backend), npm (Frontend)
- **Icons**: Lucide React

### Key Features
- **Product Management**: CRUD operations, category filtering, search
- **Shopping Cart**: Add to cart, quantity management
- **Order Management**: Order creation and tracking
- **Admin Panel**: Product administration interface
- **Responsive Design**: Mobile-first, modern UI
- **Real-time Updates**: Dynamic product loading

### Project Structure
```
Realshyt/
├── fashion-backend/         # Spring Boot API
│   ├── src/main/java/      # Java source
│   ├── build.gradle         # Gradle configuration
│   └── README.md
├── fashion-frontend/        # React TypeScript
│   ├── src/
│   │   ├── RealshytFashion.tsx
│   │   ├── AdminPanel.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
└── DATABASE_SETUP.md
```

### API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Filter by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders

### Achievements
- Modern full-stack e-commerce solution
- Type-safe frontend with TypeScript
- RESTful API with Spring Boot
- Responsive and modern UI design
- Admin panel for product management

### Learning Outcomes
- React with TypeScript for type safety
- Spring Boot REST API development
- Database design and JPA implementation
- Modern UI/UX with Tailwind CSS
- Full-stack application architecture

---

## 4. Abalone Dataset Machine Learning Analysis

### Project Overview
Machine learning classification project analyzing abalone dataset to predict age (rings) using physical measurements. Implements K-Nearest Neighbour (KNN) and Naive Bayes algorithms.

### Technologies
- **Language**: Python
- **Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn
- **Environment**: Jupyter Notebook
- **Algorithms**: KNN, Naive Bayes
- **Data Processing**: Label Encoding, Standard Scaler

### Key Features
- **Data Preprocessing**: Handling missing values, encoding categorical data
- **Feature Engineering**: Standard scaling, feature selection
- **Model Implementation**: KNN and Naive Bayes classifiers
- **Performance Analysis**: Accuracy, precision, recall metrics
- **Data Visualization**: Exploratory data analysis with plots

### Dataset Information
- **Size**: 4,177 samples
- **Features**: Physical measurements (length, diameter, height, weight, etc.)
- **Target**: Age classification (rings)
- **Challenge**: Predict age without destructive methods

### Achievements
- Achieved 82% accuracy in age prediction
- Comprehensive data preprocessing pipeline
- Comparative analysis of multiple ML algorithms
- Detailed performance metrics and visualization

### Learning Outcomes
- Machine learning workflow and best practices
- Data preprocessing and feature engineering
- Algorithm implementation and tuning
- Model evaluation and comparison
- Data visualization techniques

---

## 5. Artificial Intelligence / Machine Learning Project

### Project Overview
Jupyter Notebook-based AI/ML project (details from HTML export of notebook).

### Technologies
- **Environment**: Jupyter Notebook
- **Language**: Python
- **Libraries**: Standard ML libraries (Pandas, NumPy, Scikit-learn, etc.)

### Note
This appears to be a Jupyter Notebook export (HTML format). The actual project details would need to be extracted from the notebook content or Python source files.

---

## Project Categories Summary

### Networking Projects
- Network Proxy Server & QoS Testing System
- Network Security Implementation (existing)

### Web Development Projects
- Lost & Found Web Application
- Realshyt Fashion E-Commerce Platform

### Machine Learning Projects
- Abalone Dataset ML Analysis
- Artificial Intelligence Project

### Development Tools & Technologies Used
- **Backend**: Python, Java, Spring Boot
- **Frontend**: React, TypeScript, JavaScript, HTML/CSS
- **Databases**: MySQL, H2
- **ML**: Python, Scikit-learn, Pandas, NumPy
- **Tools**: Wireshark, Bruno, Jupyter Notebook

---

## Notes for Future Updates

1. **GitHub Links**: Update with actual repository URLs when available
2. **Live Demos**: Add deployment links if projects are hosted
3. **Screenshots**: Consider adding project screenshots for visual portfolio
4. **Detailed Metrics**: Add specific performance metrics and results
5. **Team Information**: Note if projects were collaborative efforts

---

Last Updated: 2026-01-09
