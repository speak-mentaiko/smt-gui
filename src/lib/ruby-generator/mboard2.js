/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {
    
    Generator.mboard2_led0 = function (block) {
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        return `led${text1} = GPIO.new( ${text1}, GPIO::OUT )\n`;
    };

    Generator.mboard2_led1 = function (block) {
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || 0;
        return `led${text1}.write(${num1})\n`;
    };

    Generator.mboard2_switch0 = function (block) {
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        return `sw${text1} = GPIO.new( ${text1}, GPIO::IN, GPIO::PULL_UP)\n`;
    };

    Generator.mboard2_switch1 = function (block) {
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        return [`(sw${text1}.read == 1)`, Generator.ORDER_ATOMIC];
    };

    Generator.mboard2_sound0 = function () {
        return `pwm1 = PWM.new( 15 )\n`;
    };

    Generator.mboard2_sound1 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        return `pwm1.freq(${text})\n` +
              `pwm1.duty(512)\n`;
    };
    
    Generator.mboard2_sound2 = function () {
        return `pwm1.duty(0)\n`;
    };

    Generator.mboard2_temperature0 = function () {
        return `adc = ADC.new( 39, ADC::ATTEN_11DB, ADC::WIDTH_12BIT )\n`;
    };
    
    Generator.mboard2_temperature2 = function () {
        return `voltage = adc.read()\n` +
        // eslint-disable-next-line max-len
        `temp = 1.0 / ( 1.0 / 3435.0 * Math.log( (3300.0 - voltage) / (voltage/ 10.0) / 10.0) + 1.0 / (25.0 + 273.0) ) - 273.0\n`;
    };

    Generator.mboard2_temperature1 = function () {
        return [`sprintf("%.1f", temp).to_f`, Generator.ORDER_ATOMIC];
    };

    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.mboard2_menu_menu1 = function (block) {
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };
    Generator.mboard2_menu_menu2 = function (block) {
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };
    Generator.mboard2_menu_menu3 = function (block) {
        const menu3 = Generator.getFieldValue(block, 'menu3') || null;
        return [menu3, Generator.ORDER_ATOMIC];
    };
    Generator.mboard2_menu_menu4 = function (block) {
        const menu4 = Generator.getFieldValue(block, 'menu4') || null;
        return [menu4, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
