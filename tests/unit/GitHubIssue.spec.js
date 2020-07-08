import { shallowMount } from '@vue/test-utils';
import GitHubIssue from '@/components/GitHubIssue.vue';

describe('Tests for component GitHubIssue.vue', () => {
  const mockValidName = 'facebook';
  const mockValidRepository = 'react';
  const mockValidIssueNumber = '19284';

  const mockInvalidName = 'nameInvalid';
  const mockInvalidRepository = 'repositoryInvalid';
  const mockInvalidIssueNumber = '19284';

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

  it('Ensure render alert if repository, name or issue is invalid', async () => {
    wrapper.vm.$route.params.name = mockInvalidName;
    wrapper.vm.$route.params.repo = mockInvalidRepository;
    wrapper.vm.$route.params.issue = mockInvalidIssueNumber;

    await wrapper.vm.getIssue();

    expect(wrapper.find('.alert').exists()).toBe(true);
  });
});
