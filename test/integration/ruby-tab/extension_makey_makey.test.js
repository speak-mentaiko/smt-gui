import dedent from 'dedent';
import SeleniumHelper from '../../helpers/selenium-helper';
import RubyHelper from '../../helpers/ruby-helper';

const seleniumHelper = new SeleniumHelper();
const {
    getDriver,
    loadUri,
    urlFor
} = seleniumHelper;

const rubyHelper = new RubyHelper(seleniumHelper);
const {
    expectInterconvertBetweenCodeAndRuby
} = rubyHelper;

let driver;

describe('Ruby Tab: Makey Makey extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            self.when(:makey_key_pressed, "SPACE") do
            end

            self.when(:makey_pressed_in_oder, "LEFT UP RIGHT") do
            end

            self.when(:makey_pressed_in_oder, "RIGHT UP LEFT") do
            end

            self.when(:makey_key_pressed, "w") do
            end
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
