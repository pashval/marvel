<template>
    <div class="elem">
      <div class="elem-wrapper">
        <div class="elem-displ" v-for="item in event" :key="item.event">
            <div class="elem__img"><img class="img_eve" :src="item.thumbnail.path + '.' + item.thumbnail.extension" /></div>
            <div class="elem-right">
              <h3 class="elem-right__name">{{item.title}}</h3>
              <p class="elem-right__desc">{{item.description }}</p>
            </div>
        </div>
        <p class="ev" v-show="comicEvent != ''">Comics:</p>
          <swiper
              :modules="modules"
              :slides-per-view="3"
              :space-between="15"
              :mousewheel="true"
              :loop="true"
              :pagination="{ type: 'progressbar' }"
              :scrollbar="{ draggable: true }"
              :breakpoints="{
                  '320': {
                    slidesPerView: 1
                  },
                  '750': {
                    slidesPerView: 2
                  },
                  '1100': {
                    slidesPerView: 3
                  }}"
              @swiper="onSwiper"
              >
            <swiper-slide class="comicEvent" v-for="items in comicEvent" :key="items.comicEvent">
              <div class="event-wrapper">
                <router-link class="event__div" v-bind:to="'/comic' + items.id">
                  <div><img class="comcevenetimg" :src="items.thumbnail.path + '.' + items.thumbnail.extension" /></div>
                  <h3 class="swiper__name">{{items.title}}</h3>
                </router-link>
              </div>
            </swiper-slide>
          </swiper>
      </div>
    </div>
</template>
  
  <script>
    import { useRoute } from 'vue-router';
  import { Pagination, Mousewheel } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';  
import 'swiper/css/pagination';
import axios from 'axios';
  export default {
    name: 'specificEvent',
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
        modules: [Pagination, Mousewheel]
    }},
    data() {
      return {
        img: null,
        element: null,
        event: null,
        urls: null,
        error: [],
        imgUrl: null,
        comicEvent: null,
        charID: useRoute().params.id,
        eventsURL: 'https://gateway.marvel.com/v1/public/events/'+ useRoute().params.id,
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
        specificEvent() {
        axios.get(this.eventsURL, {params: this.params})
            .catch(e => {
              this.error.push(e)
            })
        axios.get(this.eventsURL, {params: this.params}) 
            .then(response => {
                this.event = response.data.data.results
            }
            )
        axios.get(this.comicsURL, {params: this.params}) 
            .then(response => {
                this.comicEvent = response.data.data.results
            }
            )
      }
    },
    mounted() {
      this.specificEvent();
    }
  }
  </script>
  
<style>
</style>