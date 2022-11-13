<template>
  <header v-bind:class="['header', isActive ? activeClass : '']">
     <div class="header-wrapper">
        <a href="/" class="header__logo">
          <img v-bind:src="logo.url" v-bind:alt="logo.alt">
        </a>
        <div v-on:click="menuActive" v-bind:class="['header__nav', isActive ? activeClass : '']">
          <nav>
            <ul>
              <li v-for="item in menuItems" :key="item.menuItems">
                <router-link v-bind:to="item.url">{{ item.text }}</router-link>
              </li>
            </ul>
          </nav>
      </div>
      <div class="header__width">
        <a target="_blank" href="https://www.marvel.com" class="header__cta">
         <span v-if="login">{{dashboard}}</span>
        </a>
      </div>
       <div v-on:click="menuActive" v-bind:class="['header__burger', isActive ? activeClass : '']">
        <span></span>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'headerProj',
  data() {
     return {
      logo: {
        alt: 'logo',
        url: '/src/img/logo.png'
      },
      menuItems: [
        {text: 'home', 
        url: '/'
        },
        {text: 'comics',
        url: 'comics'
        },
        {text: 'characters',
        url: 'characters'
        }
      ],
      login: true,
      isActive: false,
      dashboard: 'MORE',
      loginName: 'Login',
      activeClass: 'active',
     }
  },
  methods: {
    menuActive() {
      this.isActive = !this.isActive;
    }
  }
  }
</script>

<style>
@import "../../public/src/css/header.min.css";
</style>