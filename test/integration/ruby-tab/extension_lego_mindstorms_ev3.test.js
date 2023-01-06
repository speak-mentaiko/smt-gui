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

describe('Ruby Tab: LEGO MINDSTORMS EV3 extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            ev3_motor_turn_this_way_for("A", 1)
            ev3_motor_turn_this_way_for("B", 1)
            ev3_motor_turn_this_way_for("C", 1)
            ev3_motor_turn_this_way_for("D", 1)
            ev3_motor_turn_that_way_for("A", 1)
            ev3_motor_set_power("A", 100)

            ev3_motor_position("A")

            self.when(:ev3_button_pressed, "1") do
            end

            self.when(:ev3_button_pressed, "2") do
            end

            self.when(:ev3_button_pressed, "3") do
            end

            self.when(:ev3_button_pressed, "4") do
            end

            self.when(:ev3_distance_gt, 5) do
            end

            self.when(:ev3_brightness_gt, 50) do
            end

            ev3_button_pressed?("1")

            ev3_distance

            ev3_brightness

            ev3_beep_note(60, 0.5)
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
