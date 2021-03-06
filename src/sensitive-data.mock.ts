import qs, { ParsedQs } from 'qs';

type KeyMockType = {
  json: ParsedQs;
  queryString: string;
  invalidString: string;
};

export const getSensitiveDataMock = (): KeyMockType => ({
  json: {
    login: 'JOHN',
    password: 'JOHN@THE@AMAZING',
    user: {
      name: 'John Doe',
      details: {
        age: '35',
        height: '1.83',
        group_data: {
          sensitive_data: 'hide me please',
          other_data: 'keep me here',
          other_group: {
            other_sensitive_data: 'hide me please',
            other_data: 'keep me here',
            other_group_again: {
              other_sensitive_information: 'hide me please',
              other_information: 'keep me here',
            },
          },
        },
      },
      addresses: [
        {
          street: 'hide me please',
          district: 'keep me here',
        },
        {
          street: 'another hide me please',
          district: 'another keep me here',
        },
      ],
    },
  },
  queryString: qs.stringify({
    login: 'JOHN',
    password: 'JOHN@THE@AMAZING',
    user: {
      name: 'John Doe',
      details: {
        age: '35',
        height: '1.83',
        group_data: {
          sensitive_data: 'hide me please',
          other_data: 'keep me here',
          other_group: {
            other_sensitive_data: 'hide me please',
            other_data: 'keep me here',
            other_group_again: {
              other_sensitive_information: 'hide me please',
              other_information: 'keep me here',
            },
          },
        },
      },
      addresses: [
        {
          street: 'hide me please',
          district: 'keep me here',
        },
        {
          street: 'another hide me please',
          district: 'another keep me here',
        },
      ],
    },
  }),
  invalidString: 'Lorem ipsum feugiat aenean, vivamus',
});
