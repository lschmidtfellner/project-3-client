

### **REV RADAR**  ###
Overview
This README will guide you through the user journey of signing in and navigating the RevRadar app. The app is a React.js application using functional components and hooks, leveraging the react-router-dom library for routing, and implementing Context API for managing global state related to user authentication and car data.

### **Technology Used** ###

* React
* Tailwind
* JWT token
* Axios
* Sweetalert

### Motivation ###

Showcase React app with seeded database that creates a marketplace for user to buy or sell product. 

### Pre-code Build ###

Include, wireframes, schemas, routes, user stories, team roles, sprints

* Notion:https://www.notion.so/Running-with-the-90s-f796135f92e6481c8a14f66736121ea5
* Figma: https://www.figma.com/files/project/96547153/Project---Unit--3?fuid=1251579006598339582


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

```
AuthContext Component
 useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedIn);
  
    // Retrieve the user object from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [])
  ```


CarContextProvider: This component handles the state of the car data, which is shared across components.
Signin: This component provides the sign-in functionality.
FeaturedCars: This component fetches and displays a list of featured car listings.

```
FeaturedCars Excerpt

useEffect(() => {
    const uniqueMakes = [...new Set(cars.map(car => car.Make))];
    setMakes(uniqueMakes);
    console.log('Unique makes:', uniqueMakes);
  }, [cars]);

  useEffect(() => {
    if (selectedMake) {
      const relevantModels = [...new Set(cars.filter(car => car.Make === selectedMake).map(car => car.Model))];
      setModels(relevantModels);
      console.log('Relevant models:', relevantModels);
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedMake, cars]);

  useEffect(() => {
    if (selectedModel) {
      const relevantCars = cars.filter(car => car.Make === selectedMake && car.Model === selectedModel);
      setFilteredCars(relevantCars);
      console.log('Filtered cars:', relevantCars);
    } else {
      setFilteredCars([]);
    }
  }, [selectedModel, selectedMake, cars]);

  ```

CreateNewListing: This component allows a user to create a new car listing.
CarDetails: This component displays detailed information for a specific car.
UserCarListings: This component displays a user's car listings.
UserCarListingsDetails: This component displays detailed information for a specific car listing created by the user.

```
Update new listing excerpt

useEffect(() => {
    const car = cars.find((car) => car._id === selectedCarId)
    setCarToUpdate(car)
  })

  useEffect(() => {
    let ignore = false
    axios
      .get(
        'https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo'
      )
      .then((response) => {
        if (!ignore) {
          console.log('fetched list of makes')
          const makes = response.data
            .map((car) => car.Make)
            .filter((make, index, array) => array.indexOf(make) === index)
          setMakeList(makes)
          setMakeId(makes[0])
        }
      })
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false
    if (makeId !== '') {
      axios
        .get(
          `https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo/search?Make=${makeId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('fetched list of models')
            setCarCategory(response.data[0].Category)
            const models = response.data
              .map((car) => car.Model)
              .filter((model, index, array) => array.indexOf(model) === index)
            setModelList(models)
            setModelId(models[0])
          }
        })

      return () => {
        ignore = true
      }
    }
  }, [makeId])

  useEffect(() => {
    let ignore = false
    if (modelId !== '') {
      axios
        .get(
          `https://luke-used-cars-backend-19ea42e37e12.herokuapp.com/api/carinfo/search?Make=${makeId}&Model=${modelId}`
        )
        .then((response) => {
          if (!ignore) {
            console.log('fetched list of years')
            const years = response.data
              .map((car) => car.Year)
              .filter((year, index, array) => array.indexOf(year) === index)
            setYearList(years)
            setYearId(years[0])

          }
        })
      return () => {
        ignore = true
      }
    }
  }, [makeId, modelId])

  ```


### **Beyond MVP** ###

* Add further authentication


### REFERENCES ### 

* Twutter Clone
* https://tuts.alexmercedcoder.dev/2021/11/Auth_with_express_JWT/
