const HN_URL = 'https://hacker-news.firebaseio.com/v0';

const makeFetch = async (url) => {
  const request = await fetch(`${HN_URL}${url}`);
  return request.json();
}

const Api = {
  fetchNewStoryIDs() {
    const url = '/newstories.json';
    return makeFetch(url);
  },
  fetchSingleStory(id) {
    const url = `/item/${id}.json`;
    return makeFetch(url);
  },
  async fetchNewStories(storyIds, pagination) {
    const lower = pagination === 1 ? 0 : pagination / 5 * 100;
    const upper = pagination === 1 ? 100 : (pagination / 5 + 1) * 100;
    const storyIdList = storyIds.slice(lower, upper)
    console.log('from fetchNewStories', lower, upper, pagination, storyIdList) 
    const actions = storyIdList.map(this.fetchSingleStory);
    const articles = await Promise.all(actions)
    return articles
  }
}

export default Api;