<template>
  <div class="column is-12">
    <div class="field">
      <p class="control">
        <input class="input" 
                type="text" 
                placeholder="Email"
                v-model="user.email">
      </p>  
    </div>
    <div class="field">
      <p class="control">
        <input class="input" 
                type="password" 
                placeholder="Password"
                v-model="user.password">  
      </p>                
    </div>              
  </div>   
</template>

<script>
export default {
  props: [ 'type' ], 
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  }
}
</script>
