<template>
  <div class="container">
    <h1>Vue.js + Github</h1>
    <p class="lead">Página que lista issues de um repositório do Github, usando Vue.js.</p>

    <div v-if="response.status === 'error'" class="alert alert-danger">
      {{ response.message }}
    </div>
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

    <table class="table table-sm table-bordered">
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

        <fragment v-if="showIssues">
          <tr class="title-issue" v-for="issue in issues" :key="issue.number">
            <td>
              <router-link
                :to="{
                  name: 'GitHubIssue',
                  params: { name: username, repo: repository, issue: issue.number },
                }"
                >{{ issue.number }}</router-link
              >
            </td>
            <td>{{ issue.title }}</td>
          </tr>
        </fragment>

        <tr v-if="noIssues">
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
  created() {
    this.getLocalData();
  },

  data() {
    return {
      username: '',
      repository: '',
      issues: [],
      response: {
        status: '',
        message: '',
      },
      loader: {
        getIssues: false,
      },
    };
  },

  computed: {
    showIssues() {
      return !!this.issues.length && !this.loader.getIssues;
    },

    noIssues() {
      return !this.issues.length && !this.loader.getIssues;
    },
  },

  methods: {
    reset() {
      this.username = '';
      this.repository = '';
      localStorage.removeItem('gitHubIssues');
      this.issues = [];
    },

    resetResponse() {
      this.response.status = '';
      this.response.message = '';
    },

    async getIssues() {
      this.resetResponse();
      if (this.username && this.repository) {
        localStorage.setItem(
          'gitHubIssues',
          JSON.stringify({ username: this.username, repository: this.repository }),
        );
        this.loader.getIssues = true;
        try {
          const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
          const result = await axios.get(url);
          this.issues = result.data;
        } catch (error) {
          this.issues = [];
          this.response.status = 'error';
          this.response.message = 'Reposítorio não existe';
        }
        this.loader.getIssues = false;
      }
    },

    getLocalData() {
      const localData = JSON.parse(localStorage.getItem('gitHubIssues'));
      if (localData && localData.username && localData.repository) {
        this.username = localData.username;
        this.repository = localData.repository;
        this.getIssues();
      }
    },
  },
};
</script>
