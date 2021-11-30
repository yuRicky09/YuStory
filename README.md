<div align="center" id="top"> 
  <img src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Freadme-header.png?alt=media&token=06874354-e8e1-4c9f-a9b7-36223238c187" alt="YUSTORY" />
</div>

<div align="center">
  <h1>YUSTORY</h1>
  <p>Share your Memories Easily with YUSTORY</p>
  <a href="https://yustory-ded59.firebaseapp.com/">Demo</a>
</div>

&#xa0;

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/yuRicky09/YuStory?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/yuRicky09/YuStory?color=lightgrey">

  <img alt="Github stars" src="https://img.shields.io/github/stars/yuRicky09/YuStory?color=yellow" />

  <img alt="blog" src="https://img.shields.io/badge/YUSTORY-BLOG-blue">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#art-layout">Layout</a> &#xa0; | &#xa0;
  <a href="#fountain_pen-usage">Usage</a> &#xa0; | &#xa0;
  <a href="#books-learn">Learn</a>
</p>

<br>

## :dart: About

**YUSTORY**部落格的發想是源自於<a href="https://www.youtube.com/watch?v=ISv22NNL-aE&t=869s&ab_channel=TraversyMedia" target="_blank">Traversy Media</a>頻道發佈的「Vue.js & Firebase Project - FireBlogs」此教學影片。由於剛好在學習 Vue.js 與 Firebase，且也想製作一個可分享自己日本生活趣聞的網站，便決定以此影片為基礎，開發出功能更加完善的部落格網站當作自己的 side project。
如有興趣也歡迎到<a href="https://yustory-ded59.firebaseapp.com/" target="_blank">YUSTORY</a>參觀整個網站架構，體驗發文流程。

## :sparkles: Features

**撰寫故事:** <br>
:heavy_check_mark: 隨時儲存故事備份 <br>
:heavy_check_mark: 即時預覽故事發佈時排版狀況 <br>
:heavy_check_mark: 可自訂故事封面 <br>

**個人帳戶:** <br>
:heavy_check_mark: 可自訂個人頭貼與帳戶封面 <br>
:heavy_check_mark: 查看自己的收藏故事等 <br>

**其他:** <br>
:heavy_check_mark: 依照內容、標籤、作者三大分類查找相關故事 <br>
:heavy_check_mark: 可任意收藏、點讚、留言自己喜歡的故事 <br>
:heavy_check_mark: RWD 響應式設計(手機下不支援撰寫故事) <br>

## :rocket: Technologies

### 使用技術:

**Front End**

- [Vuex](https://vuex.vuejs.org/guide/) 網站的全域狀態管理
- [Vue-Router](https://router.vuejs.org/) 建構 Single Page Application
- [vee-validate](https://vee-validate.logaretm.com/v3) 協助表單驗證
- [vue2-editor](https://www.vue2editor.com/) 使用 Vue.js 和 Quill.js 建構的文字編輯器，發佈故事時必要的核心套件
- [vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper) 使用戶可藉由幻燈片方式挑選故事封面
- [vue-notification](http://vue-notification.yev.io/) 創建可自定義的提示訊息框
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

#### 首頁(未登入):

<img alt="home" src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fhome.png?alt=media&token=1db41f81-b225-4744-916c-ac6dc3f6b408">

---

#### 首頁(登入):

<img alt="home" src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fhome.gif?alt=media&token=266004ac-8f0d-469f-af9e-245d0ca8a6b5">

---

#### 故事列表:

<img alt="home" src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fstories.gif?alt=media&token=2174dd59-bebc-4497-a6a3-d3ebc4a17c0e">

---

#### 故事詳情:

<img alt="story-detail" src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fdetail.gif?alt=media&token=f80ec7bf-8073-4db2-a97c-e072e137bb69">

---

#### Mobile:

<p float="left">
  <img src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fmobile1.gif?alt=media&token=c7909011-831c-4749-98a3-8292d0ea9007" width="300" />
  
  <img src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fmobile2.gif?alt=media&token=e56728c8-bf36-4f05-8576-704b07343d93" width="300" />
</p>

---

## :fountain_pen: Usage

1. 輸入故事標題
2. 輸入故事內容
3. 插入圖片後即可選擇封面
4. tag 最多可新增 3 個
5. 可於任何時候備份故事
6. 可於任何時候預覽故事發佈時排版狀況
7. 按下發佈故事後跳轉到故事詳情頁
   <img alt="blog" src="https://firebasestorage.googleapis.com/v0/b/yustory-ded59.appspot.com/o/other%2Fusage.gif?alt=media&token=7897fb34-6cad-4b4f-94a7-d1dbfd80cbc8">

## :books: Learn

#### 收穫

1. 更加熟習如何使用 Vue `Option API`、`Vuex`與`Vue-Router`。
2. 學會如何使用`Firebase`來幫助完成專案後端部分。
3. 學會如何使用`vee-validate`等套件更加完善整個網站且加快開發速度，並且不只依賴套件也嘗試自己手刻分頁等常見功能組件。

#### 反思

1. 規劃功能時要想得更加全面，而不是想一步寫一步，這樣寫的組件會常常只能是當下的情況才能使用，而不是一個可複用率高的組件。
2. 變數與 class 命名要更加精準且有結構，發現自己有些變數名命名的太模糊，過一陣子再看也會忘記造成不易維護，class 名命之後想嘗試使用 BEM 命名方式。
3. 想好資料要如何儲存於 db，特別是多對多關係的資料，不然會造成後續 query 查詢不易，如果使用 firebase 的話，可於 doc 下再建一個 collection 並且使用`collection group`query 方法達成跨 collection 查詢。

---

更多細節歡迎參觀:<a href="https://yustory-ded59.firebaseapp.com/" target="_blank">YUSTORY</a>

Made by <a href="https://github.com/yuRicky09" 
target="_blank">yuRicky09</a>

<a href="#top">Back to top</a>
