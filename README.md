

### **Frontend README for REV RADAR**  ###
Overview
This README will guide you through the user journey of signing in and navigating the RevRadar app. The app is a React.js application using functional components and hooks, leveraging the react-router-dom library for routing, and implementing Context API for managing global state related to user authentication and car data.

### **User Journey** ###
### **Signing in**  ###
Upon launching the app, the user is taken to the Signin page. Here, the user enters their username and password and clicks on the 'Sign In' button. This fires off a function (handleSubmit in Signin.js) which uses the signin function from api/auth to make a POST request to the server to authenticate the user.

If authentication is successful, the server sends back a response that includes a token. The handleSubmit function saves the token to localStorage, and the isLoggedIn state is set to true. The user's data is saved to both the user state in the AuthContextComponent and in localStorage, and the user is redirected to the FeaturedCars page.

If authentication fails, an error message is displayed on the Signin page. The user stays on this page until they provide valid sign-in credentials.

### **Navigation** ###
The app uses the react-router-dom library for routing. The AppContent component is wrapped with the CarContextProvider and AuthContextComponent for access to global state. Depending on whether the user is logged in or not, the app routes the user to different pages:

Signup: This is the user registration page.
Signin: This is the user login page.
FeaturedCars: This is the home page, displaying featured car listings.
CreateNewListing: This page allows a user to post a new car listing.
CarDetails: This page displays details about a specific car listing.
UserCarListings: This page shows all car listings posted by the user.
UserCarListingsDetails: This page shows details about a specific car listing posted by the user.
These routes are conditionally rendered based on whether the user is logged in or not.

Backend calls and Component Rendering
The components within the app make calls to the backend to fetch, display, and manipulate data.

Signin.js makes a call to the backend to authenticate the user. FeaturedCars.js uses the CarContext to access the array of car data. When the page loads, it uses this data to populate a list of unique car makes and models, and the user can filter the listings by these parameters.

### **Key Components**  ###
AuthContextComponent: This component handles authentication and holds the global state for whether a user is logged in, as well as the user's information.
CarContextProvider: This component handles the state of the car data, which is shared across components.
Signin: This component provides the sign-in functionality.
FeaturedCars: This component fetches and displays a list of featured car listings.
CreateNewListing: This component allows a user to create a new car listing.
CarDetails: This component displays detailed information for a specific car.
UserCarListings: This component displays a user's car listings.
UserCarListingsDetails: This component displays detailed information for a specific car listing created by the user.
