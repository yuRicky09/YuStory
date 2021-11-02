<template>
  <section>
    <div><img :src="story.storyCover.coverDownloadURL" /></div>
    <div>{{ story.storyTitle }}</div>
  </section>
</template>

<script>
export default {
  name: "StoryIntroRect",
  props: ["story"],
};
</script>

<style></style>
