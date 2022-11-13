<template>
    <div>
        <div class="marvel-wrapper">
            <div class="results">
                <div class="items" v-for="item in result" :key="item.result">
                    <router-link class="comic_link" v-bind:to="'/character' + item.id">
                      <div class="img_center"><img class="img" :src="item.thumbnail.path + dot + item.thumbnail.extension" /></div>
                      <div class="background">
                        <h3>{{item.name}}</h3>
                      </div>
                    </router-link>
                </div>
                <div class="items" v-for="item in resul" :key="item.resul">
                    <router-link class="comic_link" v-bind:to="'/character' + item.id">
                      <div class="img_center"><img class="img" :src="item.thumbnail.path + dot + item.thumbnail.extension" /></div>
                      <div class="background">
                        <h3>{{item.name}}</h3>
                      </div>
                    </router-link>
                </div>
                <div class="items" v-for="item in resu" :key="item.resu">
                    <router-link class="comic_link" v-bind:to="'/character' + item.id">
                      <div class="img_center"><img class="img" :src="item.thumbnail.path + dot + item.thumbnail.extension" /></div>
                      <div class="background">
                        <h3>{{item.name}}</h3>
                      </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'swipersMain',
  data() {
       return {
        result: null,
        resul: null,
        resu: null,
        currentPage: 1,
        dot:  '.',
        total: 0,
        apiURL: 'https://gateway.marvel.com/v1/public/characters?ts=1&',
        error: [],
        keyword: '',
        params: {
            apikey: '84b855a84a1932919137e631647a0d57',
            hash: '06a2ea616f6eb012097446de4d464bc6'
        }
        }
      },
    methods: {
      results() {
          axios.get(this.apiURL+ 'limit=12&' + 'id=1009165', {params: this.params})
              .then(response => {
                  this.result = response.data.data.results
                  this.total = response.data.data.total
                  this.page = response.data.page
              })
              .catch(e => {
                  this.error.push(e)
              })
              axios.get(this.apiURL+ 'limit=12&' + 'id=1009726', {params: this.params})
              .then(response => {
                  this.resul = response.data.data.results
                  this.total = response.data.data.total
                  this.page = response.data.page
              })
              .catch(e => {
                  this.error.push(e)
              })
              axios.get(this.apiURL+ 'limit=12&' + 'id=1009299', {params: this.params})
              .then(response => {
                  this.resu = response.data.data.results
                  this.total = response.data.data.total
                  this.page = response.data.page
              })
              .catch(e => {
                  this.error.push(e)
              })
      },
        changePageHandler (page) {
            this.page = page;
            this.params.offset = (page - 1) * 12;
            this.results();
        }
    },
    mounted() {
        this.results();
    }
    }
  </script>
  
  <style>

  </style>