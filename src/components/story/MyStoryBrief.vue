<template>
  <li class="story-item">
    <div>
      <router-link :to="{ name: 'Story', params: { id: story.id } }">
        <h5>{{ story.title }}</h5>
        <p>{{ story.brief }}</p>
      </router-link>
      <span>{{ createdTime }}</span>
    </div>
  </li>
</template>

<script>
import { timeFormatMixin } from "@/mixin/timeFormatMixin";

export default {
  name: "MyStoryBrief",
  props: ["story"],
  mixins: [timeFormatMixin],
};
</script>

<style lang="scss" scoped>
.story-item {
  border-bottom: 1px solid var(--color-border);

  div {
    padding: 1rem 2rem;

    a {
      display: block;

      h5 {
        font-size: 1.6rem;
        margin: 0.5rem 0;
      }

      p {
        margin: 0.5rem 0;
        font-size: 1.4rem;
        color: var(--color-bg-gray-1);
      }

      &:hover h5 {
        color: #117096;
      }
    }
    span {
      display: block;
      text-align: end;
    }
  }
}
</style>
