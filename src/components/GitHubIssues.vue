<template>
  <div class="container">
    <h1>Vue.js + Github</h1>
    <p class="lead">Página que lista issues de um repositório do Github, usando Vue.js.</p>

    <div class="row">
      <div class="col">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="github username"
          />
        </div>
      </div>

      <div class="col">
        <div class="form-group">
          <input
            v-model="repository"
            type="text"
            class="form-control"
            placeholder="github repositório"
          />
        </div>
      </div>

      <div class="col-3">
        <div class="form-group">
          <button @click.prevent.stop="getIssues()" class="btn btn-success">GO</button>
          <button @click.prevent.stop="reset()" class="btn btn-danger">LIMPAR</button>
        </div>
      </div>
    </div>

    <br />
    <hr />
    <br />

    <template v-if="selectedIssue.id">
      <h2>{{ selectedIssue.title }}</h2>
      <div>{{ selectedIssue.body }}</div>
      <a href="" class="btn btn-primary" @click.prevent.stop="clearIssue()">Voltar</a>
    </template>

    <table v-if="!selectedIssue.id" class="table table-sm table-bordered">
      <thead>
        <tr>
          <th width="100">Número</th>
          <th>Título</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loader.getIssues">
          <td class="text-center" colspan="2">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>

        <fragment v-if="!!issues.length && !loader.getIssues">
          <tr v-for="issue in issues" :key="issue.number">
            <td>
              <a @click.prevent.stop="getIssue(issue)" href="">{{ issue.number }}</a>
              <div v-if="issue.is_loading" class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </td>
            <td>{{ issue.title }}</td>
          </tr>
        </fragment>

        <tr v-if="!!!issues.length && !loader.getIssues">
          <td class="text-center" colspan="2">Nenhuma issue encontrada!</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Fragment } from 'vue-fragment';
import axios from 'axios';

export default {
  name: 'GitHubIssues',
  components: { Fragment },

  data() {
    return {
      username: '',
      repository: '',
      issues: [],
      selectedIssue: {},
      loader: {
        getIssues: false,
        getIssue: false,
      },
    };
  },

  methods: {
    reset() {
      this.username = '';
      this.repository = '';
    },

    async getIssues() {
      if (this.username && this.repository) {
        this.loader.getIssues = true;
        const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
        const result = await axios.get(url);
        this.issues = result.data;
        this.loader.getIssues = false;
      }
    },

    async getIssue(issue) {
      if (this.username && this.repository) {
        this.$set(issue, 'is_loading', true);
        const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues/${issue.number}`;
        const result = await axios.get(url);
        this.selectedIssue = result.data;
        this.$set(issue, 'is_loading', false);
      }
    },

    clearIssue() {
      this.selectedIssue = {};
    },
  },
};
</script>
