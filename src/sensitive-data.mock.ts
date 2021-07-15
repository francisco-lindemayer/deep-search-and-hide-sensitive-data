import { ParsedQs } from "qs";

export const getSensitiveDataMock = (): ParsedQs => ({
  login: "FULANO",
  password: "2123123",
  senha: "sdfgasdg",
  user: {
    name: "fulano",
    details: {
      age: "35",
      height: "1.83",
      details: {
        age: "35",
        height: "1.83",
        details: {
          age: "35",
          height: "1.83",
          details: {
            password: "asdfasdfasdf",
            access_token: "sdfasdfasddfasfa",
          },
        },
      },
    },
  },
});

/*
qs.stringify({
  grant_type: 'password',
  client_id: '12312312313',
  client_secret: '12312312313',
  username: 'fulano',
  password: 'sdlakfjçaslkfja',
});
*/
