// 1. Components are JavaScript functions
// 2. Functions should start with uppercase letter
// 3. Functions should contain a top-level return statement
// 4. Functions should be exported in order to add in App.js
// 5. Functions should be imported in App.js to show on Browser


import React from 'react';

const Home = () => {

  document.title = "Home Page";
  return (
    <div>
        <h1>Home Page</h1>
        <hr />
    </div>
  )
}

export default Home;