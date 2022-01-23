const { fetchData, update } = require("./util.js");
const EventEmitter = require("events");

const defaultOptions = {
  defaultTime: 60000,
  requestOptions: {
    headers: {
      "accept-language": "en-US",
      "accept-encoding": "gzip",
    },
    responseType: "json",
    timeout: 10000,
  },
};

class GitCord extends EventEmitter {
  constructor(
    username,
    {
      auth,
      intervalTime = defaultOptions.defaultTime,
      customRequestOptions = defaultOptions.requestOptions,
      all = false,
      force = false,
      collection = [],
    } = {}
  ) {
    if (!username) throw new Error("You need to provide your github username!");
    if (!collection && !all)
      throw new Error(
        "'all' option needs to be enabled or you need to add repositories for feeds!"
      );
    if (typeof repositories == "string") repositories = [repositories];
    if (auth)
      defaultOptions.requestOptions.headers.Authorization = `token ${token}`;

    super();

    Object.assign(this, {
      username,
      intervalTime,
      all,
      collection,
      force,
      customRequestOptions: Object.assign(
        defaultOptions.requestOptions,
        customRequestOptions
      ),
      events: {},
    });
  }
  async initialize() {
    if (this.all)
      this.collection = await fetchData(this, {
        type: "getAllRepositories",
      });

    for (let repository of this.collection)
      fetchData(this, {
        type: "repositoryData",
        name: repository,
        callback: (eventsData) =>
          (this.events[repository] = eventsData.map((event) => event.id)),
      });

    const intervalID = setInterval(() => {
      if (!this.repositories.length) return clearInterval(intervalID);
      update(this);
    }, this.intervalTime);
  }
  subscribe(mainRepository) {
    const repositories =
      typeof mainRepository === "string" ? [mainRepository] : mainRepository;

    for (let repository of repositories) {
      fetchData(this, {
        type: "repositoryData",
        name: repository,
        callback: (eventsData) =>
          (this.events[repository] = eventsData.map((event) => event.id)),
      });
      if (!this.repositories.includes(repository))
        this.repositories.push(repository);
    }

    return true;
  }
  unsubscribe(mainRepository) {
    const repositories = (
      typeof mainRepository === "string" ? [mainRepository] : mainRepository
    ).filter((repo) => this.repositories.includes(repo));

    for (let repository of repositories) {
      delete this.events[repository];
      this.repositories.splice(this.repositories.indexOf(repository), 1);
    }

    return true;
  }
}

module.exports = GitCord;
