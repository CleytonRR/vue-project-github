<template>
  <div class="container">
    <div v-if="loader.getIssue" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-if="!loader.getIssue && issue.number">
      <h1>Issue {{ issue.nubmer }}</h1>
      <h2>{{ issue.title }}</h2>
      <div>{{ issue.body }}</div>
      <a href="javascript:history.go(-1)" class="btn btn-primary">Voltar</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GitHubIssue',

  created() {
    this.getIssue();
  },

  data() {
    return {
      issue: {},
      loader: {
        getIssue: false,
      },
    };
  },

  methods: {
    async getIssue() {
      const { name, repo, issue } = this.$route.params;
      this.loader.getIssue = true;
      const url = `https://api.github.com/repos/${name}/${repo}/issues/${issue}`;
      const result = await axios.get(url);
      this.issue = result.data;
      this.loader.getIssue = false;
    },
  },
};
</script>
