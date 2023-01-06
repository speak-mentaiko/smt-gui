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

describe('Ruby Tab: Video Sensing extension blocks', () => {
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
            self.when(:video_motion_greater_than, 10) do
            end

            video_motion

            video_turn("on")
            video_turn("off")
            video_turn("on-flipped")
            self.video_transparency = 50

            video_direction

            stage.video_motion

            stage.video_direction
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
