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

describe('Ruby Tab: micro:bit extension blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            self.when(:microbit_button_pressed, "A") do
            end

            self.when(:microbit_button_pressed, "B") do
            end

            self.when(:microbit_button_pressed, "any") do
            end

            microbit.button_pressed?("A")

            self.when(:microbit_gesture, "moved") do
            end

            self.when(:microbit_gesture, "shaken") do
            end

            self.when(:microbit_gesture, "jumped") do
            end

            microbit.display(
              ".1.1.",
              "1.1.1",
              "1...1",
              ".1.1.",
              "..1.."
            )
            microbit.display_text("Hello!")
            microbit.clear_display

            self.when(:microbit_tilted, "any") do
            end

            self.when(:microbit_tilted, "front") do
            end

            self.when(:microbit_tilted, "back") do
            end

            self.when(:microbit_tilted, "left") do
            end

            self.when(:microbit_tilted, "right") do
            end

            microbit.tilted?("any")

            microbit.tilt_angle("front")

            self.when(:microbit_pin_connected, 0) do
            end

            self.when(:microbit_pin_connected, 1) do
            end

            self.when(:microbit_pin_connected, 2) do
            end
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
