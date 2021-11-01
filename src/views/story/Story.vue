<template>
  <div>
    <article>
      <section>這邊會是頭部</section>
      <section>
        <div>側邊作者小資訊欄(sticky)</div>
        <div>主要內容</div>
      </section>
    </article>
    <section>這邊會是尾部 點讚 收藏</section>
    <section>顯示留言</section>
    <section>留言組件</section>
  </div>
</template>

<script>
export default {
  name: "Story",
  props: ["id"],
};
</script>

<style lang="scss" scoped></style>
