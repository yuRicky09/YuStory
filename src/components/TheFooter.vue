<template>
  <footer>
    <div class="footer-content">
      <div class="left-side">
        <h2>YUSTORY</h2>
        <a href="https://github.com/yuRicky09/YuStory">
          <font-awesome-icon :icon="['fab', 'github-square']" />
          <span>Source</span>
        </a>
      </div>
      <div class="right-side">
        <ul>
          <li>
            <router-link :to="{ name: 'Home' }"
              ><font-awesome-icon
                :icon="['fa', 'home']"
                fixed-width
              />首頁</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Stories', query: { page: 1 } }"
              ><font-awesome-icon
                :icon="['fa', 'list-ul']"
                fixed-width
              />所有故事</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'CreateStory' }"
              ><font-awesome-icon
                :icon="['fa', 'pencil-alt']"
                fixed-width
              />撰寫故事</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <p>所有圖片皆取自於Unsplash</p>
      <p>&copy; 2021 YuRicky.All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  background-color: var(--color-dark-2);
  color: #fff;

  @media (min-width: $bp-md) {
    flex-direction: row;
    align-items: center;
  }

  & > div {
    margin: 2rem 0;
  }

  .footer-content {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    font-size: 1.6rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-gray-1);

    @media (min-width: $bp-md) {
      justify-content: space-evenly;
      font-size: 1.8rem;
      flex-basis: 50%;
      border-bottom: 0px;
    }

    .left-side {
      font-size: 1.8rem;

      @media (min-width: $bp-md) {
        font-size: 2.4rem;
      }

      a {
        margin: 1rem 0;
        display: block;

        &:hover {
          opacity: 0.7;
        }

        svg {
          margin-right: 1rem;
        }
      }
    }

    .right-side {
      li {
        margin: 1rem 0;

        a {
          display: block;
          &:hover {
            opacity: 0.7;
          }

          svg {
            margin-right: 1rem;
          }
        }
      }
    }
  }

  .copyright {
    text-align: center;
    font-size: 1.3rem;
    margin-top: 0;

    @media (min-width: $bp-md) {
      font-size: 1.6rem;
      flex-basis: 50%;
      align-self: stretch;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 0 1.7rem 10rem;
    }
    p {
      margin: 0.5rem 0;
    }
  }
}
</style>
