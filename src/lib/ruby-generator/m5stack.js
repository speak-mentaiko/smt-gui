/**
 * Define Ruby code generator for Sample Blocks
 * @param {RubyGenerator} Generator The RubyGenerator
 * @return {RubyGenerator} same as param.
 */
export default function (Generator) {

    Generator.m5stack_m5lcd_init = function () {
        return `m5lcd = ILI934X.new(23, 18, 14, 27, 33, 32) \n`;
    };
    
    Generator.m5stack_m5lcd_write1 = function (block) {
        Generator.prepares_.i2c_m5lcd = Generator.m5stack_m5lcd_init(null);
        const pos1 = Generator.valueToCode(block, 'POS1', Generator.ORDER_NONE);
        const pos2 = Generator.valueToCode(block, 'POS2', Generator.ORDER_NONE);
        const pos3 = Generator.valueToCode(block, 'POS3', Generator.ORDER_NONE);
        const pos4 = Generator.valueToCode(block, 'POS4', Generator.ORDER_NONE);
        const type = Generator.getFieldValue(block, 'TYPE') || null;
        const color = Generator.getFieldValue(block, 'COLOR') || null;
        return `m5lcd.draw_${type}(${pos1}, ${pos2}, ${pos3}, ${pos4}, ${color}) \n`;
    };

    Generator.m5stack_m5lcd_write2 = function (block) {
        Generator.prepares_.i2c_m5lcd = Generator.m5stack_m5lcd_init(null);
        const pos1 = Generator.valueToCode(block, 'POS1', Generator.ORDER_NONE);
        const pos2 = Generator.valueToCode(block, 'POS2', Generator.ORDER_NONE);
        const size = Generator.valueToCode(block, 'SIZE', Generator.ORDER_NONE);
        const type = Generator.getFieldValue(block, 'TYPE') || null;
        const color = Generator.getFieldValue(block, 'COLOR') || null;
        return `m5lcd.draw_${type}(${pos1}, ${pos2}, ${size}, ${color}) \n`;
    };

    Generator.m5stack_m5lcd_write3 = function (block) {
        Generator.prepares_.i2c_m5lcd = Generator.m5stack_m5lcd_init(null);
        const pos1 = Generator.valueToCode(block, 'POS1', Generator.ORDER_NONE);
        const pos2 = Generator.valueToCode(block, 'POS2', Generator.ORDER_NONE);
        const size = Generator.valueToCode(block, 'SIZE', Generator.ORDER_NONE);
        const mess = Generator.valueToCode(block, 'MESS', Generator.ORDER_NONE);
        const color = Generator.getFieldValue(block, 'COLOR') || null;
        return `m5lcd.drawString(${pos1}, ${pos2}, ${mess}, ${size}, ${color}) \n`;
    };

    // メニューについては Ruby 側でも定義が必要のようだ
    Generator.mboard3_menu_menu1 = function (block) {
        const menu1 = Generator.getFieldValue(block, 'menu1') || null;
        return [menu1, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu2 = function (block) {
        const menu2 = Generator.getFieldValue(block, 'menu2') || null;
        return [menu2, Generator.ORDER_ATOMIC];
    };
    Generator.mboard3_menu_menu3 = function (block) {
        const menu3 = Generator.getFieldValue(block, 'menu3') || null;
        return [menu3, Generator.ORDER_ATOMIC];
    };
    return Generator;
}
