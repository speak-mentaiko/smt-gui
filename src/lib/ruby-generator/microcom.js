/**
 * Define Ruby code generator for I2C_UART Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */

export default function (Generator) {

    Generator.microcom_gpio_output_init = function (block){
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
        return  `led${num1} = GPIO.new( ${num1}, GPIO::OUT )\n` ;
    };

    Generator.microcom_gpio_output = function (block) {
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
        const value = Generator.getFieldValue(block, 'VALUE',Generator.ORDER_NONE);
        return `led${num1}.write(${value})\n`;
    };

    Generator.microcom_gpio_input_init = function (block){
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
        return  `sw${num1} = GPIO.new( ${num1}, GPIO::IN, GPIO::PULL_UP )\n` ;
    };

    Generator.microcom_gpio_input = function (block) {
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
	return [`sw${num1}.read\n`, Generator.ORDER_ATOMIC];
    };

    Generator.microcom_pwm_init = function (block){
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
        return  `pwm${num1} = PWM.new( ${num1} )\n` ;
    };

    Generator.microcom_pwm_duty = function (block) {	
	const num1  = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
	const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || null;
        return `pwm${num1}.duty( ( ${value} % 1024 ).to_i )\n`;
    }

    Generator.microcom_pwm_frequency = function (block) {
	const num1  = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
	const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || null;
        return `pwm${num1}.freq( ${value}.to_i )\n`;
    };

    Generator.microcom_adc_init = function (block) {
	const num1  = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
        return `adc${num1} = ADC.new( ${num1} , ADC::ATTEN_11DB, ADC::WIDTH_12BIT )\n`;
    };

    Generator.microcom_adc_volt = function (block) {
	const value = Generator.valueToCode(block, 'VALUE', Generator.ORDER_NONE) || null;
        return [`adc${value}.read\n`, Generator.ORDER_ATOMIC];
    }

    Generator.microcom_i2c_init = function (block) {
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || 23;
	const num2 = Generator.valueToCode(block, 'NUM2', Generator.ORDER_NONE) || 22;
        return `i2c = I2C.new( ${num1}, ${num2} )\n`;
    };
    
    Generator.microcom_i2c_write = function (block) {
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
	const num2 = Generator.valueToCode(block, 'NUM2', Generator.ORDER_NONE) || null;
	const num3 = Generator.valueToCode(block, 'NUM3', Generator.ORDER_NONE) || null;
        return `i2c.writeto( ${num1}, [${num2}, ${num3}] )\n`;
    };
    
    Generator.microcom_i2c_read = function (block) {
	const num1 = Generator.valueToCode(block, 'NUM1', Generator.ORDER_NONE) || null;
	const num2 = Generator.valueToCode(block, 'NUM2', Generator.ORDER_NONE) || 1;
        return [`i2c.readfrom( ${num1}, ${num2} )\n`, Generator.ORDER_ATOMIC];
    };

    Generator.microcom_uart_init = function (block) {
	const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
	const num  = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE) || null;
        return `uart${text} = UART.new( ${text}, ${num} )\n`;
    };
    
    Generator.microcom_uart_write = function (block) {
	const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
	const text2 = Generator.valueToCode(block, 'TEXT2', Generator.ORDER_NONE) || null;
        return `uart${text1}.write( ${text2} )\n`;
    };

    Generator.microcom_uart_read = function (block) {
	const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        return [`uart${text}.gets()\n`, Generator.ORDER_ATOMIC];
    };

    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.microcom_menu_menu1 = function (block) {
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };
    Generator.microcom_menu_menu2 = function (block) {
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };

    return Generator;
}
