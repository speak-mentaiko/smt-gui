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

describe('Ruby Tab: Go Direct Force & Acceleration extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            self.when(:gdx_for_gesture, "shaken") do
            end

            self.when(:gdx_for_gesture, "started falling") do
            end

            self.when(:gdx_for_gesture, "turned face up") do
            end

            self.when(:gdx_for_gesture, "turned face down") do
            end

            self.when(:gdx_force_sensor, "pushed") do
            end

            self.when(:gdx_force_sensor, "pulled") do
            end

            gdx_for_force

            self.when(:gdx_for_tilted, "any") do
            end

            self.when(:gdx_for_tilted, "front") do
            end

            self.when(:gdx_for_tilted, "back") do
            end

            self.when(:gdx_for_tilted, "left") do
            end

            self.when(:gdx_for_tilted, "right") do
            end

            gdx_for_tilted?("any")

            gdx_for_tilt_angle("front")

            gdx_for_falling?

            gdx_for_spin_speed("z")

            gdx_for_spin_speed("x")

            gdx_for_spin_speed("y")

            gdx_for_acceleration("x")
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
