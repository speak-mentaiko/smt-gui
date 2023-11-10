/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    Generator.kanirobo1_motor_init = function (block) {
        return `motorEn = GPIO.new(12, GPIO::OUT)\n` +
            `motorEn.on()\n` +
	    `motor1 = GPIO.new(25, GPIO::OUT)\n` +
	    `motor1_pwm = PWM.new(26, ch=0)\n` +
	    `motor2 = GPIO.new(32, GPIO::OUT)\n` +
	    `motor2_pwm = PWM.new(33, ch=1)\n`;
    };

    Generator.kanirobo1_lux_init = function (block) {
	return `lux36 = ADC.new(36, ADC::ATTEN_11DB, ADC::WIDTH_12BIT)\n` +
	       `lux34 = ADC.new(34, ADC::ATTEN_11DB, ADC::WIDTH_12BIT)\n` + 
	       `lux35 = ADC.new(35, ADC::ATTEN_11DB, ADC::WIDTH_12BIT)\n` + 
  	       `lux2  = ADC.new(2,  ADC::ATTEN_11DB, ADC::WIDTH_12BIT)\n`;
    };

    Generator.kanirobo1_servo_init = function (block) {
	return `servo27 = PWM.new(27, ch=3)\n` +
	    `servo14 = PWM.new(14, ch=2)\n` +
	    `servo27.freq( 80 )\n` +
	    `servo14.freq( 80 )\n` +
	    `deg = ((( 0 - 90.0) * 0.95 / 90.0 + 1.45) / 20.0 * 1024).to_i\n` +
            `servo27.duty( deg )\n` +
            `servo14.duty( deg )\n` +
	    `sleep 0.1\n` +
            `servo27.deinit\n` +
            `servo14.deinit\n` ;
    };
    
    Generator.kanirobo1_motor = function (block) {
	Generator.prepares_[`motor`] = Generator.kanirobo1_motor_init(null);
        const text1 = Generator.valueToCode(block, 'TEXT1', Generator.ORDER_NONE) || null;
        const text2 = Generator.valueToCode(block, 'TEXT2', Generator.ORDER_NONE) || null;
        const text3 = Generator.valueToCode(block, 'TEXT3', Generator.ORDER_NONE) || null;
        return `motor${text1}_pwm.duty((${text3} % 1024).to_i)\n` +
               `motor${text1}.${text2}\n` +
               `sleep( 0.01 )\n`;
    };
    Generator.kanirobo1_value0 = function (block) {
	Generator.prepares_[`lux`] = Generator.kanirobo1_lux_init(null);
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
	return [`lux${text}.rawread`, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo1_command9 = function (block) {
	Generator.prepares_[`servo`] = Generator.kanirobo1_servo_init(null);
        const text = Generator.valueToCode(block, 'TEXT', Generator.ORDER_NONE) || null;
        const num  = Generator.valueToCode(block, 'NUM', Generator.ORDER_NONE)  || 0;
	return `deg = (((${num}.to_f - 90.0) * 0.95 / 90.0 + 1.45) / 20.0 * 1024).to_i\n`+
               `servo${text}.duty( ( deg % 1024 ).to_i )\n` +
	       `sleep 0.1\n` +
	       `servo${text}.deinit\n`;
    };

    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.kanirobo1_menu_menu1 = function (block){
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo1_menu_menu2 = function (block){
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };
    Generator.kanirobo1_menu_menu3 = function (block){
        const menu3 = Generator.getFieldValue(block, 'menu3') || null;
        return [menu3, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo1_menu_menu4 = function (block){
        const menu4 = Generator.getFieldValue(block, 'menu4') || null;
        return [menu4, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo1_menu_menu5 = function (block){
        const menu5 = Generator.getFieldValue(block, 'menu5') || null;
        return [menu5, Generator.ORDER_ATOMIC];
    };

    Generator.kanirobo1_menu_menu6 = function (block){
        const menu6 = Generator.getFieldValue(block, 'menu6') || null;
        return [menu6, Generator.ORDER_ATOMIC];
    };
    
    Generator.kanirobo1_menu_menu7 = function (block){
        const menu7 = Generator.getFieldValue(block, 'menu7') || null;
        return [menu7, Generator.ORDER_ATOMIC];
    };
    
    return Generator;
}
