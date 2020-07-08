<template>
  <div class="container">
    <div v-if="loader.getIssue" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-if="error" class="alert alert-danger">
      <p>Erro ao buscar os detalhes</p>
    </div>

    <div class="issue-detail" v-if="!loader.getIssue && issue.number">
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
      error: false,
    };
  },

  methods: {
    async getIssue() {
      this.loader.getIssue = true;
      try {
        const { name, repo, issue } = this.$route.params;
        const url = `https://api.github.com/repos/${name}/${repo}/issues/${issue}`;
        const result = await axios.get(url);
        this.issue = result.data;
      } catch (error) {
        this.error = true;
      }

      this.loader.getIssue = false;
    },
  },
};
</script>
