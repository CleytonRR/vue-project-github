import { shallowMount } from '@vue/test-utils';
import GitHubIssue from '@/components/GitHubIssue.vue';

describe('Tests for component GitHubIssue.vue', () => {
  const mockValidName = 'facebook';
  const mockValidRepository = 'react';
  const mockValidIssueNumber = '19284';

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(GitHubIssue, {
      mocks: {
        $route: {
          params: {
            name: mockValidName,
            repo: mockValidRepository,
            issue: mockValidIssueNumber,
          },
        },
      },
    });
  });

  it('Ensure render for details of issue if repository and name was valid', async () => {
    await wrapper.vm.getIssue();
    expect(wrapper.find('.issue-detail').exists()).toBe(true);
  });
});
