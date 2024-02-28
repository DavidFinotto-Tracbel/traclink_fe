import axios from "axios";

export default class IAService {
  // Enviar o prompt do usuario para a api do django
  sendRequest = async (data) => {
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}api/usr_request/`,
      headers: {
        "Content-type": "application/json",
      },
      data: JSON.stringify(data),
    };

    return (await axios(config)).data;
  };
}
