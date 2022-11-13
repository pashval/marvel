<template>
    <div class="elem">
        <div class="elem-wrapper">
            <div class="elem-displ" v-for="item in element" :key="item.element" >
            <div class="elem__img"><img class="thumv"  :src="item.thumbnail.path + '.' + item.thumbnail.extension" /></div>
            <div class="elem-right">
              <h3 class="elem-right__name">{{item.name}}</h3>
              <p class="elem-right__desc">{{item.description }}</p>
              <div class="elem-right__links">
                <div  v-for="url in urls" :key="url.urls"  v-show="urls != ''"><a target="_blank" :href=" url.url ">{{url.type}}</a></div>
              </div>
          </div>
          </div>
          <p class="ev" v-show="event != ''">Events:</p>
          <swiper
              :modules="modules"
              :slides-per-view="4"
              :space-between="15"
              :loop="true"
              :mousewheel="true"
              :navigation="true"
              :pagination="{ type: 'progressbar' }"
              :scrollbar="{ draggable: true }"
              :breakpoints="{
                  '320': {
                    slidesPerView: 1
                  },
                  '640': {
                    slidesPerView: 2
                  },
                  '1000': {
                    slidesPerView: 3
                  }}"
              @swiper="onSwiper"
              >
            <swiper-slide class="event" v-for="item in event" :key="item.event">
              <div class="event-wrapper">
                <router-link class="event__div" v-bind:to="'/event' + item.id">
                  <div><img class="img_ev" :src="item.thumbnail.path + '.' + item.thumbnail.extension" /></div>
                  <h3 class="swiper__name">{{item.title}}</h3>
                </router-link>
              </div>
              </swiper-slide>
            </swiper>
    </div></div>

</template>
  
  <script>
  import { useRoute } from 'vue-router';
  import { Pagination, Navigation, Mousewheel } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';  
  import 'swiper/css/pagination';
  import 'swiper/css/navigation'
  import axios from 'axios';
  export default {
    name: 'specificCharacter',
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
        img: null,
        element: null,
        event: null,
        urls: null,
        error: [],
        imgUrl: null,
        charID: useRoute().params.id,
        apiURL: 'https://gateway.marvel.com/v1/public/characters/'+ useRoute().params.id,
        eventsURL: 'https://gateway.marvel.com/v1/public/characters/'+ useRoute().params.id+'/events',
        comicsURL: 'https://gateway.marvel.com/v1/public/events/' + useRoute().params.id + '/comics?noVariants=true',
        params: {
            ts: '1',
            apikey: '84b855a84a1932919137e631647a0d57',
            hash: '06a2ea616f6eb012097446de4d464bc6'
        },
        settings: {
          arrows: true,
          dots: true,
        },
      }
    },
    methods: {
        specificCharacter() {
        axios.get(this.apiURL, {params: this.params})
            .then(response => {
              this.element = response.data.data.results
              let a = response.data.data.results
              this.urls = a[0].urls
            })
            .catch(e => {
              this.error.push(e)
            })
        axios.get(this.eventsURL, {params: this.params}) 
            .then(response => {
                this.event = response.data.data.results
            }
            )
      },
    },
    mounted() {
      this.specificCharacter();
    }
  }
  </script>
  
<style>
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{
    background: red;
  }
  .swiper-button-prev, .swiper-button-next {
  color: red;
  }
</style>