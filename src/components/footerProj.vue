<template>
    <footer class="footer">
       <div class="footer-wrapper">
          <a href="/" class="footer__logo">
            <img v-bind:src="logo.url" v-bind:alt="logo.alt">
          </a>
          <p class="footer__copyr"> {{this.resul}} </p>
      </div>
    </footer>
  </template>
  <script>
    import axios from 'axios'
  export default {
    name: 'footerProj',
    data() {
       return {
        resul: '',
        logo: {
          alt: 'logo',
          url: '/src/img/logo.png'
        },
        activeClass: 'active',
        apURL: 'https://gateway.marvel.com/v1/public/comics?',
        params: {
            ts: '1',
            apikey: '84b855a84a1932919137e631647a0d57',
            hash: '06a2ea616f6eb012097446de4d464bc6'
        }
       }
    },
    methods: {
      footerProj() {
      axios.get(this.apURL, {params: this.params})
            .then(response => {
              this.resul = response.data.copyright
            })
            .catch(e => {
              this.error.push(e)
            })
    }},
    mounted() {
      this.footerProj();
  }
    }
    
  </script>
  
  <style>
  @import "../../public/src/css/footer.min.css";
  </style>