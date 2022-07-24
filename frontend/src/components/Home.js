// 1. Components are JavaScript functions
// 2. Functions should start with uppercase letter
// 3. Functions should contain a top-level return statement
// 4. Functions should be exported in order to add in App.js
// 5. Functions should be imported in App.js to show on Browser


import React from 'react';
import './home.css';

const Home = () => {

  document.title = "Home Page";
  return (
    <div class="cover-container d-flex ht p-3 mx-auto flex-column">
        <h1>Home Page</h1>
        <hr />
        <br />    <br />
        <main role="main" class="inner cover">
        <h1 class="cover-heading">Cover your page.</h1>
        <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p class="lead">
          <a href='./signup' class="btn btn-lg btn-secondary">Learn more</a>
        </p>
      </main>

      <footer class="mastfoot mt-auto text-bottom text-center">
        <div class="inner">
          <p>Cover template for home page.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home;