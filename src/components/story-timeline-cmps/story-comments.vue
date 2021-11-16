<template>
    <section class="story-comments">
                <p  @click="openSingleStory(story)" class="view-all-comments" v-if="story.comments.length > 1">
                  View all {{ story.comments.length }} comments
                </p>
                <p  @click="openSingleStory(story)" class="view-all-comments" v-else>
                  View full post
                </p>
                <ul v-for="comment in story.comments" :key="comment._id">
                  <li>
                    <!-- SINGLE COMMENT! -->
                    <p>
                      <span @click="sendToProfilePage(comment.by._id)">{{ comment.by.username }}</span
                      >&nbsp;{{ comment.text }}
                    </p>

                    <span class="comment-like-unlike-delete">   
                    <span
                    v-if="commentByMe(comment.by._id)"
                      class="delete-comment"
                      @click="
                        setToDelete(comment._id)
                      "
                    >
                      <svg
                        aria-label="Comment Options"
                        class="_8-yf5"
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
                    </span>
                    <span
                      v-if="!commentLikedByMe(comment._id)"
                      @click="
                        toggleLike('add', 'comment', story, idx, comment, idx)
                      "
                      class="comment-like"
                    >
                      <svg
                        aria-label="Like"
                        class=""
                        fill="#262626"
                        height="12"
                        role="img"
                        viewBox="0 0 48 48"
                        width="12"
                      >
                        <path
                          d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                        ></path>
                      </svg>
                    </span>
                    <span
                      v-if="commentLikedByMe(comment._id)"
                      @click="
                        toggleLike(
                          'remove',
                          'comment',
                          story,
                          idx,
                          comment,
                          idx
                        )
                      "
                      class="comment-unlike"
                    >
                      <svg
                        aria-label="unLike"
                        class=""
                        fill="red"
                        height="12"
                        role="img"
                        viewBox="0 0 48 48"
                        width="12"
                      >
                        <path
                          d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                        ></path>
                        <path
                          d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                        ></path>
                      </svg>
                    </span>
                    </span>
                    <!-- SINGLE COMMENT! -->
                  </li>
                </ul>
    <div v-if="this.backgroundDisplayed" class="menu-background" @click="closeBackground()">
      </div>
      <div v-if="this.deleteMenuDisplayed" class="delete-menu">
        <span class="menu-option-delete" @click.stop="openComfirmMenu()">Delete&nbsp; Comment</span>
        <span class="menu-option-cancel" @click.stop="closeBackground()">Cancel</span>
      </div>
      <div v-if="confirmMenuDisplayed" class="are-you-sure-menu">
        <span class="confirmation">Are you sure?</span>
        <span class="yesNo"><span class="yes" @click.stop="deleteConfirmed()">Yes, Delete</span>
        <span class="no" @click.stop="closeBackground()">No, Cancel</span></span>
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
      loggedInUser: {},
      commentToDelete: '',
      backgroundDisplayed: false,
      deleteMenuDisplayed: false,
      confirmMenuDisplayed: false,
    };
  },
  methods: {
    async getLoggedInUser() {
      this.loggedInUser = await this.$store.dispatch("getLoggedInUser");
    },
    sendToProfilePage(_id) {
      this.$router.push("/profile-page/" + _id);
    },
    openSingleStory(_id) {
      this.$router.push("/single-story/" + _id);
    },
    commentByMe(commenterId) {
      if (commenterId === this.loggedInUser._id) {
        return true;
      } else {
        return false;
      }
    },
    closeBackground(){
        this.deleteMenuDisplayed = false
        this.confirmMenuDisplayed = false
        this.backgroundDisplayed = false
        this.commentToDelete = ''
    },    
    setToDelete(commentId) {
      this.commentToDelete = commentId
      this.openDeleteMenu();
    },
    openDeleteMenu(){
        this.backgroundDisplayed = true
        this.deleteMenuDisplayed = true
    },
    openConfirmMenu(){
        this.deleteMenuDisplayed = false
        this.confirmMenuDisplayed = true
    },
    async deleteConfirmed(){
        let payload = {
            storyId: this.story._id,
            commentId: this.commentToDelete,
        }
        await this.$store.dispatch('deleteComment', payload)
        this.closeBackground()
    },

  },
  computed:{
      commentLikedByMe(commentId){
          let commentIdx = this.story.comments.findIndex(item => item._id === commentId) 
          return (this.story.comments[commentIdx].likedBy.find(item => item === this.loggedInUser._id))
      }
  },

  async created() {
    await this.getLoggedInUser();
  },
};
</script>
