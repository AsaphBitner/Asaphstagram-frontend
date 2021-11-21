<template>
  <section class="story-how-long-ago">
    {{ timeDifference(Date.now(), story.createdAt).toUpperCase() }}
  </section>
</template>

<script>
export default {
  props: {
    story: Object,
  },

  data() {
    return {};
  },
  methods: {
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
  },

  async created() {
    // await this.getLoggedInUser();
  },
};
</script>
