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

describe('Ruby Tab: Text to Speech extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    // not implemented Ruby to Code yet
    test.skip('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            text2speech_speak("hello")
            self.text2speech_voice = "ALTO"
            self.text2speech_voice = "TENOR"
            self.text2speech_voice = "SQUEAK"
            self.text2speech_voice = "GIANT"
            self.text2speech_voice = "KITTEN"
            self.text2speech_language = "en"
            self.text2speech_language = "ja"
            self.text2speech_language = "de"
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
