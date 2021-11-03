<template>
  <section>
    <div><img :src="story.cover.coverDownloadURL" /></div>
    <div>{{ story.title }}</div>
  </section>
</template>

<script>
export default {
  name: "StoryIntroRect",
  props: ["story"],
};
</script>

<style></style>
