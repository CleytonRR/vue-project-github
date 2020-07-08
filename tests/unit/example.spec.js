import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import GitHubIssues from '@/components/GitHubIssues.vue';

describe('Tests for component GitHubIssues.vue', () => {
  const mockFailName = 'failName';
  const mockFailRepository = 'FailRepository';
  const mockValidName = 'facebook';
  const mockValidRepository = 'react';
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(GitHubIssues, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  it('Render alert error if name or repository not exists', async () => {
    wrapper.setData({ username: mockFailName, repository: mockFailRepository });
    await wrapper.vm.getIssues();
    expect(wrapper.find('.alert').exists()).toBe(true);
  });

  it('Render table with title and issue number when name and repository exists', async () => {
    wrapper.setData({ username: mockValidName, repository: mockValidRepository });
    await wrapper.vm.getIssues();
    expect(wrapper.find('.title-issue').exists()).toBe(true);
  });
});
