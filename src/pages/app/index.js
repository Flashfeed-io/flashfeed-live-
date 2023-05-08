import { $fetch } from "ohmyfetch";
import { createApp, reactive } from "petite-vue";

const store = reactive({
  stats: {}
});

const getStats = async () => {
  const response = await fetch(
    "https://live.api-server.io/run/v1/633d944f3148f1bac5f867c9",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + MemberStack.getToken()
      }
    }
  ).catch((error) => {
    throw new Error(error.message);
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};

const mounted = async () => {
  store.stats = await getStats();
  window.console.log("Mounted");
};

const app = createApp({
  // exposed to all expressions
  mounted,
  store
});

export { app };
