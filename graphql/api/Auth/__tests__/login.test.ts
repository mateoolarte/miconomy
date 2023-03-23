import { createTestContext } from '../../../utils/testHelpers';

const ctx = createTestContext();

const signupMutation = `
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        id
        email
        currencyCode
      }
    }
  }
`;

const loginMutation = `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        currencyCode
      }
    }
  }
`;

describe('login', () => {
  it('should give access to a existing user', async () => {
    const signupUser = await ctx.client.request(signupMutation, {
      email: 'test2@miconomy.co',
      password: '12345678',
    });

    expect(signupUser).toMatchSnapshot();

    const loginUser = await ctx.client.request(loginMutation, {
      email: 'test2@miconomy.co',
      password: '12345678',
    });

    expect(loginUser).toMatchSnapshot();
  });
});
