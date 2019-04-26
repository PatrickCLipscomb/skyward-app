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
    const lower = !pagination ? pagination : pagination * 25;
    const upper = !pagination ? 25 : (pagination + 1) * 25; 
    const actions = storyIds.slice(lower, upper).map(this.fetchSingleStory);
    const articles = await Promise.all(actions)
    return articles
  }
}

export default Api;