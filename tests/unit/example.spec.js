import { shallowMount } from '@vue/test-utils';
import GitHubIssues from '@/components/GitHubIssues.vue';

describe('Tests for component GitHubIssues.vue', () => {
  const mockFailName = 'failName';
  const mockFailRepository = 'FailRepository';
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(GitHubIssues);
  });

  it('Render alert error if name or repository not exists', async () => {
    wrapper.setData({ username: mockFailName, repository: mockFailRepository });
    await wrapper.vm.getIssues();
    expect(wrapper.find('.alert').exists()).toBe(true);
  });
});
