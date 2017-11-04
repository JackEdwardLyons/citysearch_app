<template>
  <div class="column is-12">
    <p>
      <strong>
        Built on the road, for the road...
      </strong>
    </p>    
    <p>
      I built this app while I was road tripping across the United States for four months.
      My fiance and I love exploring new cities, but most importantly, exploring coffee!
      I always found that websites like Tripadvisor were super lame and unreliable. Plus the top 10
      list was never quite that accurate. I wanted to create my own Top 10 list of cafes for basically 
      every city in America. 
    </p>
    <p>I wrote a blog post about <a href="http://jacklyons.me/yelp-fusion-api-access-token/" target="_blank">accessing the Yelp API</a>
      which quickly became popular. A lot of people wanted to see the API in action, so that was also another
      great reason to create this project.
    </p>
    <p>
      However my main motivation was to build a web app using <a href="https://vuejs.org/" target="_blank">Vue.js</a>. 
      I love the simplicity of Vue; it is a great JavaScript framework because it allows intermediate developers like
      myself to fully work with and understand a real-life modern JS framework. Vue fuses the best parts of React like
      the Virtual DOM with the awesome powers of Angular like directives.
    </p>
    <p>
      So in this app you can explore just about any city in America. You can get some info the city location via
      Google Maps. I've also added a feature to see all the popular Recreation Areas in the city, using the Google Marker API.
      However, the API is pretty lame and doesn't allow me to do much but place some markers on the map. You can also see the Weather
      for your selected city as well.
    </p>
    <p>
      Of course this is quite a simple app, but under the hood there is a fair bit going on. This project was a great
      opportunity for me to learn about Vue Components, Props, Data Binding, Server Side API Calls and Requests, as well
      as using various directives, methods, filters and computed properties with Vue.
    </p>
    <p>
      If you like this project and want to see more, or have some suggestions on improving it, please just get in touch.
      You can contact me via my website at <a href="http://jacklyons.me/contact" target="_blank">JackLyons.ME</a>
    </p>
    <p class="inline-paragraph"><strong>See the source code on GitHub</strong></p>
      <a href="" target="_blank">
        <img class="custom-position-img" src="../assets/github.png" width="50" height="50">
      </a>        
  </div>   
</template>
<style>
.inline-paragraph {
  display: inline;
}
.custom-position-img {
  position: relative;
  top: 15px;
}
.custom-position-img:hover {
  transition: .3s ease;
  transform: scale(1.2);
}
</style>
