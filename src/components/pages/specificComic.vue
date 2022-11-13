<template>
    <div class="elem">
        <div class="elem-wrapper">
          <div class="elem-displ" v-for="item in element" :key="item.element">
            <div class="elem__img"><img :src="item.thumbnail.path + '.' + item.thumbnail.extension" /></div>
            <div class="elem-right elem-right__comic">
              <h3 class="elem-right__name" v-show="element != ''">{{item.title}}</h3>
              <p class="elem-right__series" v-show="element != ''">Series name: {{item.series.name}}</p>
              <p class="elem-right__pages" v-show="element != ''">Number of pages: {{item.pageCount}}</p>
              <p class="elem-right__descr" v-show="element != ''">{{item.description }}</p>
              <p class="elem-right__format" v-show="element != ''">Format: {{item.format}}</p>
              <p class="elem-right__price" v-show="element != ''">
                  Price: <span  item in prices>{{item.prices.map(s => s.price).slice(0, 1).join('')}} $</span>
              </p>
              <div class="elem-right__date">
                <div  v-for="date in dates.slice(0, 1)" :key="date.dates"  v-show="dates != ''"><p>Sale date: {{date.date.substring(0, 10)}}</p></div>
              </div>
              <div class="elem-right__team" v-show="creator != ''">Creative team:
                <span class="item" v-for="item in creator" :key="item.creator">
                    {{item.fullName}};
                </span>
              </div>
            </div>
        </div>
        <p class="ev" v-show="charc != ''">Characters:</p>
          <swiper
              :modules="modules"
              :slides-per-view="1"
              :space-between="15"
              :mousewheel="true"
              :pagination="{ clickable: true }"
              :scrollbar="{ draggable: true }"
              @swiper="onSwiper"
              >
            <swiper-slide class="event" v-for="item in charc" :key="item.charc">
              <div class="event-wrapper">
                <router-link class="event__div" v-bind:to="'/character' + item.id">
                  <div><img class="img_char_comic" :src="item.thumbnail.path + '.' + item.thumbnail.extension" /></div>
                  <h3 class="swiper__name">{{item.name}}</h3>
                </router-link>
              </div>
              </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
  
  <script>
  
  import { useRoute } from 'vue-router';
  import axios from 'axios'
  import { Pagination, Navigation, Mousewheel } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';  
  import 'swiper/css/pagination';
  import 'swiper/css/navigation'
  export default {
    name: 'specificComic',
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Pagination, Navigation, Mousewheel]
    }},
    data() {
      return {
        element: null,
        overview: null,
        dates: null,
        event: null,
        charc: null,
        creator: null,
        prices: null,
        error: [],
        imgUrl: null,
        comicID: useRoute().params.id,
        apiURL: 'https://gateway.marvel.com/v1/public/comics/'+ useRoute().params.id,
        eventsURL: 'https://gateway.marvel.com/v1/public/comics/'+ useRoute().params.id + '/events',
        creatorsURL: 'https://gateway.marvel.com/v1/public/comics/'+ useRoute().params.id + '/creators',
        charcURL: 'https://gateway.marvel.com/v1/public/comics/'+ useRoute().params.id + '/characters',
        params: {
            ts: '1',
            apikey: '84b855a84a1932919137e631647a0d57',
            hash: '06a2ea616f6eb012097446de4d464bc6'
        }
      }
    },
    methods: {
        specificComic() {
        axios.get(this.apiURL, {params: this.params})
            .then(response => {
              this.element = response.data.data.results
              this.pric = response.data.data.results.map(s => s.prices)
              let a = response.data.data.results
              this.dates = a[0].dates
            })
            .catch(e => {
              this.error.push(e)
            }),
        axios.get(this.eventsURL, {params: this.params}) 
          .then(response => {
            this.event = response.data.data.results;
          }
          ),
        axios.get(this.creatorsURL, {params: this.params}) 
          .then(response => {
              this.creator = response.data.data.results
          }
          )
          axios.get(this.charcURL, {params: this.params}) 
          .then(response => {
              this.charc = response.data.data.results
          }
          )
      }
    },
    mounted() {
      this.specificComic();
    }
    
  }
  </script>
  
<style>
.swiper {
  padding-bottom: 20px;
}
.swiper-pagination-bullet-active {
  background-color: red;
}
</style>