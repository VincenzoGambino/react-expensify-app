import { login, logout} from '../../actions/auth';


test('should return login action', () => {
  const action = login('abc');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc'
  });
});

test('should return logout action', () => {
  const action = logout();
  expect(action).toEqual({type: 'LOGOUT'});
});