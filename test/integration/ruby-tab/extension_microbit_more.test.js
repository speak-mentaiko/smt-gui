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

describe('Ruby Tab: micro:bit MORE v0.4.3 extension blocks', () => {
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
            self.when(:mbit_more_button_pressed, "A") do
            end

            self.when(:mbit_more_button_pressed, "B") do
            end

            self.when(:mbit_more_button_pressed, "any") do
            end

            mbit_more.button_pressed?("A")

            self.when(:mbit_more_gesture, "moved") do
            end

            self.when(:mbit_more_gesture, "shaken") do
            end

            self.when(:mbit_more_gesture, "jumped") do
              mbit_more.display(
                ".1.1.",
                "1.1.1",
                "1...1",
                ".1.1.",
                "..1.."
              )
              mbit_more.display_text("Hello!")
              mbit_more.clear_display
            end

            self.when(:mbit_more_tilted, "any") do
            end

            self.when(:mbit_more_tilted, "front") do
            end

            self.when(:mbit_more_tilted, "back") do
            end

            self.when(:mbit_more_tilted, "left") do
            end

            self.when(:mbit_more_tilted, "right") do
            end

            mbit_more.tilted?("any")

            mbit_more.tilt_angle("front")

            self.when(:mbit_more_pin_connected, 0) do
            end

            self.when(:mbit_more_pin_connected, 1) do
            end

            self.when(:mbit_more_pin_connected, 2) do
            end

            self.when(:mbit_more_pin_connected, 8) do
            end

            self.when(:mbit_more_pin_connected, 13) do
            end

            self.when(:mbit_more_pin_connected, 14) do
            end

            self.when(:mbit_more_pin_connected, 15) do
            end

            self.when(:mbit_more_pin_connected, 16) do
            end

            mbit_more.pin_connected?(0)

            mbit_more.light_level

            mbit_more.temperature

            mbit_more.compass_heading

            mbit_more.pitch

            mbit_more.roll

            mbit_more.get_magnetic_force(null)

            mbit_more.get_acceleration("x")

            mbit_more.get_acceleration("y")

            mbit_more.get_acceleration("z")

            mbit_more.get_acceleration("absolute")

            mbit_more.get_analog_value(0)

            mbit_more.get_analog_value(1)

            mbit_more.get_analog_value(2)

            mbit_more.get_digital_value(0)

            mbit_more.set_pin_mode(0, "pullUp")
            mbit_more.set_pin_mode(1, "pullNone")
            mbit_more.set_pin_mode(2, "pullDown")
            mbit_more.set_output(8, 0)
            mbit_more.set_output(13, 1)
            mbit_more.set_pwm(14, 0)
            mbit_more.set_servo(15, 0, 2000, 1500)
            mbit_more.set_pin_event_type(0, 0)
            mbit_more.set_pin_event_type(1, 2)
            mbit_more.set_pin_event_type(2, 1)

            self.when(:mbit_more_pin_event, 0, 5) do
            end

            self.when(:mbit_more_pin_event, 1, 4) do
            end

            self.when(:mbit_more_pin_event, 2, 3) do
            end

            self.when(:mbit_more_pin_event, 8, 2) do
            end

            mbit_more.get_pin_event_timestamp(0, 5)

            mbit_more.get_shared_data("0")

            mbit_more.set_shared_data("0", 0)

            mbit_more.get_shared_data("1")

            mbit_more.get_shared_data("2")

            mbit_more.get_shared_data("3")
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
