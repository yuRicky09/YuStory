<template>
  <section class="asideUserInfo">
    <div class="user-info">
      <img :src="currentAuthor.userProfileImg" alt="user-avatar" />
      <h4>{{ currentAuthor.userName }}</h4>
    </div>
    <div class="user-bio">
      <p>{{ currentAuthor.userBio }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "AsideUserInfo",
  props: ["currentAuthor"],
};
</script>

<style lang="scss" scoped>
.asideUserInfo {
  position: sticky;
  top: 0;

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid var(--color-border);

    img {
      width: 12rem;
      height: 12rem;
      border-radius: 5px;
      box-shadow: 0 5px 10px var(--color-layout);
    }

    h4 {
      margin: 1rem 0;
    }
  }

  .user-bio {
    padding: 5px;

    p {
      font-size: 1.4rem;
      color: var(--color-bg-gray-1);
    }
  }
}
</style>
