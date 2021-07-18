<template>
  <div class="page-container">
    <h1>FOLLOWING FEED!!!</h1>

    <div class="stories-container">
      <ul
        class="story-list"
        v-for="(story, idx) in this.photoStoriesToShow"
        :key="story.id"
      >
        <li>
          <div class="single-story-container">
            <div class="story-user-photo-name">
              <div class="small-profile-img-story">
                <img :src="story.owner.imgUrl" alt="ERROR!" />
              </div>
              <p class="user-name-story">{{ story.owner.username }}</p>
            </div>
            <div class="main-image-story">
              <img :src="story.imgUrl" alt="ERROR!" />
            </div>
            <div class="story-text">
              <p>
                <span>{{ story.owner.username }}</span> {{ story.txt }}aaaaaaa
                bbbbbbbbbbbbb cccc ddd eeeeeee ffffff ggggggg
              </p>
            </div>
            <div class="story-comment-like">
              <div class="story-comment-like-icons">
                <span v-if="!likedByMe(story)" @click="addLike(story)">
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
                <span v-if="likedByMe(story)" @click="removeLike(story)">
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
              </div>
              <p v-if="story.likedBy">
                &nbsp;Liked by&nbsp;<span>{{ latestLiker(story) }}</span
                >&nbsp;{{ likedByMessage(story) }}
              </p>
              <!-- <p>Liked by {{story.likedBy[0].fullname}} and {{story.likedBy.length-1}} others</p> -->
            </div>
            <div class="story-comments">
              <p>
                <span>{{ story.comments[0].by.username }}</span
                >&nbsp;{{ story.comments[0].txt }}
              </p>
              <span v-if="commentByMe(story.comments[0].by.id)" class="delete-comment">
                X
              </span>
            </div>
            <p class="view-all-comments">
              &nbsp;View all {{ story.comments.length }} comments
            </p>
            <div class="story-how-long-ago">
              {{ timeDifference(Date.now(), story.createdAt).toUpperCase() }}
            </div>
            <div class="story-add-comment">
              <form @submit.prevent="addComment(story, idx)">
                <input v-model="newCommentInputs[idx]" type="text" placeholder="Add a comment..." />
              </form>
              <!-- {{idx}} -->
              <!-- <span class="delete-comment" @click="removeComment(story)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 512 512"><path d="M512 28.308L483.692 0 256 227.692 28.308 0 0 28.308 227.692 256 0 483.692 28.308 512 256 284.308 483.692 512 512 483.692 284.308 256z"></path></svg>
                </span> -->
            </div>
          </div>
        </li>
      </ul>
      <!-- <img :src="require(`${photoStoriesToShow[0].imgUrl}`)" alt="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storyText: this.$store.state.photoStories[0].txt,
      numStoriesToShow: 6,
      photoStories: [],
      photoStoriesToShow: [],
      users: [],
      newCommentInputs: [],
    };
  },
  methods: {
    loadPhotoStories() {
      this.photoStories = this.$store.getters.getPhotoStories;
    },
    getStoryImgUrl(idx) {
      return this.photoStoriesToShow[idx].imgUrl;
    },
    getUserForStory(ownerId) {
      return this.users.find((user) => {
        user.id === ownerId;
      });
    },
    loadUsers() {
      this.users = this.$store.getters.getUsers;
    },

    loadLimitedPhotoStories() {
      this.photoStoriesToShow = this.photoStories.slice(
        0,
        this.numStoriesToShow
      );
        while (this.newCommentInputs.length < this.numStoriesToShow) {
          this.newCommentInputs.push('')    
        }
        // console.log(this.newCommentInputs)
    //  this.photoStoriesToShow.forEach((item, idx)=>{ 
    //   this.newCommentInputs.splice(idx, 1, '')
    // })
    },
    resetnewCommentsInput(idx){
      this.newCommentInputs[idx] = ''
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
      if (story.likedBy.length === 1) {
        return "";
      } else if (story.likedBy.length === 2) {
        return `and 1 other`;
      } else {
        return `and ${story.likedBy.length - 1} others`;
      }
    },
    latestLiker(story) {
      if (story.likedBy[0].id === this.$store.state.loggedInUser.id) {
        return "you";
      } else {
        return story.likedBy[0].username;
      }
    },

    likedByMe(story) {
      const likedOrNot = story.likedBy.find((item) => {
        return item.id === this.$store.state.loggedInUser.id;
      });
      return likedOrNot;
    },
    addLike(story) {
      this.$store.commit("addLike", story.id);
    },
    removeLike(story) {
      this.$store.commit("removeLike", story.id);
      this.loadLimitedPhotoStories();
    },
    commentByMe(commenterId) {
      if (commenterId === this.$store.state.loggedInUser.id) {
        return true;
      } else {
        return false;
      }
    },
    addComment(story, storyIdx) {
      var text = this.newCommentInputs[storyIdx];
      // console.log(text)
      var idAndTxt = {
        id: story.id,
        txt: text,
      }
      this.$store.commit('addComment', idAndTxt)
      this.resetnewCommentsInput(storyIdx);
      this.loadLimitedPhotoStories();
    },
    removeComment(story, commentId) {
      this.$store.commit("removeComment", story.id, commentId);
      this.loadLimitedPhotoStories();
    },
  },
  // computed: {
  // },
  created() {
    this.loadPhotoStories();
    this.loadLimitedPhotoStories();
    this.loadUsers();
  },
};
</script>

<style>
</style>