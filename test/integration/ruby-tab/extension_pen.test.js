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

describe('Ruby Tab: Pen extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            pen_clear
            pen_stamp
            pen_down
            pen_up
            self.pen_color = "#c11318"
            self.pen_color += 10
            self.pen_saturation += 10
            self.pen_brightness += 10
            self.pen_transparency += 10
            self.pen_color = 50
            self.pen_size += 1
            self.pen_size = 1
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
