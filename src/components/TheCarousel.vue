<template>
  <div class="cover-preview-area">
    <div>
      <p class="note" v-if="pendingCovers.length > 0">請選擇故事封面圖片:</p>
      <div v-show="pendingCovers.length > 0">
        <swiper ref="mySwiper" class="swiper" :options="swiperOption">
          <swiper-slide v-for="cover in pendingCovers" :key="cover">
            <img :src="cover" alt="cover" />
          </swiper-slide>
          <template #button-prev>
            <div @click="swiper.slidePrev()" class="button-prev">
              <font-awesome-icon
                :icon="['fa', 'arrow-left']"
              ></font-awesome-icon>
            </div>
          </template>
          <template #button-next>
            <div @click="swiper.slideNext()" class="button-next">
              <font-awesome-icon
                :icon="['fa', 'arrow-right']"
              ></font-awesome-icon>
            </div>
          </template>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

export default {
  name: "TheCarousel",
  components: { Swiper, SwiperSlide },
  props: ["pendingCovers"],
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.swiper.on("activeIndexChange", (swiper) => {
      this.$emit("coverActiveIndex", swiper.activeIndex);
    });
  },
};
</script>

<style lang="scss" scoped>
.cover-preview-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  text-align: center;

  .note {
    padding: 0.5rem 0;
    color: #000;
  }

  .swiper {
    width: 24rem;
    height: 18rem;
    border-radius: 5px;

    img {
      width: 24rem;
      height: 18rem;
      object-fit: cover;
      object-position: center center;
    }

    .button-prev,
    .button-next {
      position: absolute;
      top: 50%;
      z-index: 10;
      background-color: #222;
      padding: 0.5rem;
      opacity: 0.6;
      transform: translateY(-50%);

      svg {
        color: #fff;
        opacity: 0.8;
        font-size: 2rem;
        cursor: pointer;
      }
    }

    .button-next {
      right: 0;
    }
  }
}
</style>
