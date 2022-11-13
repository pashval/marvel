<template>
    <div>
        <div class="marvel-wrapper">
            <div class="title"><span class="title_ch">WORLD OF MARVEL COMICS</span></div>
            <div class="results">
                <div class="items" v-for="item in result" :key="item.result">
                    <router-link class="comic_link" v-bind:to="'/comic' + item.id">
                      <div class="img_center"><img class="img" :src="item.thumbnail.path + dot + item.thumbnail.extension" /></div>
                      <div class="background">
                        <h3>{{item.title}}</h3>
                      </div>
                    </router-link>
                </div>
            </div>
            <vue-awesome-paginate
                  :total-items="total"
                  :items-per-page="12"
                  :max-pages-shown="4"
                  v-model="currentPage"
                  :hide-prev-next="false"
                  :on-click="changePageHandler"
              />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'homeMarvel',
  data() {
     return {
      result: [],
      currentPage: 1,
      dot:  '.',
      total: 0,
      apiURL: 'https://gateway.marvel.com/v1/public/comics?ts=1&orderBy=title&',
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
        axios.get(this.apiURL+ 'limit=12&', {params: this.params})
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