/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    // 各ブロックに対応する Ruby コードを書く
    Generator.kanirobo2_command0 = function () {
        return `motorEn = GPIO.new(12, GPIO::OUT)\n`;
    };

    Generator.kanirobo2_command1 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `motorEn.${text}\n`;
    };

    Generator.kanirobo2_command2 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `motor${text} = GPIO.new(${text}, GPIO::OUT)\n`;
    };
    
    Generator.kanirobo2_command3 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `motor${text}_pwm = PWM.new(${text}, ch=${text % 2})\n`;
    };
    
    Generator.kanirobo2_command4 = function (block) {
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        const text2 = Generator.valueToCode(block, 'TEXT2', Generator.ORDER_NONE) || null;
        return `motor${text1}.write(${text2})\n`;
    };

    Generator.kanirobo2_command5 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        const num = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE) || 0;
        return `motor${text}_pwm.duty((${num} % 1024).to_i)\n`;
    };

    Generator.kanirobo2_command6 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `lux${text} = ADC.new(${text}, ADC::ATTEN_11DB, ADC::WIDTH_12BIT)\n`;
    };

    Generator.kanirobo2_value0 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return [`lux${text}.rawread`, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo2_command7 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return `servo${text} = PWM.new(${text}, ch=${(text % 2) + 2})\n`;
    };

    Generator.kanirobo2_command8 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        const num = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE) || 0;
        return `servo${text}.freq(${num})\n`;
    };

    Generator.kanirobo2_command9 = function (block) {
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        const num = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE) || 0;
        return `servo${text}.duty((${num} % 1024).to_i)\n`;
    };

    Generator.kanirobo2_value1 = function (block) {
        const num  = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE)  || 0;
	      return [`( ${num}.to_f * (150 - 50) / 90.0 + 50).to_i`, Generator.ORDER_ATOMIC];
    };

    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.kanirobo2_menu_menu1 = function (block){
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo2_menu_menu2 = function (block){
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };
    Generator.kanirobo2_menu_menu3 = function (block){
        const menu3 = Generator.getFieldValue(block, 'menu3') || null;
        return [menu3, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo2_menu_menu4 = function (block){
        const menu4 = Generator.getFieldValue(block, 'menu4') || null;
        return [menu4, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo2_menu_menu5 = function (block){
        const menu5 = Generator.getFieldValue(block, 'menu5') || null;
        return [menu5, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo2_menu_menu6 = function (block){
        const menu6 = Generator.getFieldValue(block, 'menu6') || null;
        return [menu6, Generator.ORDER_ATOMIC];
    };
    
    return Generator;
}
