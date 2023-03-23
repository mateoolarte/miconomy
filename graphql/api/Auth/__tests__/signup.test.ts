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

describe('signup', () => {
  it('should signup a new user', async () => {
    const signupUser = await ctx.client.request(signupMutation, {
      email: 'test1@miconomy.co',
      password: '12345678',
    });

    expect(signupUser).toMatchSnapshot();

    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        currencyCode: true,
      },
    });

    expect(users).toMatchSnapshot();
  });
});
