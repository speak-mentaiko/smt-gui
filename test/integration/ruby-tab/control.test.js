import dedent from 'dedent';
import SeleniumHelper from '../../helpers/selenium-helper';
import RubyHelper from '../../helpers/ruby-helper';

const seleniumHelper = new SeleniumHelper();
const {
    clickText,
    clickXpath,
    scope,
    getDriver,
    loadUri,
    urlFor
} = seleniumHelper;

const rubyHelper = new RubyHelper(seleniumHelper);
const {
    expectInterconvertBetweenCodeAndRuby
} = rubyHelper;

let driver;

describe('Ruby Tab: Control category blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Ruby -> Code -> Ruby', async () => {
        await loadUri(urlFor('/'));
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        await clickText('Abby', scope.modal);
        await clickText('Sprite1', scope.spriteItems);

        const code = dedent`
            sleep(1)
            10.times do
            end
            loop do
            end

            if false
            end
            if false
            else
            end
            wait until false
            until false
              move(10)
            end
            stop("all")

            stop("this script")

            stop("other scripts in sprite")

            self.when(:start_as_a_clone) do
            end

            create_clone("_myself_")
            create_clone("Abby")
            delete_this_clone
        `;
        await expectInterconvertBetweenCodeAndRuby(code);
    });
});
