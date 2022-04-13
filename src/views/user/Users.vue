<template>
  <div class="container">
    <div class="user-home">
      <div class="user-cover">
        <p v-if="!cover && currentUserId === userId">
          快來為個人頁面設定封面吧!
        </p>
        <div
          v-if="cover"
          class="cover"
          :style="{ backgroundImage: `url(${this.cover})` }"
        ></div>
        <template v-if="currentUserId === userId">
          <label for="cover">
            <font-awesome-icon
              :icon="['fa', 'pencil-alt']"
              class="edit-icon"
              size="lg"
            />
          </label>
          <input
            type="file"
            id="cover"
            accept="image/png, image/jpeg"
            @change="handleFileChange"
          />
        </template>
      </div>
      <div class="user-about">
        <div class="user-info">
          <div class="avatar">
            <img v-if="profileImg" :src="profileImg" alt="user-avatar" />
          </div>
          <div class="text">
            <p class="user-name">{{ name }}</p>
            <p>{{ bio }}</p>
          </div>
          <div class="edit-more" v-if="currentUserId === userId">
            <router-link class="btn" :to="{ name: 'Profile' }"
              >編輯個人資料</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <section class="user-stories">
      <h3 class="title">Stories</h3>
      <div class="stories-record">
        <div class="total-stories">
          <span>發文數:</span>
          <span>{{ stories.length }}</span>
        </div>
        <div class="total-hearts">
          <span>獲讚數:</span><span>{{ totalHearts }}</span>
        </div>
      </div>
      <template v-if="stories.length > 0">
        <div class="stories">
          <story-intro-rect
            v-for="story in currentPageStories"
            :key="story.id"
            :story="story"
          ></story-intro-rect>
        </div>
        <pagination
          :page="currentPage"
          :totalItems="stories.length"
          :itemPerPage="itemPerPage"
        ></pagination>
      </template>
    </section>
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>

<script>
import { db, storage } from "@/firebase/config";
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "Users",
  props: ["userId"],
  components: { StoryIntroRect, Pagination },
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: false,
      cover: null,
      name: null,
      email: null,
      profileImg: null,
      bio: null,
      stories: [],
    };
  },
  computed: {
    totalHearts() {
      let hearts = 0;

      for (let story of this.stories) {
        hearts += story.hearts.length;
      }

      return hearts;
    },
    currentPageStories() {
      return this.stories.slice(this.itemFirstIndex, this.itemLastIndex);
    },
    currentUserId() {
      return this.$store.state.auth.userId;
    },
  },
  methods: {
    async handleFileChange(e) {
      try {
        this.isLoading = true;

        const selectedCover = e.target.files[0];
        const storageRef = storage.ref();
        const uploadPath = `profile/${this.userId}/cover`;

        const uploadRef = storageRef.child(uploadPath);
        await uploadRef.put(selectedCover);

        const downloadURL = await uploadRef.getDownloadURL();
        await db
          .collection("users")
          .doc(this.userId)
          .update({ coverImg: downloadURL });

        this.cover = downloadURL;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
    async getUserData() {
      try {
        const res = await db
          .collection("users")
          .doc(this.userId)
          .get();
        return res.data();
      } catch (err) {
        console.log(err);
      }
    },
    async getUserStories() {
      try {
        const res = await db
          .collection("stories")
          .where("userId", "==", this.userId)
          .get();

        const stories = [];
        res.docs.forEach((doc) => stories.push({ ...doc.data(), id: doc.id }));
        return stories;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      this.isLoading = true;
      const userData = this.getUserData();
      const stories = this.getUserStories();

      const res = await Promise.all([userData, stories]);

      const { name, email, profileImg, bio, coverImg } = res[0];
      this.name = name;
      this.email = email;
      this.profileImg = profileImg;
      this.bio = bio;
      this.cover = coverImg;
      this.stories = res[1];

      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 125rem;
  margin: 0 auto;
  font-size: 1.6rem;

  .user-home {
    box-shadow: 0 3px 10px var(--color-shadow);

    .user-cover {
      background-color: #555;
      position: relative;

      > p {
        text-align: center;
        padding: 4rem 0;
        color: #fff;
      }

      .cover {
        background-position: center center;
        background-size: cover;
        max-height: 64rem;
        min-height: 18rem;

        @media (min-width: $bp-md) {
          height: 40vh;
        }
      }

      .edit-icon {
        cursor: pointer;
        background-color: #000;
        padding: 0.8rem;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        position: absolute;
        right: 1.5rem;
        bottom: 1.5rem;
        color: #fff;

        @media (min-width: $bp-md) {
          width: 3.5rem;
          height: 3.5rem;
        }

        &:hover {
          color: #ccc;
        }
      }

      > input {
        display: none;
      }
    }

    .user-about {
      .user-info {
        font-size: 1.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;

        @media (min-width: $bp-sm) {
        }

        @media (min-width: $bp-md) {
          font-size: 1.6rem;
          flex-direction: row;
        }

        .avatar {
          position: relative;

          > img {
            width: 8rem;
            height: 8rem;
            border-radius: 50%;

            @media (min-width: $bp-md) {
              width: 10rem;
              height: 10rem;
            }

            @media (min-width: $bp-lg) {
              width: 12rem;
              height: 12rem;
            }
          }
        }

        .text {
          flex: 1;
          padding: 1.5rem;

          @media (min-width: $bp-md) {
            padding: 2rem;
          }

          .user-name {
            font-weight: 600;
            font-size: 2.5rem;
            margin: 0.8rem 0;
          }
        }

        .edit-more {
          > a {
            margin: 1rem 0;
            display: block;
          }
        }
      }
    }
  }

  .user-stories {
    margin: 3rem 0;
    padding: 0 2rem;
    .title {
      font-size: 2rem;

      @media (min-width: $bp-md) {
        font-size: 2.5rem;
      }
    }

    .stories-record {
      margin: 1.5rem 0;
      display: flex;
      align-items: center;
      font-size: 1.4rem;

      @media (min-width: $bp-md) {
        font-size: 2rem;
      }

      .total-stories,
      .total-hearts {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;

        > svg {
          margin-right: 5px;
        }
      }
    }

    .stories {
      max-width: 77rem;
      margin: 0 auto;
    }
  }
}
</style>
