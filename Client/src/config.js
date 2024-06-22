const configs = {
  development: {
    SERVER_URI: "http://localhost:4000",
    SOCKET_URI: "ws://localhost:8000",
  },
  production: {
    SERVER_URI: "https://socialify-1-qixe.onrender.com",
  },
};

const getConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return configs.development;
  } else {
    return configs.production;
  }
};

export default getConfig;
