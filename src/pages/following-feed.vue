<template>
  <container class="page-container" @click="headerProfileMenuChange(false)">
    <app-header :headerMenuShown="headerMenuShown" @menuTrue="headerProfileMenuChange(true)" @menuFalse="headerProfileMenuChange(false)" />
     
    <div
    v-if="this.backgroundDisplayed"
      class="menu-background"
      @click="closeBackground()"
    >
      <div
        v-if="this.deleteMenuDisplayed"
        class="delete-menu"
      >
        <span v-if="(storyByMe && storyToDelete) || commentToDelete.comment" class="menu-option-delete" @click.stop="openComfirmMenu()"
          >Delete&nbsp;{{ this.toDeleteEntity }}</span>
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
          ><span class="yes" @click.stop="deleteConfirmed()">Yes, Delete</span
          ><span class="no" @click.stop="closeBackground()"
            >No, Cancel</span
          ></span
        >
      </div>
      <!-- ======= END OF DELETE COMMENT OR STORY ======== -->
    </div>
    <div class="stories-container">
      <ul
        class="story-list"
        v-for="(story, idx) in this.storiesToShow"
        :key="story._id"
      >
        <li>
          <div class="single-story-container">
            <storyUserPhotoName :story="story" @storyDeleted="reloadPage"/>
            <mainImageStory :story="story"/>
            <div class="story-after-photo">
              <storyFourIcons :story="story"/>
              <storyLikedBy :story="story"/>
              <storyText :story="story"/>              
    <!-- start of comments!!!!!!!!!!!!!!!!!! -->
              <div class="story-comments">
                <p  @click="openSingleStory(story)" class="view-all-comments" v-if="story.comments.length">
                  View all {{ story.comments.length }} comments
                </p>
                <ul v-for="(comment, cIdx) in story.comments" :key="comment._id">
                  <li v-if="cIdx >= (story.comments.length - 2)">
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
                        setToDelete('Comment', story, comment, cIdx)
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
                      v-if="!commentLikedByMe(comment)"
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
                      v-if="commentLikedByMe(comment)"
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
                    </span>
                    <!-- SINGLE COMMENT! -->
                  </li>
                </ul>
              </div>
              <!-- end of comments!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

              <div class="story-how-long-ago">
                {{ timeDifference(Date.now(), story.createdAt).toUpperCase() }}
              </div>
              <div class="story-add-comment">
                <form @submit="addComment(story, idx, $event)" method="POST">
                  <button type="button" class="comment-imoji-icon">
                    <div >
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
                    v-model="newCommentInputs[idx]"
                    @keydown.enter="addComment(story, idx, $event)"
                    aria-label="Add a comment…"
                    placeholder="Add a comment…"
                    class="comment-text-area"
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
        </li>
      </ul>
    </div>
<!-- v-if="storiesFollowing.length > numStoriesToShow" -->
    <div v-if="storiesFollowing.length > numStoriesToShow" @click="LoadMoreStoreis" class="load-more-storeis"><h1>Load More Posts</h1></div>
  </container>
</template>

<script>
import appHeader from "@/components/app-header.vue";
// import newStory from '@/components/new-story.vue';
import storyUserPhotoName from '@/components/story-timeline-cmps/story-user-photo-name.vue'
import mainImageStory from '@/components/story-timeline-cmps/main-image-story.vue'
import storyFourIcons from '@/components/story-timeline-cmps/story-four-icons.vue'
import storyLikedBy from '@/components/story-timeline-cmps/story-liked-by.vue'
import storyText from '@/components/story-timeline-cmps/story-text.vue'
// import storyComments from '@/components/story-timeline-cmps/story-comments.vue'

