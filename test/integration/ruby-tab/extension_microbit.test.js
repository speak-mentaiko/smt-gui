import dedent from 'dedent';
import SeleniumHelper from '../../helpers/selenium-helper';
import RubyHelper from '../../helpers/ruby-helper';

const seleniumHelper = new SeleniumHelper();
const {
    clickText,
    clickXpath,
    getDriver,
    loadUri,
    urlFor
} = seleniumHelper;

const rubyHelper = new RubyHelper(seleniumHelper);
const {
    fillInRubyProgram,
    currentRubyProgram,
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

        const ruby = dedent`
            microbit.when_button_pressed("A") do
            end

            microbit.when_button_pressed("B") do
            end

            microbit.when_button_pressed("any") do
            end

            microbit.button_pressed?("A")

            microbit.when("moved") do
            end

            microbit.when("shaken") do
            end

            microbit.when("jumped") do
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

            microbit.when_tilted("any") do
            end

            microbit.when_tilted("front") do
            end

            microbit.when_tilted("back") do
            end

            microbit.when_tilted("left") do
            end

            microbit.when_tilted("right") do
            end

            microbit.tilted?("any")

            microbit.tilt_angle("front")

            microbit.when_pin_connected(0) do
            end

            microbit.when_pin_connected(1) do
            end

            microbit.when_pin_connected(2) do
            end
        `;
        await expectInterconvertBetweenCodeAndRuby(ruby);
    });

    test('Ruby -> Code -> Ruby (backward compatibility) ', async () => {
        await loadUri(urlFor('/'));

        const oldRuby = dedent`
            self.when(:microbit_button_pressed, "A") do
            end

            self.when(:microbit_button_pressed, "B") do
            end

            self.when(:microbit_button_pressed, "any") do
            end

            self.when(:microbit_gesture, "moved") do
            end

            self.when(:microbit_gesture, "shaken") do
            end

            self.when(:microbit_gesture, "jumped") do
            end

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

            self.when(:microbit_pin_connected, 0) do
            end

            self.when(:microbit_pin_connected, 1) do
            end

            self.when(:microbit_pin_connected, 2) do
            end
        `;

        const newRuby = dedent`
            microbit.when_button_pressed("A") do
            end

            microbit.when_button_pressed("B") do
            end

            microbit.when_button_pressed("any") do
            end

            microbit.when("moved") do
            end

            microbit.when("shaken") do
            end

            microbit.when("jumped") do
            end

            microbit.when_tilted("any") do
            end

            microbit.when_tilted("front") do
            end

            microbit.when_tilted("back") do
            end

            microbit.when_tilted("left") do
            end

            microbit.when_tilted("right") do
            end

            microbit.when_pin_connected(0) do
            end

            microbit.when_pin_connected(1) do
            end

            microbit.when_pin_connected(2) do
            end
        `;

        await clickText('Ruby', '*[@role="tab"]');
        await fillInRubyProgram(oldRuby);
        await clickText('Code', '*[@role="tab"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                '/*/span[text()="Edit"]'
        );
        await clickText('Generate Ruby from Code');
        await clickText('Ruby', '*[@role="tab"]');
        expect(await currentRubyProgram()).toEqual(`${newRuby}\n`);
    });
});
