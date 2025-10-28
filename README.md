# 🏡 HomyWay

A full-stack *Airbnb-like property booking and management platform* built entirely with *Node.js* and *Express.js*, offering users a seamless experience to explore, list, and book homes — all from one integrated application.

**Live Website:** [Click here to visit HomyWay]() 
---

## 📋 Table of Contents
- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Dataset](#-dataset)
- [Tools and Technologies Used](#-tools-and-technologies-used)
- [Key Features and Insights](#-key-features-and-insights)
- [Model / Output](#-model--output)
- [How to Run This Project](#-how-to-run-this-project)
- [Result and Conclusion](#-result-and-conclusion)
- [Future Work](#-future-work)
- [Author and Contact](#-author-and-contact)

---

## 🧭 Overview

*HomyWay* is a web-based platform designed to simplify the process of finding, listing, and booking properties online.  
Inspired by Airbnb, the project provides core functionalities such as user authentication, property listings, image uploads, booking dates, and a detailed view for each stay — all implemented using *server-side rendering with Node and Express*.

The main goal of *HomyWay* is to give users a *smooth, full-stack booking experience* without relying on frontend frameworks.

---

## ❓ Problem Statement

Existing platforms like Airbnb are complex and depend on large tech stacks.  
This project aims to *recreate the essential Airbnb experience* using a *minimal stack (Node.js and Express)* to demonstrate how powerful server-side rendering and RESTful design can be — even without React or SPA frameworks.

---

## 🗂 Dataset

- The dataset consists of *user-generated property listings* stored in MongoDB.  
- Each listing includes:  
  - Property title, description, and address  
  - Price per night  
  - Owner (host) details  
  - Availability dates  
  - Uploaded images  

---

## 🧰 Tools and Technologies Used

| Category | Technology |
|-----------|-------------|
| *Backend* | Node.js, Express.js |
| *Database* | MongoDB (via Mongoose) |
| *Authentication* | JSON Web Token (JWT) |
| *Templating / View Engine* | EJS |
| *File Uploads* | Multer |
| *Environment Variables* | dotenv |
| *Hosting / Deployment* | Render / Railway / Localhost (as applicable) |

---

## 🔍 Key Features and Insights

- 🧑‍💼 *User Authentication:* Secure login and registration using JWT.  
- 🏠 *List a Property:* Hosts can upload property details and images.  
- 📅 *Booking System:* Users can select available dates and book their stay.  
- 🖼 *Dynamic Image Display:* Property photos rendered directly from uploads.  
- 🔍 *Property Details Page:* Each property has its own dedicated info page.  
- 📬 *Announcements / Notifications:* (If implemented) Updates from hosts or admins.  
- ⚙ *Server-side Rendering (SSR):* All pages rendered dynamically via Express.  
- 🧾 *RESTful Routes:* Clean, structured backend endpoints.

---

## 🖼 Model / Output

Screenshots of the working application:

| Page | Screenshot |
|------|-------------|
| 🏠 Home Page | ![Home Page](screenshots/home.png) |
| 🏘 Property Listings | ![Properties](screenshots/properties.png) |
| 📅 Booking Page | ![Booking Page](screenshots/booking.png) |

*(Make sure you place screenshots inside a folder named screenshots/ in your repo.)*

---

## 💻 How to Run This Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/HomyWay.git
cd HomyWay

*Install Dependencies*
```bash
npm install

*Set up environment variables*
```Env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

*Run the server*
```bash
npm start

## 🏁 Result and Conclusion
The *HomyWay* platform successfully demonstrates a complete, production-level accommodation booking system built using *Node.js* and *Express* — without relying on frontend frameworks.

Key achievements:
- Secure authentication and user session management.  
- Fully functional property listing and booking system.  
- Integrated image uploads, date-based booking calendar, and responsive design.  
- Dynamic reviews and rating system for enhanced user interaction.  
- Efficient data handling with *MongoDB* and *Mongoose*.

*Conclusion:*  
HomyWay showcases how a fully functional, scalable, and responsive web platform can be developed entirely with backend-driven rendering, maintaining both performance and usability. It bridges the gap between simplicity and modern web functionality — ideal for real-world booking applications.

---

## 🔮 Future Work
Although the core functionalities of *HomyWay* are complete — including image uploads, calendar booking, reviews, ratings, and responsiveness — several advanced enhancements are planned for the next version:

- *1️⃣ Payment Integration:*  
  Add secure online payment support using *Razorpay* or *Stripe* for seamless booking transactions.

- *2️⃣ Real-Time Notifications:*  
  Integrate *Socket.io* for instant updates on bookings, messages, and status changes.


- *4️⃣ AI-Powered Recommendations:*  
  Suggest personalized stays based on previous searches, bookings, and reviews.

- *7️⃣ Email & SMS Alerts:*  
  Send booking confirmations, cancellations, and updates using *Nodemailer* or *Twilio*.

- *8️⃣ Multi-Language & Currency Support:*  
  Localize the app and dynamically convert prices for international users.

> 🚀 These improvements will enhance HomyWay’s scalability, reliability, and real-world usability.

---

## 👩‍💻 Author and Contact

*Author:* Anjali Kumari  
*GitHub:* [Anjali Kumari]()  
*Email:* anjalikumari70996@gmail.com  
*LinkedIn:* [linkedin.com/in/