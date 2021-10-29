<template>
  <div class="avatar-wrapper">
    <div class="avatar-title">
      <h3>設定頭像</h3>
    </div>
    <div class="avatar-content">
      <div class="avatar-current">
        <p>當前頭像</p>
        <img v-if="userProfileImg" :src="userProfileImg" alt="user-avatar" />
        <div v-else class="avatar-null"><span>頭像尚未設置</span></div>
        <label class="button" for="avatar-input">設置頭像</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          class="avatar-input"
          id="avatar-input"
          @change="handleFileChange"
        />
      </div>
      <transition name="zoom-in">
        <div class="avatar-cropper" v-if="selectedFileURL">
          <cropper
            :src="selectedFileURL"
            class="cropper"
            @change="onChange"
            :debounce="false"
            :stencil-props="{
              aspectRatio: 1,
            }"
            :canvas="{
              height: 180,
              width: 180,
            }"
            ref="cropper"
          />
          <div v-if="selectedFileURL" class="preview-box">
            <preview
              :width="180"
              :height="180"
              :image="previewResult.image"
              :coordinates="previewResult.coordinates"
              class="preview-img"
            />
            <p>頭像預覽區 180*180像素</p>
          </div>
        </div>
      </transition>
      <div class="avatar-action" v-if="selectedFileURL">
        <button @click="updateAvatar">更新</button>
      </div>
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-modal :show="show" message="更新頭像成功" @close-modal="closeModal">
      <template #action>
        <button @click="closeModal">確定</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Cropper, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  name: "UserAvatar",
  components: {
    Cropper,
    Preview,
  },
  data() {
    return {
      selectedFileURL: "",
      previewResult: {
        coordinates: null,
        image: null,
      },
      show: false,
    };
  },
  computed: {
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    handleFileChange(e) {
      const selectedFIle = e.target.files[0];
      console.log(selectedFIle);

      this.selectedFileURL = URL.createObjectURL(selectedFIle);
    },
    onChange({ coordinates, image }) {
      this.previewResult = { coordinates, image };
    },
    async updateAvatar() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        console.dir(canvas);
        canvas.toBlob(async (blob) => {
          await this.$store.dispatch("auth/updateProfileImg", blob);
          this.selectedFileURL = null;
          this.show = true;
        });
      }
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  font-size: 1.6rem;

  .avatar-title {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-bg-gray-1);
    font-size: 2rem;
  }

  .avatar-current {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin: 2rem 0;
      font-weight: 600;
    }

    img,
    .avatar-null {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
    }

    .avatar-null {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-bg-white-1);
      color: #fff;
    }

    label.button {
      margin: 2rem 0;
    }

    .avatar-input {
      display: none;
    }
  }

  .avatar-cropper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--color-border);
    padding: 1rem;

    @media (min-width: $bp-md) {
      flex-direction: row;
      // column-gap: 5rem;
    }

    .cropper {
      width: 20rem;
      height: 20rem;

      @media (min-width: $bp-md) {
        width: 30rem;
        height: 30rem;
        flex: 1;
        border-right: 1px solid var(--color-border);
      }
    }

    .preview-box {
      @media (min-width: $bp-md) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .preview-img {
        display: none;

        @media (min-width: $bp-md) {
          display: block;
        }
        border-radius: 50%;
      }

      p {
        margin: 1rem 0;
      }
    }
  }

  .avatar-action {
    text-align: center;
    margin: 2rem 0;
  }
}

.zoom-in-enter-active {
  animation: zoom-in 0.3s ease-out;
}

.zoom-in-leave-active {
  animation: zoom-in 0.3s ease-out reverse;
}
</style>
