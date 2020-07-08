import { shallowMount } from '@vue/test-utils';
import GitHubIssues from '@/components/GitHubIssues.vue';

describe('Tests for component GitHubIssues.vue', () => {
  it('Render alert error if name or repository not exists', async () => {
    const name = 'failName';
    const repository = 'FailRepository';
    const wrapper = shallowMount(GitHubIssues);
    wrapper.setData({ username: name, repository });
    await wrapper.vm.getIssues();
    expect(wrapper.find('.alert').exists()).toBe(true);
  });
});
