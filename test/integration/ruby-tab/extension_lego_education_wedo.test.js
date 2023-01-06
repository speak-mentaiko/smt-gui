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

describe('Ruby Tab: LEGO Education WeDo 2.0 extension blocks', () => {
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
            wedo2_turn_motor_on_for("motor", 1)
            wedo2_turn_motor_on_for("motor A", 1)
            wedo2_turn_motor_on_for("motor B", 1)
            wedo2_turn_motor_on_for("all motors", 1)
            wedo2_trun_motor_on("motor")
            wedo2_trun_motor_off("motor")
            wedo2_set_motor_power("motor", 100)
            wedo2_set_motor_direction("motor", "this way")
            wedo2_set_motor_direction("motor", "that way")
            wedo2_set_motor_direction("motor", "reverse")
            wedo2_set_light_color(50)

            self.when(:wedo2_distance, "<", 50) do
            end

            self.when(:wedo2_distance, ">", 50) do
            end

            self.when(:wedo2_tilted, "any") do
            end

            self.when(:wedo2_tilted, "up") do
            end

            self.when(:wedo2_tilted, "down") do
            end

            self.when(:wedo2_tilted, "left") do
            end

            self.when(:wedo2_tilted, "right") do
            end

            wedo2_distance

            wedo2_tilted("any")

            wedo2_tilt_angle("up")
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
