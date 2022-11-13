<template>
    <div>
        <div class="marvel-wrapper">
            <div class="title"><p class="title_ch">FIND YOUR CHARACTER</p></div>
            <div class="form">
              <input placeholder="spider-man" @keyup.enter="results" v-model="keyword">
              <div v-on:click="results">search</div>
            </div>
            <div v-show="result">
              <vue-awesome-paginate 
                  :total-items="total"
                  :items-per-page="12"
                  :max-pages-shown="5"
                  v-model="currentPage"
                  :hide-prev-next="false"
                  :on-click="changePageHandler"
            />
            </div>
            <div class="results">
                <div class="itemC" v-for="item in result" :key="item.result">
                    <router-link class="comic_link" v-bind:to="'/character' + item.id">
                      <div class="img_center"><img class="img_sear" :src="item.thumbnail.path + dot + item.thumbnail.extension" /></div>
                      <div class="background">
                        <h3>{{item.name}}</h3>
                      </div>
                    </router-link>
                </div>
            </div>
            <div v-show="result">
              <vue-awesome-paginate 
                  :total-items="total"
                  :items-per-page="12"
                  :max-pages-shown="5"
                  v-model="currentPage"
                  :hide-prev-next="false"
                  :on-click="changePageHandler"
            />
            </div>
        </div>
        <div class="teams" v-show="!result">
            <swipersMain />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import swipersMain from '@/components/pages/swipersMain.vue'
export default {
    components: {
      swipersMain
    },
  name: 'charactersComics',
  data() {
     return {
      result: null,
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
        axios.get(this.apiURL+ 'limit=12&' + 'nameStartsWith=' + this.keyword, {params: this.params})
            .then(response => {
                this.result = response.data.data.results
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