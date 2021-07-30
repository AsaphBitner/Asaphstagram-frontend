<template>
  <div class="single-page-story-container">
    <app-header @openNewStory="openNewStory()" />

    <new-story 
    v-if="newStoryOn"
    @close="closeNewStory('no update')"
    @saved="closeNewStory('yes update')"
     />
    <div
    v-if="this.backgroundDisplayed"
      class="menu-background"
      @click="closeBackground()"
    >
      <div
        v-if="this.deleteMenuDisplayed"
        class="delete-menu"
      >
        <span v-if="storyByMe()" class="menu-option-delete" @click.stop="openComfirmMenu()"
          >Delete {{ this.toDeleteEntity }}</span
        >
        <span class="menu-option-cancel" @click.stop="closeBackground()"
          >Cancel</span
        >
      </div>
      <div
        v-if="confirmMenuDisplayed"
        class="are-you-sure-menu"
      >
        <span class="confirmation">Are you sure?</span>
        <span class="yesNo"
          ><span class="yes" @click.stop="deleteConfirmed()">Yes, delete</span
          ><span class="no" @click.stop="closeBackground()"
            >No, cancel</span
          ></span
        >
      </div>
      <!-- ======= END OF DELETE COMMENT OR STORY ======== -->
    </div>
    <div class="single-story-on-page-container" :story="this.story">
            <!-- ========== IMAGE! ============ -->
            <div class="single-story-main-image">
              <img :src="story.imgUrl" alt="ERROR!" />
            </div>
            <!-- ========== IMAGE! ============ -->
            <div class="single-story-not-the-image">

            
            <div class="story-user-photo-name">
              <router-link to="/profile-page">
                <div class="small-profile-img-story-2">
                  <img :src="this.story.owner.imgUrl" alt="ERROR!" />
                </div>
              </router-link>
              <router-link to="/profile-page" class="user-name-story">
                {{ story.owner.username }}
              </router-link>
              <span
                class="story-options"
                @click="setToDelete(' story', story, idx)"
              >
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
            </div>
            <!-- START OF TEXT AND COMMENTS -->
            <span class="small-profile-img-story-2">
                  <img :src="this.story.owner.imgUrl" alt="ERROR!" />
                </span>
              <div class="story-text">
                <p>
                  <span @click="sendToProfilePage(comment.by.id)">{{ story.owner.username }}</span> {{ story.txt }}
                </p>
              </div>
              <!-- start of comments!!!!!!!!!!!!!!!!!! -->
              <div class="story-comments">
                <ul v-for="(comment, cIdx) in story.comments" :key="comment.id">
                  <li class="single-comment">
                    <!-- SINGLE COMMENT! -->
                    <span class="small-profile-img-comment" @click="sendToProfilePage(comment.by.id)">
                      <img :src="getUserImgForComment(comment.by.id)" alt="" >
                    </span>
                    <p>
                      <span @click="sendToProfilePage(comment.by.id)">{{ comment.by.username }}</span
                      >&nbsp;{{ comment.txt }}
                    </p>
                    <span
                      v-if="commentByMe(comment.by.id)"
                      class="delete-comment"
                      @click="
                        setToDelete(' comment', story, idx, comment, cIdx)
                      "
                    >
                      <svg
                        aria-label="Comment Options"
                        class="_8-yf5"
                        fill="#8e8e8e"
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
                      v-if="!commentLikedByMe(story, cIdx)"
                      @click="
                        toggleLike('add', 'comment', story, idx, comment, cIdx)
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
                      v-if="commentLikedByMe(story, cIdx)"
                      @click="
                        toggleLike(
                          'remove',
                          'comment',
                          story,
                          idx,
                          comment,
                          cIdx
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
                    <!-- SINGLE COMMENT! -->
                  </li>
                </ul>
              </div>
            <div class="story-after-photo">
              <div class="story-four-icons-container">
                <div class="story-four-icons">
                  <span
                    v-if="!likedByMe(story)"
                    @click="toggleLike('add', 'story', story, idx)"
                  >
                    <svg
                      aria-label="Like"
                      class="story-like-icon"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                      ></path>
                    </svg>
                  </span>
                  <span
                    v-if="likedByMe(story)"
                    @click="toggleLike('remove', 'story', story, idx)"
                  >
                    <svg
                      aria-label="unLike"
                      class="story-unlike-icon"
                      fill="red"
                      color="red"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                      ></path>
                      <path
                        d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                      ></path>
                    </svg>
                  </span>
                  <!-- COMMENT -->
                  <span class="story-comment-icon">
                    <svg
                      aria-label="Comment"
                      class="story-comment-icon"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <!-- MESSAGE -->
                  <span class="story-message-icon">
                    <svg
                      aria-label="Direct"
                      class=""
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                      ></path>
                    </svg>
                  </span>
                  <!-- BOOKMARK -->
                  <span class="story-bookmark">
                    <svg
                      aria-label="Save"
                      class="_8-yf5"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <!-- End of four icons -->
              <div class="story-liked-by">
                <p v-if="story.likedBy.length ">
                  Liked by&nbsp;<span>{{ latestLiker(story) }}</span
                  >&nbsp;{{ likedByMessage(story) }}
                </p>
              </div>
              
              <!-- end of comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

              <div class="story-how-long-ago">
                {{ timeDifference(Date.now(), story.createdAt).toUpperCase() }}
              </div>
              <div class="story-add-comment">
                <form @submit="addComment(story, idx, $event)" method="POST">
                  <button type="button">
                    <div class="">
                      <svg
                        aria-label="Emoji"
                        class="_8-yf5"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <path
                          d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"
                        ></path>
                        <path
                          d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div class="" style=""></div>
                  <textarea
                    v-model="newCommentInput"
                    @keydown.enter="addComment(story, idx, $event)"
                    aria-label="Add a comment…"
                    placeholder="Add a comment…"
                    class="Ypffh"
                    autocomplete="off"
                    autocorrect="off"
                    style=""
                  ></textarea>
                  <button
                    class=""
                    type="submit"
                    @click="addComment(story, idx, $event)"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>


//  =========== END OF TEMPLATE!!! ================================================


<script>
import appHeader from "@/components/app-header.vue";
import newStory from '@/components/new-story.vue'


export default {
  components: {
    appHeader,
    newStory,
  },

  data() {
    return {
      story: {},
      idx: -100,
      users: [],
      loggedInUser: this.$store.state.loggedInUser,
      newCommentInput: '',
      backgroundDisplayed: false,
      deleteMenuDisplayed: false,
      confirmMenuDisplayed: false,
      toDeleteEntity: "",
      commentToDelete: {},
      storyToDelete: {},
      newStoryOn: false,
    };
  },
  methods: {
    async setStories(){
      await this.$store.dispatch('loadStories')
      
      // console.log('in set stories: ', this.$store.state.stories)
    },
    async setUsers(){
      await this.$store.dispatch('loadUsers')
    },
    // loadStories() {
    //   this.stories = this.$store.getters.getStories;
    // },
    
    loadUsers() {
      this.users = this.$store.getters.getUsers;
    },

    async loadLimitedStories() {
      await this.loadStories()
      this.storiesToShow = this.stories.slice(0, this.numStoriesToShow);
    },

    resetnewCommentsInput() {
      this.newCommentInput = '';
    },
    timeDifference(current, previous) {
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return "about " + Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return "about " + Math.round(elapsed / msPerMonth) + " months ago";
      } else {
        return "about " + Math.round(elapsed / msPerYear) + " years ago";
      }
    },
    likedByMessage(story) {
      if (!story.likedBy.length) return;
      if (story.likedBy.length === 1) {
        return "";
      } else if (story.likedBy.length === 2) {
        return `and 1 other`;
      } else {
        return `and ${story.likedBy.length - 1} others`;
      }
    },

    latestLiker(story) {
      if (!story.likedBy.length) return;
      if (story.likedBy[0].id === this.$store.state.loggedInUser.id) {
        return "you";
      } else {
        return story.likedBy[0].username;
      }
    },

    likedByMe(story) {
      if (!story.likedBy || !story.likedBy.length) return false 
      const likedOrNot = story.likedBy.find((item) => {
        return item.id === this.$store.state.loggedInUser.id;
      });
      return likedOrNot;
    },
    commentLikedByMe(story, idx) {
      if (!story.comments[idx].likedBy) return false;
      const likedOrNot = story.comments[idx].likedBy.find((item) => {
        return item.id === this.$store.state.loggedInUser.id;
      });
      return likedOrNot;
    },
    async toggleLike(
      request,
      entityType,
      story,
      storyIdx,
      comment = null,
      commentIdx = null
    ) {
      const payload = {
        request: request,
        entityType: entityType,
        story: story,
        storyIdx: storyIdx,
        comment: comment,
        commentIdx: commentIdx,
      };

      await this.$store.dispatch("toggleLike", payload);
      this.loadLimitedStories();
    },
    commentByMe(commenterId) {
      if (commenterId === this.$store.state.loggedInUser.id) {
        return true;
      } else {
        return false;
      }
    },
    async addComment(story, storyIdx, ev) {
      if (ev.type==="keydown" && ev.shiftKey) return;
      ev.preventDefault();
      if (!this.newCommentInput) {
        console.log("No text");
        return;
      }
      const text = this.newCommentInput;
      const payload = {
        story: story,
        storyIdx: storyIdx,
        text: text,
      }
      await this.$store.dispatch("addComment", payload);
      await this.resetnewCommentsInput();
      this.loadLimitedStories();
    },
    async deleteComment() {
      // console.log('comment to Delete: ', this.commentToDelete)
      const payload = this.commentToDelete;
      await this.$store.dispatch("deleteComment", payload);
      this.commentToDelete = {};
      this.loadLimitedStories();
    },
    async deleteStory() {
      const payload = this.storyToDelete;
      await this.$store.dispatch("deleteStory", payload);
      // console.log(this.storyToDelete)
      this.storyToDelete = {};
      this.loadLimitedStories();
      
    },
    openDeleteMenu() {
      this.backgroundDisplayed = true;
      this.deleteMenuDisplayed = true;
    },
    openComfirmMenu() {
      this.deleteMenuDisplayed = false;
      this.confirmMenuDisplayed = true;
    },
    closeBackground() {
      this.backgroundDisplayed = false;
      this.deleteMenuDisplayed = false;
      this.confirmMenuDisplayed = false;
      this.loadLimitedStories();
    },

    deleteConfirmed() {
      if (this.toDeleteEntity === " comment") {
        this.deleteComment();
        this.closeBackground();
      } else if (this.toDeleteEntity === " story") {
        // console.log('Delete story not ready yet')
        this.deleteStory();
        this.closeBackground();
      }
    },
    setToDelete(entityType, story, idx, comment = null, cIdx = null) {
      this.toDeleteEntity = entityType;
      if (entityType === " comment") {
        this.commentToDelete = {
          story: story,
          storyIdx: idx,
          comment: comment,
          commentIdx: cIdx,
        };
      } else if (entityType === " story") {
        this.storyToDelete = {
          story: story,
          idx: idx,
        };
      }
      this.openDeleteMenu();
    },

  openNewStory(){
    this.newStoryOn = true
  },
  closeNewStory(result){
    this.newStoryOn = false
    if (result === 'yes update') {this.$router.push('/following-feed/'+this.loggedInUser.id)}
  },
  storyByMe(){
    // console.log(this.storyToDelete.owner.id, this.loggedInUser.id)
    if (this.story.owner.id === this.loggedInUser.id)
    {return true}
    else 
    {return false}
  },
  getUserImgForComment(id){
    const user = this.users.find(item => {return item.id === id})
    const imgUrl = user.profileImgUrl
    // console.log('user: ', user, 'imgUrel: ', imgUrl)
    return imgUrl
  },
  sendToProfilePage(id){
    this.$router.push('/profile-page/'+id)
  },

  
  //======================END OF METHODS=================
    
  },
  // computed: {
  // },
  async created() {
    await this.setStories()
    const storyId = this.$route.params.storyId
    this.story = this.$store.state.stories.find(item => {return item.id === storyId})
    this.idx = this.$store.state.stories.findIndex(item => {return item.id === storyId})
    // console.log(this.story, this.idx)
    await this.setUsers()
    this.loadUsers()
  },
};

</script>



<style>
</style>

