import { history } from '../App';
const HN_URL = 'https://hacker-news.firebaseio.com/v0';

const makeFetch = async (url) => {
  try {
    const request = await fetch(`${HN_URL}${url}`);
    return request.json();
  } catch (e) {
    console.error("Error has occured: ", e)
    history.push('/not-found')
  }
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
  async fetchNewStories(storyIds, count) {
    const storyIdList = storyIds.slice(count, count + 50)
    const actions = storyIdList.map(this.fetchSingleStory);
    const articles = await Promise.all(actions)
    return articles
  }
}

export default Api;