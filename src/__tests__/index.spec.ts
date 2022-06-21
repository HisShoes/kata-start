import { createArgsParser } from '..';

describe('createArgParser', () => {
  it('creates an args parser', () => {
    const argsParser = createArgsParser(
      {
        '-p': {
          key: 'port',
        }
      }
    );
    expect(typeof argsParser).toBe(("function"));
  });
});

describe('argsParser', () => {
  let argsParser;

  beforeAll(() => {
    argsParser = createArgsParser(
      {
        '-p': {
          key: 'port',
        }
      }
    );
  })

  it('parses port number arg', () => {
    expect(argsParser(['-p', '8080'])).toEqual({
      port: 8080,
    });
  });
});
