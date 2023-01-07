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

describe('Ruby Tab: Events category blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));

        const code = dedent`
            when_flag_clicked do
              bounce_if_on_edge
            end

            when_key_pressed("space") do
              bounce_if_on_edge
            end

            when_key_pressed("any") do
              bounce_if_on_edge
              move(10)
            end

            when_key_pressed("a") do
            end

            when_clicked do
              bounce_if_on_edge
            end

            when_clicked do
              bounce_if_on_edge
              move(10)
            end

            when_backdrop_switches("backdrop1") do
              bounce_if_on_edge
            end

            when_backdrop_switches("backdrop1") do
              bounce_if_on_edge
              move(10)
            end

            when_greater_than("loudness", 10) do
            end

            when_greater_than("loudness", 10) do
              bounce_if_on_edge
            end

            when_greater_than("timer", x) do
              bounce_if_on_edge
              move(10)
            end

            when_receive("message1") do
            end

            when_receive("message1") do
              bounce_if_on_edge
            end

            when_receive("message1") do
              bounce_if_on_edge
              move(10)
            end

            broadcast("message1")
            broadcast(x)
            broadcast_and_wait("message1")
            broadcast_and_wait(x)
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });

    test('Ruby -> Code -> Ruby (backward compatibility) ', async () => {
        await loadUri(urlFor('/'));

        const oldCode = dedent`
            self.when(:flag_clicked) do
            end

            self.when(:key_pressed, "space") do
            end

            self.when(:key_pressed, "any") do
            end

            self.when(:key_pressed, "a") do
            end

            self.when(:clicked) do
            end

            self.when(:backdrop_switches, "backdrop1") do
            end

            self.when(:greater_than, "loudness", 10) do
            end

            self.when(:greater_than, "timer", 10) do
            end

            self.when(:receive, "message1") do
            end
        `;

        const newCode = dedent`
            when_flag_clicked do
            end

            when_key_pressed("space") do
            end

            when_key_pressed("any") do
            end

            when_key_pressed("a") do
            end

            when_clicked do
            end

            when_backdrop_switches("backdrop1") do
            end

            when_greater_than("loudness", 10) do
            end

            when_greater_than("timer", 10) do
            end

            when_receive("message1") do
            end
        `;

        await clickText('Ruby', '*[@role="tab"]');
        await fillInRubyProgram(oldCode);
        await clickText('Code', '*[@role="tab"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                '/*/span[text()="Edit"]'
        );
        await clickText('Generate Ruby from Code');
        await clickText('Ruby', '*[@role="tab"]');
        expect(await currentRubyProgram()).toEqual(`${newCode}\n`);
    });
});
