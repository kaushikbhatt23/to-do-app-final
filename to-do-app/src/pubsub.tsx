type Callback = (topic: string, args: any) => void;

interface PubSub {
  subscribe: (topic: string, func: Callback) => string;
  publish: (topic: string, args: any) => boolean;
  unsubscribe: (token: string) => boolean;
}

const pubsub: PubSub = (function (q) {
  const topics: Record<string, { token: string; func: Callback }[]> = {};
  let subUid = -1;

  q.subscribe = function (topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    const token = (++subUid).toString();
    topics[topic].push({
      token,
      func,
    });
    return token;
  };

  q.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }
    setTimeout(function () {
      const subscribers = topics[topic];
      let len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  };

  q.unsubscribe = function (token) {
    for (const m in topics) {
      if (topics[m]) {
        for (let i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return true;
          }
        }
      }
    }
    return false;
  };

  return q;
})({} as PubSub);

export default pubsub;