export default {
  components: {
    appHeader,
    storyUserPhotoName,
    mainImageStory,
    storyFourIcons,
    storyLikedBy,
    storyText,
    // storyComments,
  },

  data() {
    return {
      loggedInUser: {},
      numStoriesToShow: 6,
      stories: [],
      storiesFollowing: [],
      storiesToShow: [],
      users: [],
      newCommentInputs: [],
      numCommentsToShow: 1,
      commentsToShow: [],
      backgroundDisplayed: false,
      deleteMenuDisplayed: false,
      confirmMenuDisplayed: false,
      toDeleteEntity: "",
      commentToDelete: {},
      storyToDelete: {},
      newStoryOn: false,
      headerMenuShown: false,
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
      loadUsers() {
        this.users = this.$store.state.users;
      },

    loadStories() {
      this.stories = this.$store.state.stories;
    },
    

    async loadLimitedStories() {
      // await this.setStories()
      await this.loadStories()
      // const storiesCut = this.stories.slice(0, this.numStoriesToShow)
      const currentUser = this.users.find(item => { return item._id === this.loggedInUser._id})
      this.storiesFollowing = this.stories.filter(item=> {
        return currentUser.following.find(user => {return user === item.owner._id}) })
      // const followingOwner = currentUser.following.find(user => user === item.owner._id)
      // if (followingOwner) {return true}
      // else {return false}
    // })
    const storiesNew = this.storiesFollowing.slice(0, this.numStoriesToShow)
    this.storiesToShow = storiesNew.slice()
      /////////////////////////////////////
      while (this.newCommentInputs.length < this.numStoriesToShow) {
        this.newCommentInputs.push("");
      }
    },

    LoadMoreStoreis(){
      this.numStoriesToShow += 6
      this.loadLimitedStories()
    },

    async getLoggedInUser(){
        this.loggedInUser = await this.$store.dispatch('getLoggedInUser')
    },

    resetnewCommentsInput(idx) {
      this.newCommentInputs[idx] = '';
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
      if (story.likedBy[0]._id === this.$store.state.loggedInUser._id) {
        return "you";
      } else {
        return story.likedBy[0].username;
      }
    },

    likedByMe(story) {
      if (!story.likedBy || !story.likedBy.length) return false 
      const likedOrNot = story.likedBy.find((item) => {
        return item._id === this.$store.state.loggedInUser._id;
      });
      return likedOrNot;
    },
    commentLikedByMe(comment) {
      if (!comment.likedBy.length) return false;
      // console.log(comment.by.username, comment.likedBy)
      const likedOrNot = comment.likedBy.find((item) => {
        return item === this.loggedInUser._id
      });
      // console.log(likedOrNot)
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
      // console.log(commenterId, this.loggedInUser._id)
      if (commenterId === this.loggedInUser._id) {
        return true;
      } else {
        return false;
      }
    },
    async addComment(story, storyIdx, ev) {
      if (ev.shiftKey) return;
      ev.preventDefault();
      if (!this.newCommentInputs[storyIdx]) {
        console.log("No text");
        return;
      }
      const text = this.newCommentInputs[storyIdx];
      const payload = {
        story: story,
        storyIdx: storyIdx,
        text: text,
      };
      await this.$store.dispatch("addComment", payload);
      await this.resetnewCommentsInput(storyIdx);
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
      this.toDeleteEntity = ''
      this.loadLimitedStories();
    },

    deleteConfirmed() {
      if (this.toDeleteEntity === "Comment") {
        this.deleteComment();
      } else if (this.toDeleteEntity === "Post") {
        // console.log('Delete story not ready yet')
        this.deleteStory();
      }
        this.closeBackground();
        this.toDeleteEntity = ''
    },
    setToDelete(entityType, story, comment = null, cIdx = null) {
      this.toDeleteEntity = entityType;
      if (entityType === "Comment") {
        this.commentToDelete = {
          story: story,
          comment: comment,
          commentIdx: cIdx,
        };
      } else if (entityType === "Post") {
        this.storyToDelete = story
      }
      this.openDeleteMenu();
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
      this.storyToDelete = {};
      this.loadLimitedStories();
    },

  
  
  storyByMe(){
    if (!this.storyToDelete) return false
    if (this.storyToDelete.owner._id === this.loggedInUser._id)
    {return true}
    else 
    {return false}
  },
  openSingleStory(story){
    this.$router.push('/single-story/'+story._id)
  },
  sendToProfilePage(_id){
    this.$router.push('/profile-page/'+_id)
  },
  headerProfileMenuChange(status){
    this.headerMenuShown = status
  },

  reloadPage(){
    location.reload()
  },


  //======================END OF METHODS=================
    
  },
  
  async created() {
    await this.getLoggedInUser()
      if(!this.loggedInUser._id){this.$router.push('/')}

    const userId = this.$route.params.userId
    const loggedInId = this.loggedInUser._id
    if (userId !== loggedInId){
      console.log('user ID: ', userId, 'logged in ID: ', loggedInId)
      this.$router.push('/')
      }
    await this.setUsers()
    this.loadUsers()
    await this.setStories()
    this.loadLimitedStories()
    // console.log('users loaded: ', this.users)
  },
};
</script>

<style>
</style>