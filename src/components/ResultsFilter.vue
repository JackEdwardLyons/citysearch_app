<template>
  <div class="results--filter columns" v-show="searchFilters">
    <div class="column">
      <div class="filter-field">
        <div class="control">
            <p class="bold">Search by</p>
            <label class="filter-label">
              <input class="filter-label--checkbox" type="radio" name="city-state" /> 
              City
            </label>
            <label class="filter-label">
              <input class="filter-label--checkbox" type="radio" name="city-state" /> 
              State
            </label>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="filter-field">
        <div class="control">
          <p class="bold">City Population</p>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="checkbox" /> 
            &lt; 50,000
          </label>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="checkbox" /> 
            &gt; 50,000 &amp; &lt; 100,000
          </label>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="checkbox" /> 
            &gt; 100,000 &amp; &lt; 500,000
          </label>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="checkbox" /> 
            &gt; 500,000 &amp; &lt; 1,000,000
          </label>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="checkbox" /> 
            &nbsp;&nbsp; 1,000,000+
          </label>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="filter-field">
        <div class="control">
          <p class="bold">Rank</p>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
            Ascending
          </label>
          <label class="filter-label">
            <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
            Descending
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'searchFilters' ]
}
</script>