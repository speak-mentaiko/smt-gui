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

describe('Ruby Tab: Events category blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            when_flag_clicked do
            end

            self.when(:key_pressed, "space") do
            end

            self.when(:clicked) do
            end

            self.when(:key_pressed, "any") do
            end

            self.when(:key_pressed, "a") do
            end

            self.when(:backdrop_switches, "backdrop1") do
            end

            self.when(:greater_than, "loudness", 10) do
            end

            self.when(:greater_than, "timer", 10) do
            end

            self.when(:receive, "message1") do
            end

            broadcast("message1")
            broadcast_and_wait("message1")
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
