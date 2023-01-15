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

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            microbit_more.when_button_pressed("A") do
            end

            microbit_more.when_button_pressed("B") do
            end

            microbit_more.when_button_pressed("any") do
            end

            microbit_more.when_button_pressed(x) do
            end

            microbit_more.button_pressed?("A")

            microbit_more.button_pressed?(x)

            microbit_more.when("moved") do
            end

            microbit_more.when("shaken") do
            end

            microbit_more.when("jumped") do
              microbit_more.display(
                ".1.1.",
                "1.1.1",
                "1...1",
                ".1.1.",
                "..1.."
              )
              microbit_more.display(x)
              microbit_more.display_text("Hello!")
              microbit_more.display_text(x)
              microbit_more.clear_display
            end

            microbit_more.when(x) do
            end

            microbit_more.when_tilted("any") do
            end

            microbit_more.when_tilted("front") do
            end

            microbit_more.when_tilted("back") do
            end

            microbit_more.when_tilted("left") do
            end

            microbit_more.when_tilted("right") do
            end

            microbit_more.when_tilted(x) do
            end

            microbit_more.tilted?("any")

            microbit_more.tilted?(x)

            microbit_more.tilt_angle("front")

            microbit_more.tilt_angle(x)

            microbit_more.when_pin_connected(0) do
            end

            microbit_more.when_pin_connected(1) do
            end

            microbit_more.when_pin_connected(2) do
            end

            microbit_more.when_pin_connected(8) do
            end

            microbit_more.when_pin_connected(13) do
            end

            microbit_more.when_pin_connected(14) do
            end

            microbit_more.when_pin_connected(15) do
            end

            microbit_more.when_pin_connected(16) do
            end

            microbit_more.when_pin_connected(x) do
            end

            microbit_more.pin_connected?(0)

            microbit_more.pin_connected?(x)

            microbit_more.light_intensity

            microbit_more.temperature

            microbit_more.angle_with_the_north

            microbit_more.pitch

            microbit_more.roll

            microbit_more.magnetic_force

            microbit_more.acceleration("x")

            microbit_more.acceleration("y")

            microbit_more.acceleration("z")

            microbit_more.acceleration("absolute")

            microbit_more.acceleration(x)

            microbit_more.analog_value_of_pin(0)

            microbit_more.analog_value_of_pin(1)

            microbit_more.analog_value_of_pin(2)

            microbit_more.analog_value_of_pin(x)

            microbit_more.digital_value_of_pin(0)

            microbit_more.digital_value_of_pin(8)

            microbit_more.digital_value_of_pin(13)

            microbit_more.digital_value_of_pin(14)

            microbit_more.digital_value_of_pin(15)

            microbit_more.digital_value_of_pin(16)

            microbit_more.digital_value_of_pin(x)

            microbit_more.set_pin_to_input_pull(0, "up")
            microbit_more.set_pin_to_input_pull(1, "none")
            microbit_more.set_pin_to_input_pull(2, "down")
            microbit_more.set_pin_to_input_pull(x, "down")
            microbit_more.set_digital(0, 0)
            microbit_more.set_digital(16, 1)
            microbit_more.set_digital(x, 1)
            microbit_more.set_pwm(0, 0)
            microbit_more.set_pwm(16, x)
            microbit_more.set_pwm(x, y)
            microbit_more.set_servo(0, 0)
            microbit_more.set_servo(16, x)
            microbit_more.set_servo(x, y)
            microbit_more.catch_event_on("none", 0)
            microbit_more.catch_event_on("pulse", 16)
            microbit_more.catch_event_on("edge", x)

            microbit_more.when_catch_at_pin("low pulse", 0) do
            end

            microbit_more.when_catch_at_pin("high pulse", 16) do
            end

            microbit_more.when_catch_at_pin("fall", x) do
            end

            microbit_more.when_catch_at_pin("rise", y) do
            end

            microbit_more.timestamp_of("low pulse", 0)

            microbit_more.timestamp_of("rise", 16)

            microbit_more.timestamp_of("rise", x)

            microbit_more.shared_data[0]

            microbit_more.shared_data[1]

            microbit_more.shared_data[2]

            microbit_more.shared_data[3]

            microbit_more.shared_data[x]

            microbit_more.shared_data[0] = 0
            microbit_more.shared_data[3] = x

            microbit_more.when_microbit("connected") do
            end

            microbit_more.when_microbit("disconnected") do
            end
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
