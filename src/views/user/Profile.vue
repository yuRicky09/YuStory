<template>
  <div class="profile-wrapper">
    <div class="profile-title">
      <h3>首頁</h3>
    </div>
    <div class="info">
      <div>
        <img v-if="userProfileImg" :src="userProfileImg" alt="user-avatar" />
        <font-awesome-icon v-else :icon="['fa', 'user-circle']" size="5x" />
      </div>
      <div class="info-content">
        <p>{{ userName }}</p>
        <p>{{ userEmail }}</p>
      </div>
      <div class="action">
        <router-link class="button" :to="{ name: 'EditAccount' }"
          >編輯</router-link
        >
      </div>
    </div>
    <div class="bio">
      <h3>個人簡歷</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
        dolor a repellat ullam quasi dolore quaerat error ipsa tempora veritatis
        quod iure dolorum quam, quia doloribus perspiciatis sit nemo rerum.
      </p>
    </div>
    <div class="stories">
      <h3>個人故事</h3>
      <ul>
        <li>故事一</li>
      </ul>
      <ul>
        <li>故事一</li>
      </ul>
      <ul>
        <li>故事一</li>
      </ul>
      <ul>
        <li>故事一</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
    }),
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  > div {
    border-bottom: 1px solid var(--color-border);
  }

  .profile-title {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-bg-gray-1);
    font-size: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    padding: 1.5rem 0;

    @media (min-width: $bp-md) {
      flex-direction: row;
    }

    > div {
      padding: 1rem;
    }

    img {
      max-width: 7rem;
      height: auto;
      border-radius: 50%;
    }

    .info-content {
      font-size: 1.4rem;

      p:first-of-type {
        font-weight: 600;
        font-size: 1.6rem;
      }

      p {
        margin: 0.5rem 0;
        text-align: center;
        word-break: break-all;
      }
    }
  }
  .action {
    display: none;

    @media (min-width: $bp-md) {
      display: block;
      flex: 1;
      text-align: end;
      margin-right: 2rem;
    }
  }

  .bio,
  .stories {
    padding: 1.5rem 0;
    position: relative;

    h3 {
      padding: 1rem;
      font-size: 1.8rem;
    }
  }

  .bio {
    p {
      padding: 1rem;
      font-size: 1.6rem;
    }
  }
}
</style>
