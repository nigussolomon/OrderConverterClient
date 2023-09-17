const apiLink = "http://localhost:3000";

export const getClients = () => {
  fetch(apiLink + "/clients")
    .then((res) => res.json())
    .then((data) => {
      return data["data"];
    });
};
