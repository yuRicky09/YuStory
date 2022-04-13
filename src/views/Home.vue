<template>
  <div class="home">
    <welcome-info v-if="!currentUser"></welcome-info>
    <div class="home-container">
      <div class="banner" v-if="currentUser">
        <div class="sub-title">
          <h2>YUSTORY</h2>
          <p>Share Your Memories Easily</p>
        </div>
        <router-link class="write-story-link" :to="{ name: 'CreateStory' }">
          <span>
            分享故事
            <font-awesome-icon
              class="arror-right"
              :icon="['fa', 'long-arrow-alt-right']"
            />
          </span>
        </router-link>
      </div>
      <div class="message" v-if="currentUser">
        <p>Welcome Back {{ userName }}</p>
      </div>
      <div class="recommend">
        <section class="recently-stories">
          <div class="title">
            <h3>New</h3>
            <span>最新故事</span>
          </div>
          <div class="stories">
            <story-intro-card
              v-for="(story, index) in recentlyStoriesForHome"
              :key="story.id"
              :story="story"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            ></story-intro-card>
          </div>
        </section>
        <section class="tags">
          <div class="title">
            <h3>Tags</h3>
            <span>推薦標籤</span>
          </div>
          <div class="list">
            <router-link
              :to="{
                name: 'Tags',
                params: { tagName: tag },
                query: { page: 1 },
              }"
              v-for="tag in recommendedTagsForHome"
              :key="tag"
            >
              <base-tag :tagName="tag" tagClass="home"></base-tag>
            </router-link>
          </div>
        </section>
        <section class="popular-stories">
          <div class="title">
            <h3>Hot</h3>
            <span>熱門故事</span>
          </div>
          <div class="stories">
            <story-intro-card
              v-for="(story, index) in popularStoriesForHome"
              :key="story.id"
              :story="story"
              data-aos="zoom-in"
              :data-aos-delay="150 * index"
            ></story-intro-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import WelcomeInfo from "@/components/WelcomeInfo.vue";
import StoryIntroCard from "@/components/story/StoryIntroCard.vue";
import BaseTag from "@/components/UI/BaseTag.vue";

export default {
  name: "Home",
  components: {
    WelcomeInfo,
    StoryIntroCard,
    BaseTag,
  },
  computed: {
    ...mapState("auth", {
      currentUser: (state) => state.currentUser,
      userName: (state) => state.userName,
    }),
    ...mapGetters("story", [
      "recentlyStoriesForHome",
      "popularStoriesForHome",
      "recommendedTagsForHome",
    ]),
  },
  methods: {
    setAosType(index) {
      return index % 2 === 0 ? "fade-left" : "fade-right";
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 130rem;
  margin: 0 auto;
  font-size: 1.6rem;

  .banner {
    position: relative;
    margin-bottom: 6rem;
    background-image: linear-gradient(
        to left bottom,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url("~@/assets/img/home-cover.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    min-height: 25rem;
    color: #fff;
    box-shadow: 0 10px 10px var(--color-shadow);

    @media (min-width: $bp-md) {
      min-height: 30rem;
    }

    @media (min-width: $bp-lg) {
      min-height: 40rem;
    }

    .sub-title {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 1rem;
      display: inline-block;
      font-size: 2rem;

      @media (min-width: $bp-md) {
        font-size: 2.5rem;
      }

      @media (min-width: $bp-lg) {
        font-size: 3.2rem;
        padding: 1rem 2rem;
      }
    }

    .write-story-link {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      display: none;

      @media (min-width: $bp-md) {
        display: block;
      }

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fff;
        transform: scale(0);
        transition: all 0.3s ease-out;
      }

      &:hover::after {
        transform: scale(1);
      }

      span {
        position: relative;
        font-size: 1.6rem;
        font-weight: 500;
        display: block;
        padding: 0.5rem;
        width: 100%;
        height: 100%;
        color: #fff;
        transition: all 0.3s ease-out;
        z-index: var(--z-index-10);

        @media (min-width: $bp-md) {
          font-size: 2.2rem;
          font-weight: 600;
        }

        @media (min-width: $bp-lg) {
          font-size: 2.5rem;
          font-weight: 600;
        }
      }

      &:hover span {
        color: var(--color-dark-2);
      }

      span::before,
      span::after {
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        opacity: 0;
        transition: all 0.3s ease-out;
      }

      span::after {
        top: unset;
        bottom: -20px;
      }

      &:hover span::before {
        top: -5px;
        opacity: 1;
      }

      &:hover span::after {
        bottom: -5px;
        opacity: 1;
      }
    }
  }

  .message {
    display: none;
    text-align: center;
    margin: 2rem;

    @media (min-width: $bp-lg) {
      display: block;
    }

    > p {
      display: inline-block;
      font-size: 2.5rem;
      font-weight: 600;
      padding: 2rem 2.5rem;
      color: #fff;
      background-color: var(--color-dark-1);
    }
  }

  .recommend > section {
    margin: 4.5rem 0;
  }

  .recommend > section:first-child {
    margin-top: 0;
  }

  .recently-stories,
  .popular-stories,
  .tags {
    padding: 0 2rem;

    @media (min-width: $bp-xl) {
      padding: 0;
    }

    .title {
      margin-bottom: 1rem;

      @media (min-width: $bp-md) {
        margin-bottom: 2rem;
      }

      h3 {
        font-size: 2rem;
        color: var(--color-dark-3);

        @media (min-width: $bp-md) {
          font-size: 2.5rem;
        }
      }

      span {
        font-size: 1.4rem;

        @media (min-width: $bp-md) {
          font-size: 1.6rem;
        }
      }
    }

    .stories {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      justify-items: center;
      row-gap: 4rem;

      > div:nth-child(5),
      div:nth-child(6),
      div:nth-child(7),
      div:nth-child(8) {
        display: none;
      }

      > div:nth-child(5),
      div:nth-child(6) {
        @media (min-width: $bp-lg) {
          display: block;
        }
      }

      > div:nth-child(7),
      div:nth-child(8) {
        @media (min-width: $bp-xl) {
          display: block;
        }
      }

      @media (min-width: $bp-sm) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }

      @media (min-width: $bp-lg) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
      }

      @media (min-width: $bp-xl) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  .tags .list {
    display: flex;
    row-gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > a {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .tags {
    margin: 5rem 0 !important;

    @media (min-width: $bp-md) {
      margin: 10rem 0 !important;
    }
  }
}
</style>
