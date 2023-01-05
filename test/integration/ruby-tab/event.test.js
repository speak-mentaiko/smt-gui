import path from 'path';
import dedent from 'dedent';
import SeleniumHelper from '../../helpers/selenium-helper';
import {
    setRubyCode,
    getRubyCode
} from '../../helpers/ruby-helper';

const {
    clickText,
    clickXpath,
    getDriver,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../../build/index.html');

let driver;

describe('Ruby Tab: event', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(uri);

        await clickText('Ruby', '*[@role="tab"]');
        const code = dedent`
            self.when(:flag_clicked) do
            end

            self.when(:key_pressed, "space") do
            end

            self.when(:clicked) do
            end

            self.when(:key_pressed, "any") do
            end

            self.when(:key_pressed, "a") do
            end

            self.when(:backdrop_switches, "backdrop1") do
            end

            self.when(:greater_than, "loudness", 10) do
            end

            self.when(:greater_than, "timer", 10) do
            end

            self.when(:receive, "message1") do
            end

            broadcast("message1")
            broadcast_and_wait("message1")
        `;
        await setRubyCode(driver, code);

        await clickText('Code', '*[@role="tab"]');

        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                '/*/span[text()="Edit"]'
        );
        await clickText('Generate Ruby from Code');

        await clickText('Ruby', '*[@role="tab"]');

        expect(await getRubyCode(driver)).toEqual(`${code}\n`);
    });
});
