<template>
  <section v-if="story.owner._id" class="story-user-photo-name-2">
    <div
      class="small-profile-img-story-2"
      @click="sendToProfilePage(story.owner._id)"
    >
      <img :src="story.owner.profileImgUrl" alt="ERROR!" />

      <span @click="sendToProfilePage(story.owner._id)">
        {{ story.owner.username }}
      </span>
    </div>
    <span class="story-options" @click="setToDelete()">
      <svg
        aria-label="More options"
        class=""
        fill="#262626"
        height="16"
        role="img"
        viewBox="0 0 48 48"
        width="16"
      >
        <circle
          clip-rule="evenodd"
          cx="8"
          cy="24"
          fill-rule="evenodd"
          r="4.5"
        ></circle>
        <circle
          clip-rule="evenodd"
          cx="24"
          cy="24"
          fill-rule="evenodd"
          r="4.5"
        ></circle>
        <circle
          clip-rule="evenodd"
          cx="40"
          cy="24"
          fill-rule="evenodd"
          r="4.5"
        ></circle>
      </svg>
    </span>

    <div
      v-if="backgroundDisplayed"
      class="menu-background"
      @click="closeBackground()"
    ></div>
    <div v-if="deleteMenuDisplayed" class="delete-menu">
      <span class="menu-option-delete" @click.stop="openConfirmMenu()"
        >Delete&nbsp;Post</span
      >
      <span class="menu-option-cancel" @click.stop="closeBackground()"
        >Cancel</span
      >
    </div>
    <div v-if="confirmMenuDisplayed" class="are-you-sure-menu">
      <span class="confirmation">Are you sure?</span>
      <span class="yesNo"
        ><span class="yes" @click.stop="deleteConfirmed()">Yes, Delete</span>
        <span class="no" @click.stop="closeBackground()">No, Cancel</span></span
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    story: Object,
  },

  data() {
    return {
      // ownerProfileImg: getStoryOwnerImage,
      backgroundDisplayed: false,
      deleteMenuDisplayed: false,
      confirmMenuDisplayed: false,
    };
  },
  methods: {
    sendToProfilePage(_id) {
      this.$router.push("/profile-page/" + _id);
    },

    async deleteStory() {
      const payload = {
        _id: this.story._id,
      };
      await this.$store.dispatch("deleteStory", payload);
      this.$emit("storyDeleted");
    },

    closeBackground() {
      this.deleteMenuDisplayed = false;
      this.confirmMenuDisplayed = false;
      this.backgroundDisplayed = false;
    },
    setToDelete() {
      this.openDeleteMenu();
    },
    openDeleteMenu() {
      this.backgroundDisplayed = true;
      this.deleteMenuDisplayed = true;
    },
    openConfirmMenu() {
      this.deleteMenuDisplayed = false;
      this.confirmMenuDisplayed = true;
    },
    async deleteConfirmed() {
      let payload = this.story._id;
      await this.$store.dispatch("deleteStory", payload);
      this.closeBackground();
      location.reload();
    },
    // getStoryOwnerImage(){
    //   return this.story.owner.profileImgUrl
    // },
  },

  created() {},
};
</script>

<style>
</style>