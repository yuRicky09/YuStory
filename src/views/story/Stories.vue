<template>
  <div>
    <main>
      <article>
        <story-intro-rect></story-intro-rect>
      </article>
    </main>
    <aside></aside>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "Stories",
  components: { StoryIntroRect },
};
</script>

<style></style>
