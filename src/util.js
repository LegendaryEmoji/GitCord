const { get } = require("axios").default;

async function fetchData(thisData, { type = "repositoryData" } = {}) {}

async function fetchUserData(
  username,
  headers,
  repository,
  func = (response) => {
    return response;
  }
) {
  if (!username) return __err('Missing "username" Argument');
  const { data } = await get(
    `https://api.github.com/repos/${encodeURI(username)}/${encodeURI(
      repository
    )}/events`,
    { responseType: "json", headers }
  );

  return func(data);
}

async function update({
  username,
  events,
  headers,
  color,
  repository,
  github,
} = {}) {
  for (let repo of repository) {
    const data = await fetchUserData(username, headers, repo);
    const latestEvents = data.filter(
      (element) => !events[repo].includes(element.id)
    );
    if (!latestEvents.length) continue;

    for (let Element of latestEvents.reverse()) {
      try {
        github.emit(
          "newEvent",
          require(`./Events/${Element.type}`)(Element, { color })
        );
      } catch (err) {
        if (err.toString().includes("Cannot find module"))
          console.log({
            event: Element.type,
            message:
              "this event is ignored because its not supported for now, let us know if you want this event to be added.",
          });
      }
      events[repo].push(Element.id);
    }
  }
}

async function gitAll(username, headers) {
  if (!headers.Authorization) __err("Github token is required for this action");
  const { data } = await Axios.get(
    `https://api.github.com/users/${encodeURI(username)}/repos`,
    { responseType: "json", headers }
  );
  if (data.size > 50)
    __err(
      "Your github profile have more than 50 repositories which is why you can not use gitAll Feeds feauture."
    );

  return data.map((x) => x.name);
}

module.exports = { fetchUserData, checkWhatsNew, gitAll };
