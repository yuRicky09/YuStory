<div align="center" id="top"> 
  <img src="@/../src/assets/img/readme-header.png" alt="YUSTORY" />
</div>

<div align="center">
  <h1>YUSTORY</h1>
  <p>Share your Memories Easily with YUSTORY</p>
  <a href="https://yustory-ded59.web.app/">Demo</a>
</div>

---

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/yuRicky09/YuStory?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/yuRicky09/YuStory?color=lightgrey">

  <img alt="blog" src="https://img.shields.io/badge/YUSTORY-BLOG-blue">

  <img alt="Github stars" src="https://img.shields.io/github/stars/yuRicky09/YuStory?color=yellow" />
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#art-layout">Layout</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/{{YOUR_GITHUB_USERNAME}}" target="_blank">Author</a>
</p>

<br>

## :dart: About

**YUSTORY**部落格的發想是源自於[Traversy Media](https://www.youtube.com/watch?v=ISv22NNL-aE&t=869s&ab_channel=TraversyMedia)頻道發佈的「Vue.js & Firebase Project - FireBlogs」此教學影片。由於剛好在學習 Vue.js 與 Firebase，且也想製作一個可分享自己日本生活趣聞的網站，便決定以此影片為基礎，開發出功能更加完善的部落格網站當作自己的 side project。
如有興趣也歡迎到[YUSTORY](https://yustory-ded59.web.app/stories?page=1)參觀整個網站架構，體驗發文流程。

## :sparkles: Features

**撰寫文章:**
:heavy_check_mark: 隨時儲存文章備份 <br>
:heavy_check_mark: 即時預覽文章發佈時排版狀況 <br>
:heavy_check_mark: 可自訂文章封面 <br>

**個人帳戶:**
:heavy_check_mark: 可自訂個人頭貼與帳戶封面 <br>
:heavy_check_mark: 查看自己的收藏文章等 <br>

**其他:**
:heavy_check_mark: 依照內容、標籤、作者三大分類查找相關文章 <br>
:heavy_check_mark: 可任意收藏、點讚、留言自己喜歡的文章 <br>
:heavy_check_mark: RWD 響應式設計(手機下不支援撰寫文章) <br>

## :rocket: Technologies

### 使用技術:

**Front End**

- [Vuex](https://vuex.vuejs.org/guide/) 網站的全域狀態管理
- [Vue-Router](https://router.vuejs.org/) 建構 Single Page Application
- [vee-validate](https://vee-validate.logaretm.com/v3) 協助表單驗證
- [vue2-editor](https://www.vue2editor.com/) 使用 Vue.js 和 Quill.js 建構的文字編輯器，發佈文章時必要的核心套件
- [vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper) 使用戶可藉由幻燈片方式挑選文章封面
- [vue-notification](http://vue-notification.yev.io/) 創建可自訂義的提示訊息框
- [vue-advanced-cropper](https://norserium.github.io/vue-advanced-cropper/) 使用戶上傳頭貼時可裁切圖片
- [portal-vue](https://portal-vue.linusb.org/) 使 DOM 元素可渲染於 document 任一處(類似 Vue3 Teleport 功能)
- [vue-dropdowns](https://github.com/mikerodham/vue-dropdowns) 下拉選單
- [FortAwesome](https://github.com/FortAwesome/vue-fontawesome) 網站 icon 皆使用 FortAwesome
- [AOS](https://michalsnik.github.io/aos/) 協助完成滾動動畫
- [moment.js](https://momentjs.com/) 格式化日期
- [nanoid](https://www.npmjs.com/package/nanoid) 產生唯一值 ID

**Back End**

- [Firestore Database](https://firebase.google.com/docs/firestore/quickstart) 使用 Firestore 做為網站的資料庫
- [Firebase Authentication](https://firebase.google.com/docs/auth/web/start) 使用者認證與第三方登入功能
- [Firebase Storage](https://firebase.google.com/docs/storage/web/start) 使用 Storage 存取用戶上傳的圖片

## :art: Layout

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/{{YOUR_GITHUB_USERNAME}}/vue-yustory

# Access
$ cd vue-yustory

# Install dependencies
$ yarn

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/yuRicky09" target="_blank">yuRicky09</a>

&#xa0;

<a href="#top">Back to top</a>
